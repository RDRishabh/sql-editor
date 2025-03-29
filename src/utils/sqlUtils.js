import alasql from 'alasql';
import { saveAs } from 'file-saver';

// Function to load and parse a CSV file
const loadCSV = async (filePath) => {
  const response = await fetch(filePath);
  const text = await response.text();
  const rows = text.split('\n').map(row => row.split(','));
  const headers = rows[0];
  const data = rows.slice(1).map(row =>
    row.reduce((acc, value, index) => {
      acc[headers[index]] = value.trim();
      return acc;
    }, {})
  );
  return data.filter(item => Object.keys(item).length > 0); // Remove empty rows
};

// Initialize the database with CSV data
export const initializeDatabase = async () => {
  // Drop existing tables if they exist
  const tableNames = ['categories', 'customers', 'employees', 'employee_territories', 'products', 'orders', 'order_details', 'suppliers', 'territories', 'regions', 'shippers'];
  tableNames.forEach(table => alasql(`DROP TABLE IF EXISTS ${table}`));

  // Define table schemas and load CSV files
  const tables = [
    {
      name: 'categories',
      schema: 'categoryID INT, categoryName STRING, description STRING, picture STRING',
      filePath: '/csv/categories.csv'
    },
    {
      name: 'customers',
      schema: 'customerID STRING, companyName STRING, contactName STRING, contactTitle STRING, address STRING, city STRING, region STRING, postalCode STRING, country STRING, phone STRING, fax STRING',
      filePath: '/csv/customers.csv'
    },
    {
      name: 'employee_territories',
      schema: 'employeeID INT, territoryID INT',
      filePath: '/csv/employee_territories.csv'
    },
    {
      name: 'employees',
      schema: 'employeeID INT, lastName STRING, firstName STRING, title STRING, titleOfCourtesy STRING, birthDate STRING, hireDate STRING, address STRING, city STRING, region STRING, postalCode STRING, country STRING, homePhone STRING, extension STRING, photo STRING, notes STRING, reportsTo INT, photoPath STRING',
      filePath: '/csv/employees.csv'
    },
    {
      name: 'orders',
      schema: 'orderID INT, customerID STRING, employeeID INT, orderDate STRING, requiredDate STRING, shippedDate STRING, shipVia INT, freight FLOAT, shipName STRING, shipAddress STRING, shipCity STRING, shipRegion STRING, shipPostalCode STRING, shipCountry STRING',
      filePath: '/csv/orders.csv'
    },
    {
      name: 'order_details',
      schema: 'orderID INT, productID INT, unitPrice FLOAT, quantity INT, discount FLOAT',
      filePath: '/csv/order_details.csv'
    },
    {
      name: 'products',
      schema: 'productID INT, productName STRING, supplierID INT, categoryID INT, quantityPerUnit STRING, unitPrice FLOAT, unitsInStock INT, unitsOnOrder INT, reorderLevel INT, discontinued BOOLEAN',
      filePath: '/csv/products.csv'
    },
    {
      name: 'suppliers',
      schema: 'supplierID INT, companyName STRING, contactName STRING, contactTitle STRING, address STRING, city STRING, region STRING, postalCode STRING, country STRING, phone STRING, fax STRING, homepage STRING',
      filePath: '/csv/suppliers.csv'
    },
    {
      name: 'territories',
      schema: 'territoryID INT, territoryDescription STRING, regionID INT',
      filePath: '/csv/territories.csv'
    },
    {
      name: 'regions',
      schema: 'regionID INT, regionDescription STRING',
      filePath: '/csv/regions.csv'
    },
    {
      name: 'shippers',
      schema: 'shipperID INT, companyName STRING, phone STRING',
      filePath: '/csv/shippers.csv'
    }
  ];

  // Load data and create tables
  for (const { name, schema, filePath } of tables) {
    const data = await loadCSV(filePath);

    // Safely create table with IF NOT EXISTS
    alasql(`CREATE TABLE IF NOT EXISTS ${name} (${schema})`);
    
    // Replace table data if it already exists
    alasql.tables[name].data = data;
  }
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

  // Generate CSV content
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => row[header] || '').join(','));
  const csvContent = [headers.join(','), ...rows].join('\n');

  // Create and download CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
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
    name: 'All Categories',
    query: 'SELECT * FROM categories'
  },
  {
    id: 2,
    name: 'All Customers',
    query: 'SELECT * FROM customers'
  },
  {
    id: 3,
    name: 'All Employees',
    query: 'SELECT * FROM employees'
  },
  {
    id: 4,
    name: 'Customers by Country',
    query: `SELECT country, COUNT(*) AS customerCount \nFROM customers \nGROUP BY country \nORDER BY customerCount DESC`
  },
  {
    id: 5,
    name: 'Orders and Customers',
    query: `SELECT orders.orderID, orders.orderDate, customers.contactName, customers.country \nFROM orders\nJOIN customers ON orders.customerID = customers.customerID \nORDER BY orders.orderDate DESC
    `
  },
  {
    id: 6,
    name: 'Revenue by Category',
    query: `SELECT categories.categoryName, \n      SUM(order_details.quantity * order_details.unitPrice) AS totalRevenue \nFROM order_details \nJOIN products ON order_details.productID = products.productID \nJOIN categories ON products.categoryID = categories.categoryID \nGROUP BY categories.categoryName \nORDER BY totalRevenue DESC
    `
  },
];
