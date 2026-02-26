package com.dala.logic.ui

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import coil.compose.rememberAsyncImagePainter

@Composable
fun ProfileScreen() {
    var name by remember { mutableStateOf("Samuel Bekele") }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(bottom = 24.dp)
    ) {
        item {
            ProfileHeader(name)
        }

        item {
            PersonalInformationSection(name = name, onNameChange = { name = it })
        }

        item {
            PaddingValues(horizontal = 24.dp).let {
                Column(modifier = Modifier.padding(it)) {
                    Text(
                        text = "Preferences",
                        style = MaterialTheme.typography.titleSmall,
                        color = Color(0xFF6750A4),
                        modifier = Modifier.padding(bottom = 8.dp, top = 24.dp)
                    )
                    MenuButton(icon = Icons.Default.Shield, label = "Security & Privacy")
                    MenuButton(icon = Icons.Default.Notifications, label = "Notification Settings")
                    MenuButton(icon = Icons.Default.HelpCenter, label = "Support Center")
                    MenuButton(icon = Icons.Default.Logout, label = "Sign Out", danger = true)
                }
            }
        }
    }
}

@Composable
fun ProfileHeader(name: String) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(200.dp)
    ) {
        Image(
            painter = rememberAsyncImagePainter("https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/profile-management-visual-adade573-1772092257919.webp"),
            contentDescription = null,
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black.copy(alpha = 0.3f))
        )
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .background(Color(0xFFEADDFF), CircleShape)
                    .border(4.dp, Color.White, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = if (name.isNotEmpty()) name.first().uppercase() else "U",
                    style = MaterialTheme.typography.headlineLarge,
                    color = Color(0xFF21005D),
                    fontWeight = FontWeight.Bold
                )
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = name, style = MaterialTheme.typography.titleLarge, color = Color.White, fontWeight = FontWeight.Bold)
            Text(text = "Member since May 2024", style = MaterialTheme.typography.labelSmall, color = Color.White.copy(alpha = 0.7f))
        }
    }
}

@Composable
fun PersonalInformationSection(name: String, onNameChange: (String) -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(24.dp),
        shape = RoundedCornerShape(28.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFCAC4D0))
    ) {
        Column(modifier = Modifier.padding(24.dp)) {
            Text(text = "Personal Information", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            Spacer(modifier = Modifier.height(16.dp))
            OutlinedTextField(
                value = name,
                onValueChange = onNameChange,
                label = { Text("Display Name") },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp)
            )
            Spacer(modifier = Modifier.height(16.dp))
            Button(
                onClick = { /* Save to SharedPreferences */ },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(28.dp)
            ) {
                Text("Update Profile")
            }
        }
    }
}

@Composable
fun MenuButton(icon: androidx.compose.ui.graphics.vector.ImageVector, label: String, danger: Boolean = false) {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)
            .clickable { },
        shape = RoundedCornerShape(16.dp),
        color = if (danger) Color(0xFFB3261E).copy(alpha = 0.05f) else Color.Transparent
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = if (danger) Color(0xFFB3261E) else Color(0xFF6750A4)
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text(
                text = label,
                modifier = Modifier.weight(1f),
                style = MaterialTheme.typography.bodyLarge,
                color = if (danger) Color(0xFFB3261E) else Color.Black
            )
            Icon(imageVector = Icons.Default.ChevronRight, contentDescription = null, tint = Color(0xFFCAC4D0))
        }
    }
}