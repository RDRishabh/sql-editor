import alasql from 'alasql';
import { saveAs } from 'file-saver';
import { northwindDB } from '../data/datasets';

// Initialize alasql with the Northwind database tables
export const initializeDatabase = () => {
  Object.keys(northwindDB).forEach(table => {
    alasql(`DROP TABLE IF EXISTS ${table}`);
  });

  alasql('CREATE TABLE categories');
  alasql('CREATE TABLE customers');
  alasql('CREATE TABLE employees');
  alasql('CREATE TABLE products');
  alasql('CREATE TABLE orders');
  alasql('CREATE TABLE orderDetails');

  alasql.tables.categories.data = northwindDB.categories;
  alasql.tables.customers.data = northwindDB.customers;
  alasql.tables.employees.data = northwindDB.employees;
  alasql.tables.products.data = northwindDB.products;
  alasql.tables.orders.data = northwindDB.orders;
  alasql.tables.orderDetails.data = northwindDB.orderDetails;
};

// Execute SQL query against the in-memory database
export const executeQuery = (query) => {
  try {
    const result = alasql(query);
    return { success: true, data: result };
  } catch (error) {
    console.error('SQL Query Error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Export query results to CSV
export const exportToCSV = (data, filename = 'query_results.csv') => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }
  
  const csv = alasql('SELECT * INTO CSV FROM ?', [data]);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, filename);
};

// Export query results to JSON
export const exportToJSON = (data, filename = 'query_results.json') => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }
  
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  saveAs(blob, filename);
};

// Predefined queries for dropdown
export const predefinedQueries = [
  {
    id: 1,
    name: 'All Products',
    query: 'SELECT * FROM products'
  },
  {
    id: 2,
    name: 'Products by Category',
    query: 'SELECT p.id, p.name, c.name AS category, p.unitPrice, p.unitsInStock FROM products p JOIN categories c ON p.categoryId = c.id ORDER BY c.name, p.name'
  },
  {
    id: 3,
    name: 'Top 5 Products by Stock',
    query: 'SELECT name, unitPrice, unitsInStock FROM products ORDER BY unitsInStock DESC LIMIT 5'
  },
  {
    id: 4,
    name: 'Customers by Country',
    query: 'SELECT country, COUNT(*) AS customerCount FROM customers GROUP BY country ORDER BY customerCount DESC'
  },
  {
    id: 5,
    name: 'Employee Details',
    query: 'SELECT id, firstName, lastName, title, country FROM employees ORDER BY lastName'
  },
  {
    id: 6,
    name: 'Products Out of Stock',
    query: 'SELECT id, name, unitPrice, unitsInStock FROM products WHERE unitsInStock = 0'
  }
];