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
  
 