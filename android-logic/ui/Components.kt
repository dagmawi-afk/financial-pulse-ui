package com.dala.logic.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.dala.logic.models.Transaction
import com.dala.logic.models.TransactionType

@Composable
fun TransactionRowItem(
    transaction: Transaction,
    onClick: () -> Unit
) {
    val isIncome = transaction.type == TransactionType.CREDIT
    val amountColor = if (isIncome) Color(0xFF2E7D32) else Color(0xFF1C1B1F)
    val iconBackground = if (isIncome) Color(0xFFE8F5E9) else Color(0xFFEADDFF)
    val iconTint = if (isIncome) Color(0xFF2E7D32) else Color(0xFF21005D)

    ListItem(
        modifier = Modifier.clickable { onClick() },
        headlineContent = {
            Text(
                text = transaction.merchant,
                style = MaterialTheme.typography.bodyLarge,
                fontWeight = FontWeight.Medium
            )
        },
        supportingContent = {
            Text(
                text = "${transaction.category} \u2022 ${transaction.date.formatDate()}",
                style = MaterialTheme.typography.bodySmall
            )
        },
        leadingContent = {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .background(iconBackground, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = getCategoryIcon(transaction.category),
                    contentDescription = null,
                    tint = iconTint,
                    modifier = Modifier.size(20.dp)
                )
            }
        },
        trailingContent = {
            Text(
                text = "${if (isIncome) "+" else ""}${transaction.amount.formatETB()}",
                style = MaterialTheme.typography.bodyLarge,
                fontWeight = FontWeight.SemiBold,
                color = amountColor
            )
        }
    )
}

fun getCategoryIcon(category: String): ImageVector {
    return when (category.lowercase()) {
        "food", "dining" -> Icons.Default.Restaurant
        "transport", "bus" -> Icons.Default.DirectionsBus
        "groceries", "shopping" -> Icons.Default.ShoppingBag
        "entertainment" -> Icons.Default.TheaterComedy
        "housing", "rent" -> Icons.Default.Home
        "income", "salary" -> Icons.Default.AccountBalanceWallet
        else -> Icons.Default.ReceiptLong
    }
}