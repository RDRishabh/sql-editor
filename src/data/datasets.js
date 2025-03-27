// Simplified Northwind database in JSON format

export const categories = [
  { id: 1, name: "Beverages", description: "Soft drinks, coffees, teas, beers, and ales" },
  { id: 2, name: "Condiments", description: "Sweet and savory sauces, relishes, spreads, and seasonings" },
  { id: 3, name: "Confections", description: "Desserts, candies, and sweet breads" },
  { id: 4, name: "Dairy Products", description: "Cheeses" },
  { id: 5, name: "Grains/Cereals", description: "Breads, crackers, pasta, and cereal" },
  { id: 6, name: "Meat/Poultry", description: "Prepared meats" },
  { id: 7, name: "Produce", description: "Dried fruit and bean curd" },
  { id: 8, name: "Seafood", description: "Seaweed and fish" }
];

export const customers = [
  { id: "ALFKI", companyName: "Alfreds Futterkiste", contactName: "Maria Anders", contactTitle: "Sales Representative", country: "Germany" },
  { id: "ANATR", companyName: "Ana Trujillo Emparedados", contactName: "Ana Trujillo", contactTitle: "Owner", country: "Mexico" },
  { id: "ANTON", companyName: "Antonio Moreno Taquería", contactName: "Antonio Moreno", contactTitle: "Owner", country: "Mexico" },
  { id: "AROUT", companyName: "Around the Horn", contactName: "Thomas Hardy", contactTitle: "Sales Representative", country: "UK" },
  { id: "BERGS", companyName: "Berglunds snabbköp", contactName: "Christina Berglund", contactTitle: "Order Administrator", country: "Sweden" },
  { id: "BLAUS", companyName: "Blauer See Delikatessen", contactName: "Hanna Moos", contactTitle: "Sales Representative", country: "Germany" },
  { id: "BLONP", companyName: "Blondesddsl père et fils", contactName: "Frédérique Citeaux", contactTitle: "Marketing Manager", country: "France" },
  { id: "BOLID", companyName: "Bólido Comidas preparadas", contactName: "Martín Sommer", contactTitle: "Owner", country: "Spain" }
];

export const employees = [
  { id: 1, lastName: "Davolio", firstName: "Nancy", title: "Sales Representative", country: "USA", hireDate: "1992-05-01" },
  { id: 2, lastName: "Fuller", firstName: "Andrew", title: "Vice President, Sales", country: "USA", hireDate: "1992-08-14" },
  { id: 3, lastName: "Leverling", firstName: "Janet", title: "Sales Representative", country: "USA", hireDate: "1992-04-01" },
  { id: 4, lastName: "Peacock", firstName: "Margaret", title: "Sales Representative", country: "USA", hireDate: "1993-05-03" },
  { id: 5, lastName: "Buchanan", firstName: "Steven", title: "Sales Manager", country: "UK", hireDate: "1993-10-17" },
  { id: 6, lastName: "Suyama", firstName: "Michael", title: "Sales Representative", country: "UK", hireDate: "1993-10-17" },
  { id: 7, lastName: "King", firstName: "Robert", title: "Sales Representative", country: "UK", hireDate: "1994-01-02" },
  { id: 8, lastName: "Callahan", firstName: "Laura", title: "Inside Sales Coordinator", country: "USA", hireDate: "1994-03-05" },
  { id: 9, lastName: "Dodsworth", firstName: "Anne", title: "Sales Representative", country: "UK", hireDate: "1994-11-15" }
];

export const products = [
  { id: 1, name: "Chai", categoryId: 1, quantityPerUnit: "10 boxes x 20 bags", unitPrice: 18.0, unitsInStock: 39 },
  { id: 2, name: "Chang", categoryId: 1, quantityPerUnit: "24 - 12 oz bottles", unitPrice: 19.0, unitsInStock: 17 },
  { id: 3, name: "Aniseed Syrup", categoryId: 2, quantityPerUnit: "12 - 550 ml bottles", unitPrice: 10.0, unitsInStock: 13 },
  { id: 4, name: "Chef Anton's Cajun Seasoning", categoryId: 2, quantityPerUnit: "48 - 6 oz jars", unitPrice: 22.0, unitsInStock: 53 },
  { id: 5, name: "Chef Anton's Gumbo Mix", categoryId: 2, quantityPerUnit: "36 boxes", unitPrice: 21.35, unitsInStock: 0 },
  { id: 6, name: "Grandma's Boysenberry Spread", categoryId: 2, quantityPerUnit: "12 - 8 oz jars", unitPrice: 25.0, unitsInStock: 120 },
  { id: 7, name: "Uncle Bob's Organic Dried Pears", categoryId: 7, quantityPerUnit: "12 - 1 lb pkgs.", unitPrice: 30.0, unitsInStock: 15 },
  { id: 8, name: "Northwoods Cranberry Sauce", categoryId: 2, quantityPerUnit: "12 - 12 oz jars", unitPrice: 40.0, unitsInStock: 6 },
  { id: 9, name: "Mishi Kobe Niku", categoryId: 6, quantityPerUnit: "18 - 500 g pkgs.", unitPrice: 97.0, unitsInStock: 29 },
  { id: 10, name: "Ikura", categoryId: 8, quantityPerUnit: "12 - 200 ml jars", unitPrice: 31.0, unitsInStock: 31 },
  { id: 11, name: "Queso Cabrales", categoryId: 4, quantityPerUnit: "1 kg pkg.", unitPrice: 21.0, unitsInStock: 22 },
  { id: 12, name: "Queso Manchego La Pastora", categoryId: 4, quantityPerUnit: "10 - 500 g pkgs.", unitPrice: 38.0, unitsInStock: 86 }
];

export const orders = [
  { id: 10248, customerId: "VINET", employeeId: 5, orderDate: "1996-07-04", freight: 32.38 },
  { id: 10249, customerId: "TOMSP", employeeId: 6, orderDate: "1996-07-05", freight: 11.61 },
  { id: 10250, customerId: "HANAR", employeeId: 4, orderDate: "1996-07-08", freight: 65.83 },
  { id: 10251, customerId: "VICTE", employeeId: 3, orderDate: "1996-07-08", freight: 41.34 },
  { id: 10252, customerId: "SUPRD", employeeId: 4, orderDate: "1996-07-09", freight: 51.30 },
  { id: 10253, customerId: "HANAR", employeeId: 3, orderDate: "1996-07-10", freight: 58.17 },
  { id: 10254, customerId: "CHOPS", employeeId: 5, orderDate: "1996-07-11", freight: 22.98 },
  { id: 10255, customerId: "RICSU", employeeId: 9, orderDate: "1996-07-12", freight: 148.33 }
];

export const orderDetails = [
  { orderId: 10248, productId: 11, unitPrice: 14, quantity: 12, discount: 0 },
  { orderId: 10248, productId: 42, unitPrice: 9.8, quantity: 10, discount: 0 },
  { orderId: 10248, productId: 72, unitPrice: 34.8, quantity: 5, discount: 0 },
  { orderId: 10249, productId: 14, unitPrice: 18.6, quantity: 9, discount: 0 },
  { orderId: 10249, productId: 51, unitPrice: 42.4, quantity: 40, discount: 0 },
  { orderId: 10250, productId: 41, unitPrice: 7.7, quantity: 10, discount: 0 },
  { orderId: 10250, productId: 51, unitPrice: 42.4, quantity: 35, discount: 0.15 },
  { orderId: 10250, productId: 65, unitPrice: 16.8, quantity: 15, discount: 0.15 }
];

// Export the entire database as a single object for easy access
export const northwindDB = {
  categories,
  customers,
  employees,
  products,
  orders,
  orderDetails
};