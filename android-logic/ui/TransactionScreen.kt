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
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun TransactionScreen(
    viewModel: FinanceViewModel,
    modifier: Modifier = Modifier
) {
    val transactions by viewModel.transactions.collectAsState()
    var searchQuery by remember { mutableStateOf("") }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        Spacer(modifier = Modifier.height(16.dp))

        // Search Bar
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
                focusedContainerColor = Color(0xFFECE6F0),
                unfocusedContainerColor = Color(0xFFECE6F0),
                disabledContainerColor = Color(0xFFECE6F0),
                focusedIndicatorColor = Color.Transparent,
                unfocusedIndicatorColor = Color.Transparent,
            ),
            singleLine = true
        )

        // Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Recent Activity",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Medium
            )
            TextButton(onClick = { /* TODO: Open Filter Sheet */ }) {
                Text(
                    text = "Filter",
                    color = Color(0xFF6750A4),
                    style = MaterialTheme.typography.labelLarge
                )
            }
        }

        // List
        LazyColumn(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            contentPadding = PaddingValues(bottom = 16.dp)
        ) {
            items(transactions, key = { it.id }) { tx ->
                TransactionItem(transaction = tx)
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

    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { /* TODO */ },
        shape = RoundedCornerShape(16.dp),
        border = BorderStroke(0.5.dp, Color(0xFFCAC4D0).copy(alpha = 0.3f)),
        color = Color.White
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .background(iconBackground, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = getCategoryIcon(transaction.category),
                    contentDescription = null,
                    tint = iconTint,
                    modifier = Modifier.size(24.dp)
                )
            }

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = transaction.merchant,
                    style = MaterialTheme.typography.bodyLarge,
                    fontWeight = FontWeight.Medium,
                    color = Color(0xFF1C1B1F)
                )
                Text(
                    text = "${transaction.category} \u2022 ${transaction.date.formatDate()}",
                    style = MaterialTheme.typography.bodySmall,
                    color = Color(0xFF49454F)
                )
            }

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = "${if (isIncome) "+" else ""}${transaction.amount.formatETB()}",
                    style = MaterialTheme.typography.bodyLarge,
                    fontWeight = FontWeight.SemiBold,
                    color = amountColor
                )
                Icon(
                    imageVector = Icons.Default.ChevronRight,
                    contentDescription = null,
                    tint = Color(0xFFCAC4D0),
                    modifier = Modifier.size(16.dp)
                )
            }
        }
    }
}

@Composable
fun TransactionVisualBanner() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 16.dp)
            .height(128.dp)
            .clip(RoundedCornerShape(28.dp))
            .border(1.dp, Color(0xFFCAC4D0), RoundedCornerShape(28.dp))
    ) {
        Image(
            painter = rememberAsyncImagePainter("https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/transaction-history-6810ce8e-1772036869595.webp"),
            contentDescription = "Transaction History Visual",
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

// Extension function for date formatting
fun Long.formatDate(): String {
    val date = Date(this)
    val format = SimpleDateFormat("MMM dd, yyyy", Locale.getDefault())
    return format.format(date)
}