const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { sendVerificationEmail } = require('../utils/sendEmail');

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { firstName, lastName, email, password, role } = req.body;
  
    try {
      let user = await User.findByEmail(email);
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
       const userRole = role ? role : 'customer';
      
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ firstName, lastName, email, password: hashedPassword, role: userRole });
  
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      await sendVerificationEmail(email, token);
  
      res.status(201).json({ message: 'Registration successful. Check your email for verification link.' });
    } catch (error) {
      console.error('Registration error:', error); 
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      if (!user.is_verified) {
        return res.status(400).json({ message: 'Please verify your email' });
      }
  
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not allowed to login from here' });
      }
  
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, message: 'Login successful' });
    } catch (error) {
      console.error('Login error:', error); 
      res.status(500).json({ error: 'Server error' });
    }
  };


const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    // Find the user and update their verification status
    const client = await pool.connect();
    const result = await client.query('UPDATE users SET is_verified = true WHERE email = $1 RETURNING id', [email]);
    client.release();

    if (result.rowCount === 0) {
      return res.status(400).send('Invalid or expired token');
    }

    // Redirect to login page
    res.redirect('/login?verification=success');
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).send('Internal server error');
  }
};

// // Check if email is verified
// exports.verifyEmail = async (req, res) => {
//   const { token } = req.query;

//   if (!token) {
//     return res.status(400).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const { email } = decoded;

//     // Ensure email is updated to verified status
//     await User.verifyEmail(email);
//     res.status(200).json({ message: 'Email verified successfully' });
//   } catch (error) {
//     console.error('Email verification error:', error);
//     res.status(400).json({ message: 'Invalid or expired token' });
//   }
// };

  
 
