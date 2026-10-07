const mysql = require("mysql2/promise");

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     port: '3307',
//     user: 'root',
//     password: 'root',
//     database: 'elvor_threads'
// });

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: "3307",
  user: "root",
  password: "root",
  database: "elvor_threads",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL Connected Successfully!");

    connection.release();
  } catch (err) {
    console.log("Database connection failed");
    console.log(err);
  }
}

testConnection();

async function createTables() {
  const connection = await pool.getConnection();

  try {
    // Users
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);

    // Products
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        image VARCHAR(500),
        stock INT NOT NULL DEFAULT 0,
        
        tag VARCHAR(20),
         original_price DECIMAL(10,2)
      )
    `);

//     ALTER TABLE products ADD COLUMN tag VARCHAR(20);            -- "New" | "Sale" | NULL
// ALTER TABLE products ADD COLUMN original_price DECIMAL(10,2);

    await connection.query(`
  CREATE TABLE IF NOT EXISTS cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    size VARCHAR(20) NOT NULL,

    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

    FOREIGN KEY (product_id)
      REFERENCES products(id)
      ON DELETE CASCADE,

    UNIQUE (user_id, product_id, size)
  )
`);
    // Orders
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
        status ENUM(
          'pending',
          'confirmed',
          'shipped',
          'delivered',
          'cancelled'
        ) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      )
    `);

    // Order items
    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id INT NOT NULL,
        product_id INT NOT NULL,

        product_name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        quantity INT NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,

        FOREIGN KEY (order_id)
          REFERENCES orders(id)
          ON DELETE CASCADE,

        FOREIGN KEY (product_id)
          REFERENCES products(id)
      )
    `);

    //admins
    await connection.query(`CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);


    console.log("All tables are ready.");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    connection.release();
  }
}

module.exports = {
  pool,
  createTables,
};

// module.exports = connection;
