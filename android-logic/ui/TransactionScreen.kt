package com.dala.logic.ui

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import coil.compose.rememberAsyncImagePainter
import com.dala.logic.models.Transaction
import com.dala.logic.models.TransactionType
import com.dala.logic.viewmodel.FinanceViewModel

@Composable
fun TransactionScreen(
    viewModel: FinanceViewModel,
    modifier: Modifier = Modifier
) {
    val transactions by viewModel.transactions.collectAsState()
    var searchQuery by remember { mutableStateOf("") }

    Column(
        modifier = modifier.fillMaxSize(),
    ) {
        // Toolbar-like search area
        Surface(
            modifier = Modifier.fillMaxWidth(),
            color = MaterialTheme.colorScheme.surface,
            shadowElevation = 2.dp
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                TextField(
                    value = searchQuery,
                    onValueChange = {
                        searchQuery = it
                        viewModel.updateSearch(it)
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(28.dp)),
                    placeholder = { Text("Search transactions...") },
                    leadingIcon = {
                        Icon(
                            imageVector = Icons.Default.Search,
                            contentDescription = null,
                            tint = Color(0xFF49454F)
                        )
                    },
                    colors = TextFieldDefaults.colors(
                        focusedContainerColor = Color(0xFFF3EDF7),
                        unfocusedContainerColor = Color(0xFFF3EDF7),
                        disabledContainerColor = Color(0xFFF3EDF7),
                        focusedIndicatorColor = Color.Transparent,
                        unfocusedIndicatorColor = Color.Transparent,
                    ),
                    singleLine = true
                )
            }
        }

        // List
        LazyColumn(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(1.dp),
            contentPadding = PaddingValues(bottom = 16.dp)
        ) {
            item {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "History",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    IconButton(onClick = { /* TODO */ }) {
                        Icon(imageVector = Icons.Default.FilterList, contentDescription = "Filter")
                    }
                }
            }

            if (transactions.isEmpty()) {
                item {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 100.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text("No transactions found", style = MaterialTheme.typography.bodyLarge)
                        Text("Try a different search term", style = MaterialTheme.typography.bodySmall)
                    }
                }
            } else {
                items(transactions, key = { it.id }) { tx ->
                    TransactionItem(transaction = tx)
                }
            }

            item {
                TransactionVisualBanner()
            }
        }
    }
}

@Composable
fun TransactionItem(transaction: Transaction) {
    val isIncome = transaction.type == TransactionType.CREDIT
    val amountColor = if (isIncome) Color(0xFF2E7D32) else Color(0xFF1C1B1F)
    val iconBackground = if (isIncome) Color(0xFFE8F5E9) else Color(0xFFEADDFF)
    val iconTint = if (isIncome) Color(0xFF2E7D32) else Color(0xFF21005D)

    ListItem(
        modifier = Modifier.clickable { /* TODO */ },
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

@Composable
fun TransactionVisualBanner() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
            .height(140.dp)
            .clip(RoundedCornerShape(28.dp))
    ) {
        Image(
            painter = rememberAsyncImagePainter("https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/transaction-history-6810ce8e-1772036869595.webp"),
            contentDescription = null,
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )
    }
}

private fun getCategoryIcon(category: String): ImageVector {
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