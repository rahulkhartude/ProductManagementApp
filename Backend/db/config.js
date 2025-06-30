require('dotenv').config();
const mongoose = require('mongoose');
console.log('MONGO_URI is:', process.env.MONGO_URI);
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
