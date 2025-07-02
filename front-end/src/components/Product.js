
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
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ''; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let temp = {};
    temp.name = formData.name ? '' : 'Name is required';
    // temp.price = formData.price ? '' : 'Price is required';
    if (!formData.price) {
    temp.price = 'Price is required';
  } else if (isNaN(formData.price)) {
    temp.price = 'Price must be a number';
  } else if (Number(formData.price) <= 0) {
    temp.price = 'Price must be greater than 0';
  } else {
    temp.price = '';
  }
    temp.category = formData.category ? '' : 'Category is required';
    temp.company = formData.company ? '' : 'Company is required';


    setErrors(temp);
    return Object.values(temp).every((x) => x === '');
  };

  const addProduct = async () => {
    if (!validate()) return;

    let userId = JSON.parse(localStorage.getItem('user'))._id;

     let result = await fetch(`${BACKEND_URL}add-product`, {
      method: 'POST',
      body: JSON.stringify({ ...formData, userId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });

    result = await result.json();
    console.log("product added",result);
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
