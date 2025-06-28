// const express = require('express')
// const cors = require('cors');
// require('./db/config')
// const User = require('./db/User');
// const Product = require('./db/Product')
// const app = express();
// app.use(express.json());
// // app.use(cors());
// const Jwt = require('jsonwebtoken')
// const jwtKey = 'e-comm';

// const allowedOrigin = 'https://guileless-beijinho-4b808b.netlify.app'; // Your Netlify frontend URL

// // Configure CORS middleware
// app.use(cors({
//     origin: allowedOrigin,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     credentials: true, // Allow cookies to be sent (if you were using them)
//     optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
// }));

// app.post("/register",async(req,resp)=>{
//    const {name,email,password} = req.body;
//    console.log("In reg",name,email,password);

//    if(req.body.password && req.body.email){
//    let user = new User(req.body);
//    let result =await user.save();
//    result =  result.toObject();
//    delete result.password;
//    Jwt.sign({result} , jwtKey,{expiresIn:"2h"},(err,token)=>{
//       if(err){
//         return resp.send({result: 'Something went wrong , Please try after sometime'});
//       }
//       resp.send({result,auth:token});
//    })
//     }
//     else 
//     {
//       resp.send({result:"Please provide all details"})
//     }
// })

// app.post('/login',async(req,resp)=>{

// if(req.body.password && req.body.email){
//    let user = await User.findOne(req.body).select("-password")
//    if(user){
//          Jwt.sign({user} , jwtKey,{expiresIn:"2h"},(err,token)=>{
//          if(err){
//            return resp.send({result: 'Something went wrong , Please try after sometime'});
//          }
//          resp.send({user,auth:token});
//       })
     
//    }
//    else{
//       resp.send({result: "No User found 1"});
//    }
// }
// else{
//    resp.send({result: "No User found 2"});
// }

// })

// app.post('/add-product',verifyToken,async(req,resp)=>{
//    let product = new Product(req.body);
//    let result =await product.save();
//    result =  result.toObject();
//    resp.send(result);
// })

// app.get('/products',verifyToken,async(req,resp)=>{
//    let products = await Product.find();
//    if(products.length > 0){
//      resp.send(products);
//    }
//    else{
//       resp.send({result: "No Products found"});
//    }
// })

// app.delete('/product/:id',verifyToken,async(req,resp)=>{
//    let id = req.params.id;
//    let result =  await Product.deleteOne({_id : id});
//    resp.send(result);
// })

// app.get('/product/:id',verifyToken,async(req,resp)=>{
//    let id = req.params.id;
//    console.log("id",id);
//    let result =  await Product.findOne({_id : id});
//    if(result){
//       resp.send(result);
//     }
//     else {
//       resp.send({result: "No Product found"});
//     }
// })

// app.put('/product/:id',verifyToken,async(req,resp)=>{
//    if(req.params.id){
//     let result = await Product .updateOne(
//       {_id:req.params.id} ,
//       {$set:req.body});
//       resp.send(result);
//     }
//     else{
//       resp.send({result: "No Product found"});
//     }
// })

// app.get('/search/:key',verifyToken, async (req, res) => {
//    if(req.params.key){
//    try {
//        let result = await Product.find({
//            $or: [
//                { name: { $regex: req.params.key, $options: "i" } },  // Case-insensitive search
//                { category: { $regex: req.params.key, $options: "i" } },
//                // { company: { $regex: req.params.key, $options: "i" } },
//                { price: { $regex: req.params.key, $options: "i" } }
//            ]
//        });
//      res.send(result);
//    } catch (error) {
//        res.status(500).json({ error: "Something went wrong" });
//    }
// }
// else{
//    let result = await fetch('http://localhost:5000/products')
//    res.send(result);
// }
// });

// function verifyToken(req,resp,next){
//  let token  = req.header('authorization');
//  if(token){
//    token = token.split(' ')[1];
//    Jwt.verify(token,jwtKey,(err,valid)=>{
//       if(err){
//          resp.status(401).send({error: "Invalid Token"});
//       }
//       else{
//          next();
//       }
//    })

//  }
//  else{
//    resp.status(403).send({result:"Please add token with header"});
//  }
// }

// app.listen(5000)

    

// Backend/index.js

// 1. Load environment variables from .env file (for local development)
// This MUST be at the very top of your entry file.
require('dotenv').config();

const express = require('express');
const cors = require('cors');
// Your database connection setup
require('./db/config'); 
const User = require('./db/User');
const Product = require('./db/Product');
const Jwt = require('jsonwebtoken');

// 2. IMPORTANT: Get JWT secret from environment variable for security
const jwtKey = process.env.JWT_SECRET || 'e-comm-default-secret'; // Use a strong default for dev, but REQUIRED in production .env / Render env vars!

const app = express();
app.use(express.json());

// 3. Configure CORS middleware with your specific Netlify frontend URL
const allowedOrigin = 'https://guileless-beijinho-4b808b.netlify.app'; // Your Netlify frontend URL
app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed (though you're using JWT tokens)
    optionsSuccessStatus: 200 // Recommended for wider browser compatibility
}));

// Optional: A basic root route to confirm backend is running
app.get('/', (req, res) => {
    res.send('Backend API is running!');
});

// User Registration
app.post("/register", async (req, resp) => {
    const { name, email, password } = req.body;
    // Basic validation
    if (!name || !email || !password) {
        return resp.status(400).send({ result: "Please provide all details" });
    }

    try {
        let user = new User({ name, email, password }); // Create new User instance
        let result = await user.save(); // Save user to database
        result = result.toObject(); // Convert Mongoose document to plain object
        delete result.password; // Remove password from response for security

        Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                console.error("JWT sign error during registration:", err);
                return resp.status(500).send({ result: 'Something went wrong, Please try after sometime' });
            }
            resp.status(201).send({ result, auth: token }); // 201 Created for successful registration
        });
    } catch (error) {
        console.error("User registration error:", error);
        // Check for duplicate key error (e.g., email already exists)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return resp.status(409).send({ result: 'Email is already registered. Please use a different email.' });
        }
        resp.status(500).send({ result: 'Internal Server Error during registration' });
    }
});

// User Login
app.post('/login', async (req, resp) => {
    const { email, password } = req.body;
    // Basic validation
    if (!email || !password) {
        return resp.status(400).send({ result: "Please provide email and password" });
    }

    try {
        // Find user by email and password. In a real app, you'd hash the stored password
        // and compare the hashed version. This is a direct match for demonstration.
        let user = await User.findOne({ email, password }).select("-password"); // Exclude password from fetched user object

        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    console.error("JWT sign error during login:", err);
                    return resp.status(500).send({ result: 'Something went wrong, Please try after sometime' });
                }
                resp.status(200).send({ user, auth: token }); // 200 OK for successful login
            });
        } else {
            resp.status(401).send({ result: "Invalid Email or Password" }); // 401 Unauthorized for incorrect credentials
        }
    } catch (error) {
        console.error("Login process error:", error);
        resp.status(500).send({ result: 'Internal Server Error during login' });
    }
});

// Add Product (protected by verifyToken)
app.post('/add-product', verifyToken, async (req, resp) => {
    try {
        let product = new Product(req.body);
        let result = await product.save();
        result = result.toObject();
        resp.status(201).send(result); // 201 Created
    } catch (error) {
        console.error("Add product error:", error);
        resp.status(500).send({ result: 'Failed to add product' });
    }
});

// Get All Products (protected by verifyToken)
app.get('/products', verifyToken, async (req, resp) => {
    try {
        let products = await Product.find();
        if (products.length > 0) {
            resp.status(200).send(products); // 200 OK
        } else {
            resp.status(404).send({ result: "No Products found" }); // 404 Not Found
        }
    } catch (error) {
        console.error("Get products error:", error);
        resp.status(500).send({ result: 'Failed to retrieve products' });
    }
});

// Delete Product by ID (protected by verifyToken)
app.delete('/product/:id', verifyToken, async (req, resp) => {
    try {
        let id = req.params.id;
        let result = await Product.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            resp.status(200).send({ message: "Product deleted successfully" }); // 200 OK
        } else {
            resp.status(404).send({ result: "Product not found" }); // 404 Not Found
        }
    } catch (error) {
        console.error("Delete product error:", error);
        resp.status(500).send({ result: 'Failed to delete product' });
    }
});

// Get Single Product by ID (protected by verifyToken)
app.get('/product/:id', verifyToken, async (req, resp) => {
    try {
        let id = req.params.id;
        let result = await Product.findOne({ _id: id });
        if (result) {
            resp.status(200).send(result); // 200 OK
        } else {
            resp.status(404).send({ result: "No Product found" }); // 404 Not Found
        }
    } catch (error) {
        console.error("Get single product error:", error);
        resp.status(500).send({ result: 'Failed to retrieve product' });
    }
});

// Update Product by ID (protected by verifyToken)
app.put('/product/:id', verifyToken, async (req, resp) => {
    try {
        if (!req.params.id) { // Basic check for ID
            return resp.status(400).send({ result: "Product ID is required" });
        }
        let result = await Product.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        resp.status(200).send(result); // 200 OK
    } catch (error) {
        console.error("Update product error:", error);
        resp.status(500).send({ result: 'Failed to update product' });
    }
});

// Search Products (protected by verifyToken)
app.get('/search/:key', verifyToken, async (req, res) => {
    if (req.params.key) {
        try {
            let result = await Product.find({
                "$or": [
                    { name: { "$regex": req.params.key, "$options": "i" } },
                    { category: { "$regex": req.params.key, "$options": "i" } },
                    { company: { "$regex": req.params.key, "$options": "i" } } // Uncomment if company field is desired for search
                ]
            });
            res.status(200).send(result); // 200 OK
        } catch (error) {
            console.error("Search error:", error);
            res.status(500).json({ error: "Something went wrong during search" });
        }
    } else {
        // If no search key, fetch all products (as done in /products route)
        try {
            let products = await Product.find();
            res.status(200).send(products);
        } catch (error) {
            console.error("Get all products for empty search error:", error);
            res.status(500).send({ result: "Failed to retrieve all products for search" });
        }
    }
});

// JWT Verification Middleware
function verifyToken(req, resp, next) {
    let token = req.header('authorization');
    if (token) {
        token = token.split(' ')[1]; // Extract token from "Bearer <token>"
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ error: "Invalid Token" }); // 401 Unauthorized
            } else {
                next(); // Proceed to the next middleware/route handler
            }
        });
    } else {
        resp.status(403).send({ result: "Please add token with header" }); // 403 Forbidden
    }
}

// 4. Use process.env.PORT for dynamic port assignment (REQUIRED for Render)
const port = process.env.PORT || 5000; // Use port provided by environment or default to 5000
app.listen(port, () => {
    console.log(`Backend Server is running on port ${port}`);
});
