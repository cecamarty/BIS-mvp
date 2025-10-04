# Expense & Profit Management Web App

This project is a web-based application that allows users to record revenues and expenses and automatically calculates the resulting profit.

- **Frontend:** React
- **Backend:** Spring Boot
- **Database:** MySQL

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+
- npm 9+
- A MySQL database

---

### 1. Backend Setup (Spring Boot)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Configure Database:**
    - Create a copy of the example properties file:
      ```bash
      cp src/main/resources/application.properties.example src/main/resources/application.properties
      ```
    - Open `src/main/resources/application.properties` and fill in your MySQL database credentials.

3.  **Build the project:**
    ```bash
    mvn clean install
    ```

4.  **Run the application:**
    ```bash
    mvn spring-boot:run
    ```
    The backend will be running at `http://localhost:8080`.

---

### 2. Frontend Setup (React)

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:5173`.

---

### Project Structure

- `backend/`: Contains the Spring Boot application.
- `frontend/`: Contains the React application.
- `project.md`: Detailed project description report.
