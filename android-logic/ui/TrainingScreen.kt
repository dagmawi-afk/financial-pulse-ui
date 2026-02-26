package com.dala.logic.ui

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import coil.compose.rememberAsyncImagePainter

data class ChatMessage(
    val id: String,
    val role: String,
    val text: String
)

@Composable
fun TrainingScreen() {
    var messages by remember {
        mutableStateOf(
            listOf(
                ChatMessage("1", "system", "Paste an SMS from your bank to train the AI parser."),
                ChatMessage("2", "user", "Birr 450.00 spent at Tomoca Coffee on 12/05/2024. Your balance is Birr 12,450.00")
            )
        )
    }
    var input by remember { mutableStateOf("") }

    Column(modifier = Modifier.fillMaxSize()) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(180.dp)
        ) {
            Image(
                painter = rememberAsyncImagePainter("https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/ai-training-visual-7c48e229-1772092257214.webp"),
                contentDescription = null,
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color.Black.copy(alpha = 0.4f))
                    .padding(24.dp),
                contentAlignment = Alignment.BottomStart
            ) {
                Text(
                    text = "AI Parser Training",
                    style = MaterialTheme.typography.headlineSmall,
                    color = Color.White,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        Surface(
            modifier = Modifier.padding(16.dp),
            color = Color(0xFFEADDFF).copy(alpha = 0.3f),
            shape = RoundedCornerShape(16.dp)
        ) {
            Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Info, contentDescription = null, tint = Color(0xFF6750A4))
                Spacer(modifier = Modifier.width(12.dp))
                Text(
                    text = "Training improves detection of local bank SMS formats like CBE, Zemen, and Dashen.",
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }

        LazyColumn(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            items(messages) { msg ->
                ChatBubble(msg)
            }
        }

        // Input Area
        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            shadowElevation = 4.dp,
            shape = RoundedCornerShape(28.dp)
        ) {
            Row(
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                TextField(
                    value = input,
                    onValueChange = { input = it },
                    placeholder = { Text("Paste SMS here...") },
                    modifier = Modifier.weight(1f),
                    colors = TextFieldDefaults.colors(
                        focusedContainerColor = Color.Transparent,
                        unfocusedContainerColor = Color.Transparent,
                        focusedIndicatorColor = Color.Transparent,
                        unfocusedIndicatorColor = Color.Transparent
                    )
                )
                IconButton(
                    onClick = {
                        if (input.isNotBlank()) {
                            messages = messages + ChatMessage(System.currentTimeMillis().toString(), "user", input)
                            input = ""
                            // Simulate AI response
                        }
                    },
                    modifier = Modifier.background(MaterialTheme.colorScheme.primary, CircleShape)
                ) {
                    Icon(Icons.Default.Send, contentDescription = "Send", tint = Color.White)
                }
            }
        }
    }
}

@Composable
fun ChatBubble(msg: ChatMessage) {
    val alignment = if (msg.role == "user") Alignment.CenterEnd else Alignment.CenterStart
    val bgColor = when (msg.role) {
        "user" -> Color(0xFFEADDFF)
        "ai" -> Color.White
        else -> Color(0xFFF3EDF7)
    }
    val textColor = when (msg.role) {
        "user" -> Color(0xFF21005D)
        "ai" -> Color(0xFF1C1B1F)
        else -> Color(0xFF49454F)
    }

    Box(modifier = Modifier.fillMaxWidth(), contentAlignment = alignment) {
        Surface(
            color = bgColor,
            shape = RoundedCornerShape(20.dp),
            border = if (msg.role == "ai") androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFCAC4D0)) else null
        ) {
            Column(modifier = Modifier.padding(12.dp)) {
                Text(
                    text = msg.text,
                    style = if (msg.role == "system") MaterialTheme.typography.bodySmall.copy(fontStyle = FontStyle.Italic) else MaterialTheme.typography.bodyMedium,
                    color = textColor
                )
                if (msg.role == "ai") {
                    Spacer(modifier = Modifier.height(8.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        Button(
                            onClick = { },
                            modifier = Modifier.height(32.dp).weight(1f),
                            contentPadding = PaddingValues(0.dp)
                        ) {
                            Text("Yes, Correct", style = MaterialTheme.typography.labelSmall)
                        }
                        OutlinedButton(
                            onClick = { },
                            modifier = Modifier.height(32.dp).weight(1f),
                            contentPadding = PaddingValues(0.dp)
                        ) {
                            Text("No, Edit", style = MaterialTheme.typography.labelSmall)
                        }
                    }
                }
            }
        }
    }
}