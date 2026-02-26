package com.dala.logic.repository

import com.dala.logic.data.TransactionDao
import com.dala.logic.data.BudgetDao
import com.dala.logic.models.Transaction
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map

class FinanceRepository(
    private val transactionDao: TransactionDao,
    private val budgetDao: BudgetDao
) {
    /**
     * Calculates the net balance across all accounts based on transaction history
     */
    fun getTotalAggregatedBalance(): Flow<Double> {
        return transactionDao.getAllTransactions().map { transactions ->
            transactions.sumOf { 
                if (it.type.name == "CREDIT") it.amount else -it.amount 
            }
        }
    }

    /**
     * Calculates percentage of budget spent for a specific category and month
     */
    fun getBudgetStatus(category: String, period: String): Flow<Double> {
        val transactionsFlow = transactionDao.getTransactionsByCategory(category)
        val budgetFlow = budgetDao.getBudgetByCategoryAndPeriod(category, period)
        
        return combine(transactionsFlow, budgetFlow) { txList, budget ->
            if (budget == null || budget.limitAmount <= 0.0) return@combine 0.0
            
            val totalSpent = txList
                .filter { it.type.name == "DEBIT" }
                .sumOf { it.amount }
            
            (totalSpent / budget.limitAmount) * 100
        }
    }

    /**
     * Prepares data for a multi-series line chart (Monthly Trends)
     */
    fun getMonthlyTrend(): Flow<List<Pair<Long, Double>>> {
        return transactionDao.getAllTransactions().map { transactions ->
            transactions
                .sortedBy { it.date }
                .map { it.date to it.amount }
        }
    }

    /**
     * Reactive search and filtering logic
     */
    fun searchTransactions(
        query: String,
        category: String?,
        startDate: Long?,
        endDate: Long?
    ): Flow<List<Transaction>> {
        return transactionDao.searchTransactions(
            query = "%$query%",
            category = category,
            startDate = startDate ?: 0L,
            endDate = endDate ?: Long.MAX_VALUE
        )
    }

    suspend fun insertTransaction(transaction: Transaction) {
        transactionDao.insertTransaction(transaction)
    }
}