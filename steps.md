# Project Development Steps

This document outlines the steps taken to build the Expense & Profit Management Web App.

## Backend

### 1. Initial Scaffolding
- Created the initial package structure: `com/bis/finance/model`, `com/bis/finance/repository`, and `com/bis/finance/controller`.
- *(Note: The package was initially named `com.example.finance` and was subsequently refactored to `com.bis.finance`)*.

### 2. Model (Entity) Creation
- Created JPA entity classes `Revenue.java` and `Expense.java` in the `com.bis.finance.model` package to represent financial records.

### 3. Repository Creation
- Created Spring Data JPA interfaces `RevenueRepository.java` and `ExpenseRepository.java` in the `com.bis.finance.repository` package to manage database operations.

### 4. Controller and API Implementation
- Created `FinanceController.java` in the `com.bis.finance.controller` package.
- Implemented the following RESTful API endpoints:
  - `POST /api/finance/revenue`: To add a new revenue record.
  - `POST /api/finance/expense`: To add a new expense record.
  - `GET /api/finance/profit`: To calculate and return the total profit.

## Frontend

### 5. Initial Scaffolding
- Created `components` and `services` directories within `frontend/src`.
- Installed the `axios` library for making HTTP requests to the backend.

### 6. API Service Creation
- Created `frontend/src/services/api.ts` to centralize API calls to the backend, providing functions to get profit and add records.

### 7. Component Implementation
- Replaced the boilerplate Vite+React code.
- Created three functional React components:
  - `ProfitDisplay.tsx`: To display the fetched profit.
  - `RevenueForm.tsx`: A controlled form for submitting new revenue.
  - `ExpenseForm.tsx`: A controlled form for submitting new expenses.
- Integrated all components into `App.tsx`, which manages the application state and handles API interactions.
