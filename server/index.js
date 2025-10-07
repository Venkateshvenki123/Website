// server/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/interview_portal', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

