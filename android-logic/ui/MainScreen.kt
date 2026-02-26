package com.dala.logic.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.dala.logic.viewmodel.FinanceViewModel

@Composable
fun MainScreen(viewModel: FinanceViewModel) {
    var selectedItem by remember { mutableIntStateOf(0) }
    val items = listOf("Dashboard", "History", "Budget", "Training", "Profile")
    val icons = listOf(
        Icons.Default.Dashboard,
        Icons.Default.History,
        Icons.Default.PieChart,
        Icons.Default.School,
        Icons.Default.Person
    )

    Scaffold(
        bottomBar = {
            NavigationBar(
                containerColor = Color.White,
                tonalElevation = 8.dp
            ) {
                items.forEachIndexed { index, item ->
                    NavigationBarItem(
                        icon = { Icon(icons[index], contentDescription = item) },
                        label = { Text(item) },
                        selected = selectedItem == index,
                        onClick = { selectedItem = index },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color(0xFF6750A4),
                            selectedTextColor = Color(0xFF6750A4),
                            indicatorColor = Color(0xFFEADDFF)
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        Surface(modifier = Modifier.padding(innerPadding)) {
            when (selectedItem) {
                0 -> DashboardScreen(viewModel)
                1 -> TransactionScreen(viewModel)
                2 -> BudgetScreen(viewModel)
                3 -> TrainingScreen()
                4 -> ProfileScreen()
            }
        }
    }
}