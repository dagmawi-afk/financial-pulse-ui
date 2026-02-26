# Dala Backend API Contract & Database Schema

## Overview
This document outlines the RESTful API endpoints and database schema required to support the Dala financial aggregator application.

## 1. Database Schema (PostgreSQL/Supabase compatible)

### Table: `users`
- `id`: UUID (Primary Key)
- `email`: VARCHAR(255) (Unique)
- `full_name`: VARCHAR(255)
- `created_at`: TIMESTAMP

### Table: `institutions`
- `id`: UUID (Primary Key)
- `name`: VARCHAR(255)
- `code`: VARCHAR(50) (e.g., 'CBE', 'DASHEN')
- `logo_url`: TEXT

### Table: `accounts`
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to `users`)
- `institution_id`: UUID (Foreign Key to `institutions`)
- `name`: VARCHAR(255) (e.g., 'Main Savings')
- `balance`: DECIMAL(19, 4)
- `currency`: VARCHAR(3) (Default 'ETB')

### Table: `categories`
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to `users`, NULL for system defaults)
- `name`: VARCHAR(255)
- `type`: VARCHAR(20) ('expense', 'revenue')
- `color`: VARCHAR(7) (Hex code)

### Table: `transactions`
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to `users`)
- `account_id`: UUID (Foreign Key to `accounts`)
- `category_id`: UUID (Foreign Key to `categories`)
- `amount`: DECIMAL(19, 4)
- `description`: TEXT
- `raw_sms`: TEXT (Original SMS if applicable)
- `date`: TIMESTAMP
- `status`: VARCHAR(20) ('pending', 'verified', 'flagged')

### Table: `budgets`
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to `users`)
- `category_id`: UUID (Foreign Key to `categories`)
- `limit_amount`: DECIMAL(19, 4)
- `period`: VARCHAR(20) ('daily', 'weekly', 'monthly')
- `start_date`: DATE
- `end_date`: DATE

### Table: `parsing_patterns`
- `id`: UUID (Primary Key)
- `institution_id`: UUID (Foreign Key to `institutions`)
- `regex_pattern`: TEXT
- `fields_mapping`: JSONB (Mapping of regex groups to transaction fields)
- `created_by`: UUID (Foreign Key to `users`)

---

## 2. RESTful API Endpoints

### User Management
- `POST /api/v1/auth/register`: Create new user
- `POST /api/v1/auth/login`: Authenticate and get JWT
- `GET /api/v1/user/profile`: Fetch profile settings

### Financial Data
- `GET /api/v1/accounts`: List all bank accounts with balances
- `GET /api/v1/institutions`: List available financial institutions
- `GET /api/v1/transactions`: Paginated list of transactions (filters: category, date range, institution)
- `PATCH /api/v1/transactions/:id`: Update transaction category or details

### Custom Management
- `POST /api/v1/categories`: Create a custom expense/revenue category
- `GET /api/v1/categories`: Fetch user-specific and system categories
- `GET /api/v1/analytics/distribution`: Get aggregated data for pie charts

### Budgeting
- `GET /api/v1/budgets`: Fetch all active budgets
- `POST /api/v1/budgets`: Create a new budget limit
- `PATCH /api/v1/budgets/:id`: Modify budget amount or duration
- `DELETE /api/v1/budgets/:id`: Remove a budget

### AI & Training
- `POST /api/v1/training/parse`: Test a raw SMS against current parser
- `POST /api/v1/training/submit-feedback`: Submit manual parsing feedback for pattern learning
- `GET /api/v1/training/patterns`: List pending patterns for verification