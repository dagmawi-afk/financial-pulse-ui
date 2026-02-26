package com.dala.logic.ui

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
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

@Composable
fun BudgetScreen(
    viewModel: FinanceViewModel,
    modifier: Modifier = Modifier
) {
    val budgets = listOf(
        Budget(id = 1, category = "Food & Dining", limitAmount = 6000.0, period = "2024-05"),
        Budget(id = 2, category = "Transport", limitAmount = 1500.0, period = "2024-05"),
        Budget(id = 3, category = "Groceries", limitAmount = 4000.0, period = "2024-05"),
        Budget(id = 4, category = "Entertainment", limitAmount = 2000.0, period = "2024-05")
    )

    val spentMap = mapOf(
        "Food & Dining" to 4200.0,
        "Transport" to 1200.0,
        "Groceries" to 3800.0,
        "Entertainment" to 850.0
    )

    LazyColumn(
        modifier = modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(16.dp)
    ) {
        item {
            BudgetSummaryBanner()
        }

        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "My Budgets",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
                Button(
                    onClick = { /* TODO */ },
                    shape = RoundedCornerShape(20.dp),
                    contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp)
                ) {
                    Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(18.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("New Budget")
                }
            }
        }

        items(budgets) { budget ->
            val spent = spentMap[budget.category] ?: 0.0
            BudgetCard(budget = budget, spent = spent)
        }
    }
}

@Composable
fun BudgetCard(budget: Budget, spent: Double) {
    val percent = (spent / budget.limitAmount).toFloat()
    val isOver = percent > 0.9f
    val progressColor = if (isOver) Color(0xFFB3261E) else MaterialTheme.colorScheme.primary

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFF3EDF7).copy(alpha = 0.5f))
    ) {
        Column(
            modifier = Modifier.padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column {
                    Text(text = budget.category, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                    Text(text = "Limit: ${budget.limitAmount.formatETB()}", style = MaterialTheme.typography.bodySmall)
                }
                Box(
                    modifier = Modifier.size(32.dp).background(progressColor.copy(alpha = 0.1f), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Default.PieChart, contentDescription = null, tint = progressColor, modifier = Modifier.size(16.dp))
                }
            }

            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                LinearProgressIndicator(
                    progress = percent.coerceIn(0f, 1f),
                    modifier = Modifier.fillMaxWidth().height(12.dp).clip(CircleShape),
                    color = progressColor,
                    trackColor = Color.White
                )
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(text = "${spent.formatETB()} spent", style = MaterialTheme.typography.labelSmall)
                    Text(text = "${(percent * 100).toInt()}% used", style = MaterialTheme.typography.labelSmall, color = if(isOver) Color(0xFFB3261E) else Color.Unspecified)
                }
            }
        }
    }
}

@Composable
fun BudgetSummaryBanner() {
    Card(
        modifier = Modifier.fillMaxWidth().height(180.dp),
        shape = RoundedCornerShape(28.dp)
    ) {
        Box {
            Image(
                painter = rememberAsyncImagePainter("https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/budgeting-module-96bea6f3-1772036869475.webp"),
                contentDescription = null,
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )
            Box(
                modifier = Modifier.fillMaxSize().background(Color.Black.copy(alpha = 0.4f)).padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "You've saved 15% more this month!
Keep it up!",
                    color = Color.White,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}