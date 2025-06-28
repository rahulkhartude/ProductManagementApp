// // const mongoose = require('mongoose');
// // mongoose.connect("mongodb://localhost:27017/e-commerce")

// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // })
// // .then(() => console.log('MongoDB connected'))
// // .catch((err) => console.error('MongoDB connection error:', err));


// // db/config.js

// // This line MUST be at the top of your config.js file
// // It imports the mongoose library and assigns it to the 'mongoose' variable.
// const mongoose = require('mongoose');

// // Define a default MongoDB URI for local development or if the environment variable isn't set.
// // Remember to replace 'YOUR_ACTUAL_PASSWORD' with your real MongoDB Atlas user password.
// const defaultMongoURI = "mongodb+srv://rahulkhartude3130:Rahul@123@cluster0.juwyq.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0";

// // Get the MongoDB URI from the environment variable process.env.MONGO_URI.
// // If the environment variable is not set, fall back to the defaultMongoURI.
// const mongoURI = process.env.MONGO_URI || defaultMongoURI;

// // Attempt to connect to MongoDB using the determined URI.
// // The options are recommended to avoid deprecation warnings and ensure stable connections.
// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected successfully!')) // Log on successful connection
// .catch(err => {
//     console.error('MongoDB connection error:', err); // Log the full error object for debugging
//     // If the database connection is critical, you might consider exiting the process here:
//     // process.exit(1); 
// });

// // You can optionally export the mongoose instance or the connection object
// // if other parts of your application need direct access to it.
// // module.exports = mongoose;


const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
