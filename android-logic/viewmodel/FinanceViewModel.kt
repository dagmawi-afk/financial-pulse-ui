package com.dala.logic.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dala.logic.models.Transaction
import com.dala.logic.repository.FinanceRepository
import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

@OptIn(FlowPreview::class)
class FinanceViewModel(private val repository: FinanceRepository) : ViewModel() {

    // Internal State
    private val _searchQuery = MutableStateFlow("")
    private val _categoryFilter = MutableStateFlow<String?>(null)
    private val _dateRange = MutableStateFlow<Pair<Long?, Long?>>(null to null)

    // Exposed State for UI
    val transactions: StateFlow<List<Transaction>> = combine(
        _searchQuery.debounce(300),
        _categoryFilter,
        _dateRange
    ) { query, category, range ->
        FilterState(query, category, range.first, range.second)
    }.flatMapLatest { state ->
        repository.searchTransactions(state.query, state.category, state.start, state.end)
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = emptyList()
    )

    val aggregatedBalance: StateFlow<Double> = repository.getTotalAggregatedBalance()
        .stateIn(viewModelScope, SharingStarted.Lazily, 0.0)

    // Actions
    fun updateSearch(query: String) {
        _searchQuery.value = query
    }

    fun setCategory(category: String?) {
        _categoryFilter.value = category
    }

    fun addManualTransaction(transaction: Transaction) {
        viewModelScope.launch {
            repository.insertTransaction(transaction)
        }
    }

    private data class FilterState(
        val query: String,
        val category: String?,
        val start: Long?,
        val end: Long?
    )
}