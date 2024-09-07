const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');
const { verifyEmail } = require('../middleware/verifyEmail');
const router = express.Router();

router.post(
  '/register',
  [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  register
);

router.post('/login', login);
router.get('/verify-email', verifyEmail);

module.exports = router;
