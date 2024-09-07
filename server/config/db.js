const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false }   
    : false,                          
  connectionTimeoutMillis: 5000,
  query_timeout: 10000
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const createTables = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      is_verified BOOLEAN DEFAULT false
    );
  `;

  let retries = 5;
  while (retries) {
    try {
      const client = await pool.connect();
      try {
        await client.query(createTableQuery);
        console.log('Users table created successfully');
        break;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error('Error creating table:', err);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      if (retries === 0) {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
      await new Promise(res => setTimeout(res, 5000));  
    }
  }
};

createTables().catch(console.error);

module.exports = {
  query: (text, params) => pool.query(text, params),
};

 