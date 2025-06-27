
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'

// export const UpdateProduct = () => {
//     const [name,setName] = useState("")
//     const [price,setPrice] = useState("")
//     const [category,setCategory] = useState("")
//     const [company,setCompany] = useState("")
//     const [error,setError] = useState(false)
//     const navigate =  useNavigate();
//     const param = useParams();

//     useEffect(()=>{
//         getProductDetails();
   
//     },[])

//    async function getProductDetails(){
//     let token = JSON.parse(localStorage.getItem('token'))
//     let product = await fetch(`http://localhost:5000/product/${param.id}`,{
//         headers :{
//              "authorization": `Bearer ${token}`
//         }
//     })
//     product = await product.json();
//     setName(product.name);
//     setPrice(product.price);
//     setCategory(product.category);
//     setCompany(product.company)
//    }
//    const updateProduct = async () => {
//     let token = JSON.parse(localStorage.getItem('token'))
//     try {
//         const response = await fetch(`http://localhost:5000/product/${param.id}`, {
//             method: 'PUT',
//             body: JSON.stringify({ name, price, category, company }),
//             headers: {
//                 "Content-Type": "application/json",
//                 "authorization": `Bearer ${token}`
                
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.status} - ${response.statusText}`);
//         }

//         const result = await response.json();
//         console.log("Update Successful:", result);
        
//     } catch (error) {
//         console.error("Failed to update product:", error);
//     }
//     navigate('/')
// };

//   return (
//     <div className='register'>
//         <h3>Update Product</h3>
//         <input className='inputBox' type='text' placeholder='enter name' value={name} onChange ={(e)=>setName(e.target.value)}/>
//         <input className='inputBox' type='text' placeholder='enter price' value={price} onChange ={(e)=>setPrice(e.target.value)}/>
//         <input className='inputBox' type='text' placeholder='enter category' value={category} onChange ={(e)=>setCategory(e.target.value)} />
//         <input className='inputBox' type='text' placeholder='enter company' value={company} onChange ={(e)=>setCompany(e.target.value)} />
//         <button className='appButton' type='button' onClick={()=>updateProduct()}>Update</button> 
//         <button className='backButton'  onClick={() => navigate(-1)}>Back</button>
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Alert,
  Paper,
} from '@mui/material';

export const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    let product = await fetch(`http://localhost:5000/product/${param.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    product = await product.json();
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setCompany(product.company);
  };

  const updateProduct = async () => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/product/${param.id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      await response.json();
      navigate('/');
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Update Product
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Please fill in all fields.
          </Alert>
        )}

        <Stack spacing={2}>
          <TextField
            label="Product Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Price"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />
          <TextField
            label="Category"
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          />
          <TextField
            label="Company"
            variant="outlined"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            fullWidth
          />

          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" color="primary" onClick={updateProduct}>
              Update
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
