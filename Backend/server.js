const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./db.js');
const projectRoutes = require('./Routes/projectRoutes.js');
const tasksRoutes = require('./Routes/taskRoutes.js');
const resourceRoute = require('./Routes/resourceRoutes.js');

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 




app.use('/api/projects', projectRoutes); 
app.use('/api/tasks', tasksRoutes);
app.use('/api/resource', resourceRoute);


connectDB()
    .then(() => {
        console.log('✅ Database connected');

        // Start the server
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.error('Failed to connect to the database', err));