const pool = require('../config/db');

const User = {
  async create({ firstName, lastName, email, password, role }) {
    try {
      const query = `
        INSERT INTO users (first_name, last_name, email, password, role, is_verified)
        VALUES ($1, $2, $3, $4, $5, false)
        RETURNING *;
      `;
      const values = [firstName, lastName, email, password, role || 'customer']; 
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Database error');
    }
  },

  async findByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = $1;';
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Database error');
    }
  },

  async verifyEmail(email) {
    try {
      const query = 'UPDATE users SET is_verified = true WHERE email = $1 RETURNING *;';
      const result = await pool.query(query, [email]);
      if (result.rowCount === 0) {
        throw new Error('No user found with the given email');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      throw new Error('Database error');
    }
  },
};

module.exports = User;

 
