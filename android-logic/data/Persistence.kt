package com.dala.logic.data

import androidx.room.*
import com.dala.logic.models.Transaction
import com.dala.logic.models.Budget
import com.dala.logic.models.Account
import kotlinx.coroutines.flow.Flow

@Dao
interface TransactionDao {
    @Query("SELECT * FROM transactions ORDER BY date DESC")
    fun getAllTransactions(): Flow<List<Transaction>>

    @Query("""
        SELECT * FROM transactions 
        WHERE (merchant LIKE :query OR category LIKE :query)
        AND (:category IS NULL OR category = :category)
        AND (date >= :startDate AND date <= :endDate)
        ORDER BY date DESC
    """)
    fun searchTransactions(
        query: String,
        category: String?,
        startDate: Long,
        endDate: Long
    ): Flow<List<Transaction>>

    @Query("SELECT * FROM transactions WHERE category = :category")
    fun getTransactionsByCategory(category: String): Flow<List<Transaction>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTransaction(transaction: Transaction)
}

@Dao
interface BudgetDao {
    @Query("SELECT * FROM budgets WHERE category = :category AND period = :period LIMIT 1")
    fun getBudgetByCategoryAndPeriod(category: String, period: String): Flow<Budget?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBudget(budget: Budget)
}

@Database(entities = [Transaction::class, Budget::class, Account::class], version = 1)
abstract class DalaDatabase : RoomDatabase() {
    abstract fun transactionDao(): TransactionDao
    abstract fun budgetDao(): BudgetDao
}