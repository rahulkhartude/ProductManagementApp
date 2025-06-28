require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const Jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const jwtKey = 'e-comm';
const allowedOrigin = 'https://guileless-beijinho-4b808b.netlify.app'; // Netlify frontend URL

// ✅ Configure CORS middleware
app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// ✅ Handle preflight requests for all routes
app.options('*', cors({
    origin: allowedOrigin,
    credentials: true
}));

// ✅ Routes

// Register route
app.post("/register", async (req, resp) => {
    const { name, email, password } = req.body;
    console.log("In reg", name, email, password);

    if (name && email && password) {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                return resp.send({ result: 'Something went wrong, please try after sometime' });
            }
            resp.send({ result, auth: token });
        });
    } else {
        resp.send({ result: "Please provide all details" });
    }
});

// Login route
app.post('/login', async (req, resp) => {
    const { email, password } = req.body;

    if (email && password) {
        let user = await User.findOne({ email, password }).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    return resp.send({ result: 'Something went wrong, please try after sometime' });
                }
                resp.send({ user, auth: token });
            });
        } else {
            resp.send({ result: "No User found" });
        }
    } else {
        resp.send({ result: "Please provide email and password" });
    }
});

// Add product
app.post('/add-product', verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

// Get all products
app.get('/products', verifyToken, async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No Products found" });
    }
});

// Delete product by ID
app.delete('/product/:id', verifyToken, async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

// Get single product by ID
app.get('/product/:id', verifyToken, async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No Product found" });
    }
});

// Update product
app.put('/product/:id', verifyToken, async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    resp.send(result);
});

// Search products
app.get('/search/:key', verifyToken, async (req, res) => {
    const key = req.params.key;
    if (key) {
        try {
            let result = await Product.find({
                $or: [
                    { name: { $regex: key, $options: "i" } },
                    { category: { $regex: key, $options: "i" } },
                    { price: { $regex: key, $options: "i" } }
                ]
            });
            res.send(result);
        } catch (error) {
            console.error("Search error:", error);
            res.status(500).json({ error: "Something went wrong" });
        }
    } else {
        try {
            let products = await Product.find();
            res.status(200).send(products);
        } catch (error) {
            console.error("Get all products for empty search error:", error);
            res.status(500).send({ result: "Failed to retrieve all products for search" });
        }
    }
});

// ✅ Middleware to verify token
function verifyToken(req, resp, next) {
    let token = req.header('authorization');
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ error: "Invalid Token" });
            } else {
                next();
            }
        });
    } else {
        resp.status(403).send({ result: "Please add token with header" });
    }
}

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Backend Server is running on port ${port}`);
});
