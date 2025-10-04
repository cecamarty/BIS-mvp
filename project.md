
# 📄 Project Description Report

**Project Title:** Expense & Profit Management Web App

---

## 1. Introduction

This project is a **web-based application** that allows users to record **revenues and expenses** and automatically calculates the resulting **profit**. The solution will be built using a **modern full-stack architecture** with:

* **Frontend:** React (for user interface)
* **Backend:** Spring Boot (for REST API and business logic)
* **Database:** MySQL (for persistent storage, hosted on PlanetScale or Docker)

The project is intended as a lightweight **MVP (Minimum Viable Product)** to demonstrate core functionality and integration of these technologies.

---

## 2. Objectives

* Enable users to **add income (revenue) records** with description and date.
* Enable users to **add expense records** with description and date.
* Store all financial records securely in a **MySQL database**.
* Calculate **profit** dynamically as:

[
\text{Profit} = \sum(\text{Revenue}) - \sum(\text{Expenses})
]

* Provide a simple **React-based dashboard** to visualize profit.

---

## 3. System Architecture

### 3.1 Technology Stack

* **Frontend (React)**

  * User input forms (income, expenses)
  * Profit display component
  * REST API integration using Axios

* **Backend (Spring Boot)**

  * RESTful API endpoints
  * Business logic (profit calculation)
  * Spring Data JPA ORM for database access
  * Integration with MySQL

* **Database (MySQL / PlanetScale)**

  * Tables: `revenues`, `expenses`
  * Stores amount, description, date

---

### 3.2 High-Level Workflow

1. User submits revenue/expense form via React UI.
2. React calls Spring Boot REST APIs.
3. Spring Boot saves the record in MySQL using JPA.
4. User requests profit → Spring Boot queries DB, sums revenues & expenses, returns profit.
5. React displays calculated profit in real time.

---

## 4. Database Design

### Table: `revenues`

| Column      | Type    | Description                    |
| ----------- | ------- | ------------------------------ |
| id (PK)     | BIGINT  | Auto-increment primary key     |
| amount      | DECIMAL | Revenue amount                 |
| description | VARCHAR | Revenue description (optional) |
| date        | DATE    | Date of revenue entry          |

### Table: `expenses`

| Column      | Type    | Description                    |
| ----------- | ------- | ------------------------------ |
| id (PK)     | BIGINT  | Auto-increment primary key     |
| amount      | DECIMAL | Expense amount                 |
| description | VARCHAR | Expense description (optional) |
| date        | DATE    | Date of expense entry          |

---

## 5. Folder Structure

### Backend (Spring Boot)

```
backend/
 ├── src/main/java/com/example/finance/
 │    ├── model/
 │    │    ├── Revenue.java
 │    │    └── Expense.java
 │    ├── repository/
 │    │    ├── RevenueRepository.java
 │    │    └── ExpenseRepository.java
 │    ├── controller/
 │    │    └── FinanceController.java
 │    └── FinanceApplication.java
 └── src/main/resources/
      └── application.properties
```

### Frontend (React)

```
frontend/
 ├── src/
 │    ├── components/
 │    │    ├── RevenueForm.jsx
 │    │    ├── ExpenseForm.jsx
 │    │    └── ProfitDisplay.jsx
 │    ├── services/
 │    │    └── api.js   # Axios calls to backend
 │    └── App.jsx
```

---

## 6. API Design

### `POST /api/finance/revenue`

* Adds a new revenue record.

### `POST /api/finance/expense`

* Adds a new expense record.

### `GET /api/finance/profit`

* Returns calculated profit: total revenues – total expenses.

---

## 7. Development Plan

1. **Setup Environment**

   * Configure MySQL (PlanetScale or Docker).
   * Scaffold Spring Boot project with Spring Web, Spring Data JPA, MySQL Driver.
   * Initialize React project (Vite or CRA).

2. **Backend Development**

   * Create Revenue & Expense models.
   * Implement repositories (Spring Data JPA).
   * Create FinanceController with REST APIs.
   * Test APIs with Postman.

3. **Frontend Development**

   * Build forms for revenue and expense entry.
   * Build a component to display profit.
   * Connect frontend to backend APIs via Axios.

4. **Testing & Deployment**

   * Unit test backend logic.
   * Test UI workflows manually.
   * Deploy backend to a cloud service (Heroku / Railway).
   * Deploy frontend (Netlify / Vercel).

---

## 8. Expected Outcome

* A fully functional web app where users can input revenues and expenses.
* Automatic calculation of profit displayed in the React UI.
* Persistent data storage in a hosted MySQL database.


