
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

// //-----working Code-------
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Stack,
//   Alert,
//   Paper,
// } from '@mui/material';

// export const UpdateProduct = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [company, setCompany] = useState('');
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();
//   const param = useParams();
//   const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ''; 
//   useEffect(() => {
//     getProductDetails();
//   }, []);

//   const getProductDetails = async () => {
//     const token = JSON.parse(localStorage.getItem('token'));
//     let product = await fetch(`${BACKEND_URL}/product/${param.id}`, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     product = await product.json();
//     setName(product.name);
//     setPrice(product.price);
//     setCategory(product.category);
//     setCompany(product.company);
//   };

//   const updateProduct = async () => {
//     const token = JSON.parse(localStorage.getItem('token'));

//     if (!name || !price || !category || !company) {
//       setError(true);
//       return;
//     }

//     try {
//       const response = await fetch(`${BACKEND_URL}/product/${param.id}`, {
//         method: 'PUT',
//         body: JSON.stringify({ name, price, category, company }),
//         headers: {
//           'Content-Type': 'application/json',
//           authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} - ${response.statusText}`);
//       }

//       await response.json();
//       navigate('/');
//     } catch (error) {
//       console.error('Failed to update product:', error);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
//       <Paper elevation={3} sx={{ p: 4 }}>
//         <Typography variant="h5" gutterBottom>
//           Update Product
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             Please fill in all fields.
//           </Alert>
//         )}

//         <Stack spacing={2}>
//           <TextField
//             label="Product Name"
//             variant="outlined"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Price"
//             variant="outlined"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Category"
//             variant="outlined"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Company"
//             variant="outlined"
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//             fullWidth
//           />

//           <Stack direction="row" spacing={2} mt={2}>
//             <Button variant="contained" color="primary" onClick={updateProduct}>
//               Update
//             </Button>
//             <Button variant="outlined" onClick={() => navigate(-1)}>
//               Back
//             </Button>
//           </Stack>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };


//deployment code
// src/components/UpdateProduct.js
import React, { useEffect, useState, useCallback } from 'react'; // Added useCallback
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
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

    // Memoize the getProductDetails function using useCallback
    // It depends on param.id (from useParams) and BACKEND_URL.
    const getProductDetails = useCallback(async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        let url = `${BACKEND_URL}/product/${param.id}`; // Construct URL with id

        try {
            let response = await fetch(url, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                // Handle HTTP errors, e.g., product not found (404)
                const errorText = await response.text();
                console.error(`Failed to fetch product details: HTTP Status ${response.status}, Details: ${errorText}`);
                navigate('/'); // Navigate away or show a user-friendly error
                return;
            }

            let product = await response.json();
            setName(product.name);
            setPrice(product.price);
            setCategory(product.category);
            setCompany(product.company);
        } catch (error) {
            console.error('Error fetching product details:', error);
            navigate('/'); // Navigate away on network/parse error
        }
    }, [param.id, BACKEND_URL, navigate]); // Dependencies: param.id, BACKEND_URL, navigate (navigate is stable)

    // Use useEffect to call getProductDetails, with getProductDetails as a dependency.
    useEffect(() => {
        getProductDetails();
    }, [getProductDetails]); // Dependency: getProductDetails (the memoized function)

    const updateProduct = async () => {
        const token = JSON.parse(localStorage.getItem('token'));

        if (!name || !price || !category || !company) {
            setError(true);
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/product/${param.id}`, {
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

            await response.json(); // Consume the response
            navigate('/'); // Navigate to home after successful update
        } catch (error) {
            console.error('Failed to update product:', error);
            // Optionally set an error state to display a message to the user
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
