package com.dala.logic.ui

import java.text.SimpleDateFormat
import java.util.*

fun Double.formatETB(): String {
    return String.format(Locale.US, "%,.2f Birr", this)
}

fun Long.formatDate(): String {
    val date = Date(this)
    val format = SimpleDateFormat("MMM dd, yyyy", Locale.US)
    return format.format(date)
}