package com.dala.logic

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.ui.graphics.Color
import com.dala.logic.data.AppDatabase
import com.dala.logic.repository.FinanceRepository
import com.dala.logic.ui.MainScreen
import com.dala.logic.viewmodel.FinanceViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initialize Database, Repository and ViewModel
        val db = AppDatabase.getDatabase(applicationContext)
        val repository = FinanceRepository(db.transactionDao(), db.budgetDao())
        val viewModel = FinanceViewModel(repository)

        setContent {
            MaterialTheme(
                colorScheme = lightColorScheme(
                    primary = Color(0xFF6750A4),
                    onPrimary = Color.White,
                    primaryContainer = Color(0xFFEADDFF),
                    onPrimaryContainer = Color(0xFF21005D),
                    secondary = Color(0xFF625B71),
                    onSecondary = Color.White,
                    secondaryContainer = Color(0xFFE8DEF8),
                    onSecondaryContainer = Color(0xFF1D192B),
                    tertiary = Color(0xFF7D5260),
                    onTertiary = Color.White,
                    tertiaryContainer = Color(0xFFFFD8E4),
                    onTertiaryContainer = Color(0xFF31111D),
                    error = Color(0xFFB3261E),
                    onError = Color.White,
                    background = Color(0xFFFFFBFE),
                    onBackground = Color(0xFF1C1B1F),
                    surface = Color(0xFFFFFBFE),
                    onSurface = Color(0xFF1C1B1F)
                )
            ) {
                MainScreen(viewModel = viewModel)
            }
        }
    }
}