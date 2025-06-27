const express = require('express')
const cors = require('cors');
require('./db/config')
const User = require('./db/User');
const Product = require('./db/Product')
const app = express();
app.use(express.json());
app.use(cors());
const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm';

app.post("/register",async(req,resp)=>{
   const {name,email,password} = req.body;
   console.log("In reg",name,email,password);

   if(req.body.password && req.body.email){
   let user = new User(req.body);
   let result =await user.save();
   result =  result.toObject();
   delete result.password;
   Jwt.sign({result} , jwtKey,{expiresIn:"2h"},(err,token)=>{
      if(err){
        return resp.send({result: 'Something went wrong , Please try after sometime'});
      }
      resp.send({result,auth:token});
   })
    }
    else 
    {
      resp.send({result:"Please provide all details"})
    }
})

app.post('/login',async(req,resp)=>{

if(req.body.password && req.body.email){
   let user = await User.findOne(req.body).select("-password")
   if(user){
         Jwt.sign({user} , jwtKey,{expiresIn:"2h"},(err,token)=>{
         if(err){
           return resp.send({result: 'Something went wrong , Please try after sometime'});
         }
         resp.send({user,auth:token});
      })
     
   }
   else{
      resp.send({result: "No User found 1"});
   }
}
else{
   resp.send({result: "No User found 2"});
}

})

app.post('/add-product',verifyToken,async(req,resp)=>{
   let product = new Product(req.body);
   let result =await product.save();
   result =  result.toObject();
   resp.send(result);
})

app.get('/products',verifyToken,async(req,resp)=>{
   let products = await Product.find();
   if(products.length > 0){
     resp.send(products);
   }
   else{
      resp.send({result: "No Products found"});
   }
})

app.delete('/product/:id',verifyToken,async(req,resp)=>{
   let id = req.params.id;
   let result =  await Product.deleteOne({_id : id});
   resp.send(result);
})

app.get('/product/:id',verifyToken,async(req,resp)=>{
   let id = req.params.id;
   console.log("id",id);
   let result =  await Product.findOne({_id : id});
   if(result){
      resp.send(result);
    }
    else {
      resp.send({result: "No Product found"});
    }
})

app.put('/product/:id',verifyToken,async(req,resp)=>{
   if(req.params.id){
    let result = await Product .updateOne(
      {_id:req.params.id} ,
      {$set:req.body});
      resp.send(result);
    }
    else{
      resp.send({result: "No Product found"});
    }
})

app.get('/search/:key',verifyToken, async (req, res) => {
   if(req.params.key){
   try {
       let result = await Product.find({
           $or: [
               { name: { $regex: req.params.key, $options: "i" } },  // Case-insensitive search
               { category: { $regex: req.params.key, $options: "i" } },
               // { company: { $regex: req.params.key, $options: "i" } },
               { price: { $regex: req.params.key, $options: "i" } }
           ]
       });
     res.send(result);
   } catch (error) {
       res.status(500).json({ error: "Something went wrong" });
   }
}
else{
   let result = await fetch('http://localhost:5000/products')
   res.send(result);
}
});

function verifyToken(req,resp,next){
 let token  = req.header('authorization');
 if(token){
   token = token.split(' ')[1];
   Jwt.verify(token,jwtKey,(err,valid)=>{
      if(err){
         resp.status(401).send({error: "Invalid Token"});
      }
      else{
         next();
      }
   })

 }
 else{
   resp.status(403).send({result:"Please add token with header"});
 }
}

app.listen(5000)