const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const app = express();
const pool = require('./config/db');

dotenv.config();

// Configure CORS
app.use(cors({
  origin: process.env.CLIENT_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
