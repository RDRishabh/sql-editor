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

