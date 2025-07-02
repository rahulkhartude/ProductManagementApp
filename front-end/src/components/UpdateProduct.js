
// //deployment code
// // src/components/UpdateProduct.js
// import React, { useEffect, useState, useCallback } from 'react'; // Added useCallback
// import { useNavigate, useParams } from 'react-router-dom';
// import {
//     TextField,
//     Button,
//     Box,
//     Typography,
//     Stack,
//     Alert,
//     Paper,
// } from '@mui/material';

// export const UpdateProduct = () => {
   
//     const [company, setCompany] = useState('');
//     const [error, setError] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         price: '',
//         category: '',
//         company: ''
//     });
//     const navigate = useNavigate();
//     const param = useParams();
//     const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
//     const [errors, setErrors] = useState({});

//     const getProductDetails = useCallback(async () => {
//         const token = JSON.parse(localStorage.getItem('token'));
//         let url = `${BACKEND_URL}product/${param.id}`; // Construct URL with id

//         try {
//             let response = await fetch(url, {
//                 headers: {
//                     authorization: `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) {
//                 // Handle HTTP errors, e.g., product not found (404)
//                 const errorText = await response.text();
//                 console.error(`Failed to fetch product details: HTTP Status ${response.status}, Details: ${errorText}`);
//                 navigate('/'); // Navigate away or show a user-friendly error
//                 return;
//             }

//             let product = await response.json();
           
//             setFormData({
//                 name: product.name || '',
//                 price: product.price || '',
//                 category: product.category || '',
//                 company: product.company || ''
//             });


//         } catch (error) {
//             console.error('Error fetching product details:', error);
//             navigate('/'); // Navigate away on network/parse error
//         }
//     }, [param.id, BACKEND_URL, navigate]); // Dependencies: param.id, BACKEND_URL, navigate (navigate is stable)

//     // Use useEffect to call getProductDetails, with getProductDetails as a dependency.
//     useEffect(() => {
//         getProductDetails();
//     }, [getProductDetails]); // Dependency: getProductDetails (the memoized function)

// const validate = () => {
//   let temp = {};
//   temp.name = formData.name ? '' : 'Name is required';

//   if (!formData.price) {
//     temp.price = 'Price is required';
//   } else if (isNaN(formData.price)) {
//     temp.price = 'Price must be a number';
//   } else if (Number(formData.price) <= 0) {
//     temp.price = 'Price must be greater than 0';
//   } else {
//     temp.price = '';
//   }

//   temp.category = formData.category ? '' : 'Category is required';
//   temp.company = formData.company ? '' : 'Company is required';

//   setErrors(temp);
//   return Object.values(temp).every((x) => x === '');
// };


// const updateProduct = async () => {
//   if (!validate()) {
//     return; // stop if there are validation errors
//   }

//   const token = JSON.parse(localStorage.getItem('token'));

//   try {
//     const response = await fetch(`${BACKEND_URL}product/${param.id}`, {
//       method: 'PUT',
//       body: JSON.stringify(formData),
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} - ${response.statusText}`);
//     }

//     await response.json();
//     navigate('/'); // success
//   } catch (error) {
//     console.error('Failed to update product:', error);
//   }
// };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         setErrors((prev) => ({ ...prev, [name]: '' }));
//     };

    
// return (
//   <Box>
//     <TextField
//       label="Product Name"
//       name="name"
//       value={formData.name}
//       onChange={handleChange}
//       error={Boolean(errors.name)}
//       helperText={errors.name}
//     />
//     <TextField
//       label="Price"
//       name="price"
//       value={formData.price}
//       onChange={handleChange}
//       error={Boolean(errors.price)}
//       helperText={errors.price}
//     />
//     <TextField
//       label="Category"
//       name="category"
//       value={formData.category}
//       onChange={handleChange}
//       error={Boolean(errors.category)}
//       helperText={errors.category}
//     />
//     <TextField
//       label="Company"
//       name="company"
//       value={formData.company}
//       onChange={handleChange}
//       error={Boolean(errors.company)}
//       helperText={errors.company}
//     />

//     <Button variant="contained" color="primary" onClick={updateProduct} sx={{ mt: 2 }}>
//       Update
//     </Button>
//   </Box>
// );

// };


// src/components/UpdateProduct.js
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Paper
} from '@mui/material';

export const UpdateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    company: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const param = useParams();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

  // ✅ Fetch product details
  const getProductDetails = useCallback(async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const response = await fetch(`${BACKEND_URL}product/${param.id}`, {
        headers: { authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        console.error(`Failed to fetch product: HTTP ${response.status}`);
        navigate('/'); // navigate away if not found
        return;
      }

      const product = await response.json();
      setFormData({
        name: product.name || '',
        price: product.price || '',
        category: product.category || '',
        company: product.company || ''
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
      navigate('/');
    }
  }, [param.id, BACKEND_URL, navigate]);

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  // ✅ Validate fields
  const validate = () => {
    let temp = {};
    temp.name = formData.name ? '' : 'Name is required';

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

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // clear error as user types
  };

  // ✅ Update product
  const updateProduct = async () => {
    if (!validate()) return;

    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const response = await fetch(`${BACKEND_URL}product/${param.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update: HTTP ${response.status}`);
      }

      await response.json();
      navigate('/'); // success
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Update Product
        </Typography>

        <Stack spacing={2}>
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

          <Button variant="contained" color="primary" onClick={updateProduct}>
            Update
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
                     Back
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
