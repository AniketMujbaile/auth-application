const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyEmail = async (req, res) => {
  const token = req.query.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.verifyEmail(decoded.email);
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
