package com.dala.logic.ui

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.dala.logic.models.Transaction
import com.dala.logic.viewmodel.FinanceViewModel
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun DalaDashboard(viewModel: FinanceViewModel) {
    val transactions by viewModel.transactions.collectAsState()
    val totalBalance by viewModel.aggregatedBalance.collectAsState()

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        // Summary Card
        SummarySection(balance = totalBalance)
        
        Spacer(modifier = Modifier.height(24.dp))
        
        // Transaction List
        Text("Recent Transactions", style = MaterialTheme.typography.titleMedium)
        LazyColumn(
            modifier = Modifier.weight(1f),
            contentPadding = PaddingValues(vertical = 8.dp)
        ) {
            items(transactions) { transaction ->
                TransactionRow(transaction)
            }
        }
        
        // Manual Entry Interaction
        Button(
            onClick = { /* Navigate to Form or Show Dialog */ },
            modifier = Modifier.fillMaxWidth().height(56.dp) // WCAG: 48dp+ touch target
        ) {
            Text("Add Transaction")
        }
    }
}

@Composable
fun TransactionRow(tx: Transaction) {
    ListItem(
        headlineContent = { Text(tx.merchant) },
        supportingContent = { Text(tx.category) },
        trailingContent = {
            Text(
                "${if (tx.type.name == "CREDIT") "+" else "-"} ${"%.2f".format(tx.amount)} ETB",
                color = if (tx.type.name == "CREDIT") Color(0xFF2E7D32) else Color(0xFFC62828)
            )
        }
    )
}

@Composable
fun SummarySection(balance: Double) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("Total Aggregated Balance", style = MaterialTheme.typography.labelMedium)
            Text(
                text = "${"%.2f".format(balance)} ETB",
                style = MaterialTheme.typography.headlineLarge,
                color = MaterialTheme.colorScheme.primary // Ensuring WCAG contrast
            )
        }
    }
}