package com.dala.logic.models

import androidx.room.Entity
import androidx.room.PrimaryKey

enum class TransactionType { DEBIT, CREDIT }

@Entity(tableName = "transactions")
data class Transaction(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val amount: Double,
    val merchant: String,
    val date: Long, // Unix timestamp
    val type: TransactionType,
    val category: String,
    val rawSms: String? = null,
    val accountId: Long
)

@Entity(tableName = "accounts")
data class Account(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val name: String,
    val balance: Double,
    val currency: String = "ETB"
)

@Entity(tableName = "budgets")
data class Budget(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val category: String,
    val limitAmount: Double,
    val period: String // Format: "YYYY-MM"
)