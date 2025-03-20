const mongoose = require('mongoose');

const connectDB = () => {
    return mongoose.connect(process.env.DB_uri, {
      
    });
};

module.exports = { connectDB };