// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// export const Product = () => {
//     const [name,setName] = useState("")
//     const [price,setPrice] = useState("")
//     const [category,setCategory] = useState("")
//     const [company,setCompany] = useState("")
//     const [error,setError] = useState(false)
//     const navigate = new useNavigate();

//     const addProduct = async()=>{

//        if(!name || !price || !category || !company){
//         setError(true)
//         return false;
//        }
//         let userId = JSON.parse(localStorage.getItem("user"))._id;

//         let result = await fetch('http://localhost:5000/add-product', {
//             method :'post',
//             body : JSON.stringify({name,price,category,company,userId}),
//             headers : {
//                 'content-Type': "application/json",
//                 'Authorization' : `Bearer ${JSON.parse(localStorage.getItem("token"))}`
//             }
//         })
//         result = await result.json();
//         navigate('/')
        

//     }
//   return (
//     <div className='register'>
//         <h3>Add Product</h3>
//         <input className='inputBox' type='text' placeholder='enter name' value={name} onChange ={(e)=>setName(e.target.value)}/>
//         {error && !name && <span className="invalidProduct">Enter Valid Name</span> }
//         <input className='inputBox' type='text' placeholder='enter price' value={price} onChange ={(e)=>setPrice(e.target.value)}/>
//         {error && !price && <span className="invalidProduct">Enter Valid Price</span>}
//         <input className='inputBox' type='text' placeholder='enter category' value={category} onChange ={(e)=>setCategory(e.target.value)} />
//         {error && !category && <span className="invalidProduct">Enter Valid Category</span>}
//         <input className='inputBox' type='text' placeholder='enter company' value={company} onChange ={(e)=>setCompany(e.target.value)} />
//         {error && !company &&<span className="invalidProduct">Enter Valid Company</span>}
//         <button className='appButton' type='button' onClick={addProduct}>Add Product</button>
//     </div>
//   )
// }


import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Product = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    company: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let temp = {};
    temp.name = formData.name ? '' : 'Name is required';
    temp.price = formData.price ? '' : 'Price is required';
    temp.category = formData.category ? '' : 'Category is required';
    temp.company = formData.company ? '' : 'Company is required';

    setErrors(temp);
    return Object.values(temp).every((x) => x === '');
  };

  const addProduct = async () => {
    if (!validate()) return;

    let userId = JSON.parse(localStorage.getItem('user'))._id;

    let result = await fetch('http://localhost:5000/add-product', {
      method: 'POST',
      body: JSON.stringify({ ...formData, userId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });

    result = await result.json();
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom align="center">
          Add Product
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={Boolean(errors.price)}
            helperText={errors.price}
            fullWidth
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            error={Boolean(errors.category)}
            helperText={errors.category}
            fullWidth
          />
          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            error={Boolean(errors.company)}
            helperText={errors.company}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={addProduct}
            sx={{ mt: 1 }} >
            Add Product
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
           Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
