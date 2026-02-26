package com.dala.logic.ui

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material.icons.filled.PieChart
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.rememberAsyncImagePainter
import com.dala.logic.models.Budget
import com.dala.logic.viewmodel.FinanceViewModel
import java.util.*

@Composable
fun BudgetScreen(
    viewModel: FinanceViewModel,
    modifier: Modifier = Modifier
) {
    // In a real app, this would come from viewModel.budgets
    // For this conversion, we'll use the logic layer or mock data if not yet exposed
    val budgets = listOf(
        Budget(id = 1, category = "Food & Dining", limitAmount = 6000.0, period = "2024-05"),
        Budget(id = 2, category = "Transport", limitAmount = 1500.0, period = "2024-05"),
        Budget(id = 3, category = "Groceries", limitAmount = 4000.0, period = "2024-05"),
        Budget(id = 4, category = "Entertainment", limitAmount = 2000.0, period = "2024-05")
    )

    // Mock spent amounts (in real app, this would be computed by repository/viewmodel)
    val spentMap = mapOf(
        "Food & Dining" to 4200.0,
        "Transport" to 1200.0,
        "Groceries" to 3800.0,
        "Entertainment" to 850.0
    )

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp),
        contentPadding = PaddingValues(vertical = 16.dp)
    ) {
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Active Budgets",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Medium
                )
                IconButton(
                    onClick = { /* TODO */ },
                    modifier = Modifier
                        .size(40.dp)
                        .background(Color(0xFFEADDFF), CircleShape)
                ) {
                    Icon(
                        imageVector = Icons.Default.Add,
                        contentDescription = "Add Budget",
                        tint = Color(0xFF21005D)
                    )
                }
            }
        }

        items(budgets) { budget ->
            val spent = spentMap[budget.category] ?: 0.0
            BudgetCard(budget = budget, spent = spent)
        }

        item {
            BudgetSummaryBanner()
        }
    }
}

@Composable
fun BudgetCard(budget: Budget, spent: Double) {
    val percent = (spent / budget.limitAmount).toFloat()
    val isOver = percent > 0.9f
    val progressColor = if (isOver) Color(0xFFB3261E) else Color(0xFF6750A4)

    Card(
        modifier = Modifier
            .fillMaxWidth(),
        shape = RoundedCornerShape(28.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        border = BorderStroke(1.dp, Color(0xFFCAC4D0))
    ) {
        Column(
            modifier = Modifier
                .padding(20.dp)
                .fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(40.dp)
                            .background(progressColor.copy(alpha = 0.12f), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.PieChart,
                            contentDescription = null,
                            tint = progressColor,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                    Column {
                        Text(
                            text = budget.category,
                            style = MaterialTheme.typography.bodyLarge,
                            fontWeight = FontWeight.Medium,
                            color = Color(0xFF1C1B1F)
                        )
                        Text(
                            text = "${budget.limitAmount.formatETB()} limit",
                            style = MaterialTheme.typography.bodySmall,
                            color = Color(0xFF49454F)
                        )
                    }
                }
                IconButton(onClick = { /* TODO */ }) {
                    Icon(
                        imageVector = Icons.Default.MoreVert,
                        contentDescription = "Options",
                        tint = Color(0xFF49454F)
                    )
                }
            }

            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "${spent.formatETB()} spent",
                        style = MaterialTheme.typography.bodyMedium,
                        fontWeight = FontWeight.Medium,
                        color = Color(0xFF1C1B1F)
                    )
                    Text(
                        text = "${(percent * 100).toInt()}%",
                        style = MaterialTheme.typography.bodyMedium,
                        fontWeight = if (isOver) FontWeight.Bold else FontWeight.Normal,
                        color = if (isOver) Color(0xFFB3261E) else Color(0xFF49454F)
                    )
                }
                LinearProgressIndicator(
                    progress = percent.coerceIn(0f, 1f),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(8.dp)
                        .clip(CircleShape),
                    color = progressColor,
                    trackColor = Color(0xFFE7E0EC)
                )
            }
        }
    }
}

@Composable
fun BudgetSummaryBanner() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(192.dp)
            .clip(RoundedCornerShape(28.dp))
            .border(1.dp, Color(0xFFCAC4D0), RoundedCornerShape(28.dp))
    ) {
        Image(
            painter = rememberAsyncImagePainter("https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/budgeting-module-96bea6f3-1772036869475.webp"),
            contentDescription = "Budget Summary",
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black.copy(alpha = 0.3f))
                .padding(24.dp),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "You've saved 15% more this month compared to April.",
                color = Color.White,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Medium,
                textAlign = TextAlign.Center,
                lineHeight = 24.sp
            )
        }
    }
}

// Extension function for formatting
fun Double.formatETB(): String = "ETB %,.2f".format(this)