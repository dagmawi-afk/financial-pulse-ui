package com.dala.logic.parser

import java.util.regex.Pattern

class SMSParser {
    // Standard patterns for Ethiopian and Regional banks
    private val patterns = listOf(
        // CBE Example: You have received ETB 1,200.00 from JOHN DOE on 23/10/2023. Ref: ABC123
        "received ETB (?<amount>[\\d,.]+).+from (?<merchant>.+) on (?<date>[\\d/]+)",
        // CBE Debit: Your account ... has been debited with ETB 500.00 for payment to ...
        "debited with ETB (?<amount>[\\d,.]+).+to (?<merchant>.+)",
        // M-Pesa: Confirm ETB 200.00 sent to ...
        "ETB (?<amount>[\\d,.]+).+sent to (?<merchant>.+)"
    )

    /**
     * Extracts structured data from raw SMS strings
     */
    fun parse(sms: String): ParsedResult? {
        for (patternStr in patterns) {
            val regex = Regex(patternStr, RegexOption.IGNORE_CASE)
            val match = regex.find(sms)
            if (match != null) {
                val amount = match.groups["amount"]?.value?.replace(",", "")?.toDoubleOrNull() ?: 0.0
                val merchant = match.groups["merchant"]?.value?.trim() ?: "Unknown Merchant"
                val date = match.groups["date"]?.value ?: ""
                val type = if (sms.lowercase().contains("received")) "CREDIT" else "DEBIT"
                
                return ParsedResult(amount, merchant, date, type)
            }
        }
        return null
    }

    /**
     * Pattern Learner: Generates a dynamic Regex from a user-selected string segment.
     * Replaces the selection with a named capture group.
     */
    fun learnPattern(fullSms: String, selection: String, fieldName: String): String {
        val escapedFull = Pattern.quote(fullSms)
        val escapedSelection = Pattern.quote(selection)
        
        // Replace the escaped selection with a named regex group
        // Note: In real Android implementation, we'd handle complex escaping more robustly
        return escapedFull.replace(escapedSelection, "(?<$fieldName>.*?)")
    }
}

data class ParsedResult(
    val amount: Double,
    val merchant: String,
    val date: String,
    val type: String
)