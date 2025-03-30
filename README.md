# SQL Query Interface

## Overview
The **SQL Query Interface** is a web application designed to provide users with an intuitive and powerful tool for executing and exploring SQL queries. This application offers a streamlined experience with an interactive query editor, predefined SQL queries, and a robust results table for analysis.

## System Architecture
### 1. Frontend Components
- **Sidebar Component**: Manages predefined queries.
- **Query Editor Component**: Allows users to edit and execute queries.
- **Results Table Component**: Displays query results with advanced features.

### 2. Frontend Utility
- **AlaSQL**: Uses the React library `alasql` to parse and execute queries.

## Key Features
### 1. Predefined Queries
- Sidebar contains a curated list of predefined SQL queries.
- Users can quickly load and execute standard queries.

### 2. Query Editor
- Fully editable query interface.
- Allows direct execution of modified queries.
- "Run" button for query execution.

### 3. Results Table
#### 3.1 Sorting Mechanism
- **Tri-state column sorting:**
  1. First click: Ascending order.
  2. Second click: Descending order.
  3. Third click: Original order.

#### 3.2 Pagination
- Default: **10 rows per page**.
- Configurable page size options:
  - 10 rows
  - 50 rows
  - 100 rows

#### 3.3 Export Functionality
- Export results to **CSV**.
- Export results to **JSON**.

## Technology Stack
- **Frontend**: React
- **CI/CD**: Git/GitHub
- **Deployment**: Vercel

# External Libraries Used

### Dependencies
- `@monaco-editor/react` - Code editor for SQL query editing.
- `@tanstack/react-query` - Data fetching and state management.
- `alasql` - SQL execution within the browser.
- `file-saver` - Enables file exports (CSV, JSON).
- `lucide-react` - Icon library for UI elements.
- `openai` - Placeholder for AI-based features (if applicable).
- `react` - Core library for building the UI.
- `react-dom` - React's DOM renderer.
- `react-hot-toast` - Notification system for UI feedback.
- `react-router-dom` - Routing and navigation within the app.

### DevDependencies
- `@eslint/js` - Linting rules for JavaScript.
- `@types/react` & `@types/react-dom` - Type definitions for React.
- `@vitejs/plugin-react` - Plugin for React with Vite.
- `eslint` - Linter for code quality.
- `eslint-plugin-react-hooks` - Ensures proper use of React Hooks.
- `eslint-plugin-react-refresh` - Optimizes React refresh during development.
- `globals` - Provides globally recognized variables.
- `vite` - Fast development server and build tool.

## Target Users
- **Data Engineers**
- **Business Analysts**
- **Data Scientists**
- **Researchers**
- **Decision Makers**

## Installation & Setup
### Prerequisites
- **Node.js** (Latest LTS recommended)
- **npm** or **yarn** installed

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/RDRishabh/sql-editor.git
   cd sql-editor
   ```
2. Install dependencies:
   ```bash
   npm install  # or yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev  # or yarn dev
   ```
4. Open in browser:
   - Visit `http://localhost:3000`

## Contact
- **Author**: RDRishabh
- **GitHub**: [RDRishabh](https://github.com/RDRishabh)
- **Email**: rishabhdidwania22@gmail.com

