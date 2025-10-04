# Project Development Steps

This document outlines the steps taken to build the Expense & Profit Management Web App.

## Backend

### 1. Initial Scaffolding
- Created the initial package structure for models, repositories, and controllers.
- *(Note: The package structure was refactored to `com.bis.bis.finance` to resolve component scanning issues after initial setup.)*

### 2. Model (Entity) Creation
- Created JPA entity classes `Revenue.java` and `Expense.java` in the `com.bis.bis.finance.model` package.

### 3. Repository Creation
- Created Spring Data JPA interfaces `RevenueRepository.java` and `ExpenseRepository.java` in the `com.bis.bis.finance.repository` package.

### 4. Controller and API Implementation
- Created `FinanceController.java` in the `com.bis.bis.finance.controller` package to handle API requests.

### 5. CORS Configuration
- Added a global `WebConfig.java` and a controller-specific `@CrossOrigin` annotation to resolve Cross-Origin Resource Sharing (CORS) errors.

### 6. Backend Refactoring (Fixing 404 Error)
- **Problem:** After fixing CORS, API requests were failing with a `404 Not Found` error.
- **Cause:** The main application class (`com.bis.bis.BisApplication`) was not in a parent package of the components, so they were not being loaded by Spring.
- **Solution:** Moved all components into the `com.bis.bis.finance` package to ensure they were discovered by Spring's component scan.

## Frontend

### 7. Initial Scaffolding
- Created `components` and `services` directories and installed `axios`.

### 8. API Service & Component Implementation
- Created the `api.ts` service, the `ProfitDisplay`, `RevenueForm`, and `ExpenseForm` components, and integrated them into `App.tsx` to create a functional UI.
