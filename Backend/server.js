const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./db.js');

dotenv.config();
const app = express();
app.use(express.json());


connectDB()
    .then(() => {
        console.log('✅Database connected');
       
        app.listen(process.env.PORT, () => {
            console.log(`🚀Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.error('Failed to connect to the database', err));