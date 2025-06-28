


// //-------my owrking code---

// // src/components/ProductList.js
// import React, { useEffect, useState } from 'react';

// import {
//   Table, TableBody, TableCell, TableHead, TableRow, Paper,
//   TextField, Button, Typography, Box, IconButton, Stack, MenuItem
// } from '@mui/material';
// import {
  
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { Link } from 'react-router-dom';

// export const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchProduct, setSearchProduct] = useState("");

//   const [sortField, setSortField] = useState("");
//   // const [sortOrder, setSortOrder] = useState("asc");
//   const [open, setOpen] = useState(false);
//   const [selectedProductId,setSelectedProducuctId]  = useState("");
  
//   const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ''; 
//   // my base Url  = http://localhost:5000
//   useEffect(() => {
//     getProduct();
//   }, []);

//   //  useEffect(() => {
    
//   // }, [sortField, sortOrder,products]);


//   const getProduct = async () => {
//     const token = JSON.parse(localStorage.getItem('token'));
//     const result = await fetch(`${BACKEND_URL}/products`, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await result.json();
//     setProducts(data);
//   };

//   const deleteProduct = async (deleteId) => {
//     console.log("deleteId",deleteId);
//     setSelectedProducuctId(deleteId);
//     setOpen(true); 
//     // try {
//     //   const result = await fetch(`http://localhost:5000/product/${deleteId}`, {
//     //     method: 'DELETE',
//     //     headers: {
//     //       authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
//     //     },
//     //   });
//     //   const data = await result.json();
//     //   if (data) {
//     //     getProduct();
//     //   }
//     // } catch (error) {
//     //   console.error('Error deleting product:', error);
//     // }

//   };
//   const confirmDelete = async()=>{
//     console.log("selectedProductId",selectedProductId);
//     try {
//       const result = await fetch(`${BACKEND_URL}/product/${selectedProductId}`, {
//         method: 'DELETE',
//         headers: {
//           authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
//         },
//       });
//       const data = await result.json();
//       if (data) {
//         getProduct();
//       }
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//     setOpen(false);
//   }

  

//   const searchProductByKey = async (key) => {
//     const token = JSON.parse(localStorage.getItem('token'));
//     if (key) {
//       const result = await fetch(`${BACKEND_URL}/search/${key}`, {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });
//       const searchResults = await result.json();
//       setProducts(searchResults);
//     } else {
//       getProduct();
//     }
//   };

//   const handleSort =(value)=>{
//    if(value){
//      setSortField(value);
//      const sortedByCompany = [...products].sort((a, b) =>
//         a[value].localeCompare(b[value], undefined, { sensitivity: 'base' }));
//    setProducts(sortedByCompany);
// }
//   }

//   const handleCancel = ()=>{
// setOpen(false);
//   }

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Product List
//       </Typography>

//       <TextField
//         label="Search Product..."
//         variant="outlined"
//         value={searchProduct}
//         onChange={(e) => {
//           setSearchProduct(e.target.value);
//           searchProductByKey(e.target.value);
//         }}
//         sx={{ mb: 3, width: '300px' }}
//      />

// {/* // */}
//         <TextField
//           select
//           label="Sort By"
//           value={sortField}
//           onChange={(e) => handleSort(e.target.value)}
//           sx={{ width: 150 }}
//         >
//           <MenuItem value="">None</MenuItem>
//           <MenuItem value="name">Name</MenuItem>
//           <MenuItem value="category">Category</MenuItem>
//           <MenuItem value="price">Price</MenuItem>
//         </TextField>
// {/* // */}



//       <Paper elevation={3}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Sr. No.</strong></TableCell>
//               <TableCell><strong>Name</strong></TableCell>
//               <TableCell><strong>Category</strong></TableCell>
//               <TableCell><strong>Price</strong></TableCell>
//               <TableCell><strong>Operation</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {products.length > 0 ? (
//               products.map((item, index) => (
//                 <TableRow key={item._id || index}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{item.name}</TableCell>
//                   <TableCell>{item.category}</TableCell>
//                   <TableCell>{item.price}</TableCell>
//                   <TableCell>
//                     <Stack direction="row" spacing={1}>
//                       <IconButton
//                         color="error"
//                         onClick={() => deleteProduct(item._id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                       <IconButton
//                         color="primary"
//                         component={Link}
//                         to={`/update/${item._id}`}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   No products found.
//                 </TableCell>
//               </TableRow>
//             )}

//             <Dialog open={open} onClose={handleCancel}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this product? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button color="primary" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button  color="error" variant="contained" onClick={confirmDelete }>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// };


//change for the deployment 
// src/components/ProductList.js
import React, { useEffect, useState, useCallback } from 'react'; // Added useCallback

import {
    Table, TableBody, TableCell, TableHead, TableRow, Paper,
    TextField, Button, Typography, Box, IconButton, Stack, MenuItem
} from '@mui/material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState("");
    const [sortField, setSortField] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedProductId, setSelectedProducuctId] = useState("");

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

    // Memoize the getProduct function using useCallback
    // It depends on BACKEND_URL because it's used inside the fetch call.
    const getProduct = useCallback(async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const response = await fetch(`${BACKEND_URL}/products`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            // Ensure the response is OK before parsing JSON
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
                setProducts([]); // Clear products or set an error state
                return;
            }
            const data = await response.json();
            // The `result` variable warning should be gone here because `data` is used.
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]); // Clear products or set an error state on network/parse error
        }
    }, [BACKEND_URL]); // Dependency: BACKEND_URL

    // Use useEffect to call getProduct, with getProduct as a dependency.
    // Because getProduct is memoized by useCallback, this useEffect will only run
    // when BACKEND_URL changes, or once on mount if BACKEND_URL is constant.
    useEffect(() => {
        getProduct();
    }, [getProduct]); // Dependency: getProduct (the memoized function)

    const deleteProduct = async (deleteId) => {
        console.log("deleteId", deleteId);
        setSelectedProducuctId(deleteId);
        setOpen(true);
    };

    // const confirmDelete = async () => {
    //     console.log("selectedProductId", selectedProductId);
    //     try {
    //         const result = await fetch(`${BACKEND_URL}/product/${selectedProductId}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    //             },
    //         });
    //         const data = await result.json();
    //         if (data) {
    //             getProduct(); // Refresh list after deletion
    //         }
    //     } catch (error) {
    //         console.error('Error deleting product:', error);
    //     }
    //     setOpen(false);
    // }


const confirmDelete = async () => {
    console.log("selectedProductId", selectedProductId);
    try {
        const result = await fetch(`${BACKEND_URL}/product/${selectedProductId}`, { // THIS 'result'
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        });
        const data = await result.json(); // This 'result' is used here! So, it might be another 'result'
        if (data) {
            getProduct(); // Refresh list after deletion
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
    setOpen(false);
}

    const searchProductByKey = async (key) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (key) {
            try {
                const response = await fetch(`${BACKEND_URL}/search/${key}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
                    setProducts([]);
                    return;
                }
                const searchResults = await response.json();
                setProducts(searchResults);
            } catch (error) {
                console.error('Error searching products:', error);
                setProducts([]);
            }
        } else {
            getProduct(); // Fetch all products if search key is empty
        }
    };

    const handleSort = (value) => {
        if (value) {
            setSortField(value);
            const sortedProducts = [...products].sort((a, b) => {
                // Ensure value exists in both objects before comparing
                if (a[value] && b[value]) {
                    // Convert to string for localeCompare, especially for numbers
                    return String(a[value]).localeCompare(String(b[value]), undefined, { sensitivity: 'base' });
                }
                return 0;
            });
            setProducts(sortedProducts);
        }
    }

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Product List
            </Typography>

            <TextField
                label="Search Product..."
                variant="outlined"
                value={searchProduct}
                onChange={(e) => {
                    setSearchProduct(e.target.value);
                    searchProductByKey(e.target.value);
                }}
                sx={{ mb: 3, width: '300px' }}
            />

            <TextField
                select
                label="Sort By"
                value={sortField}
                onChange={(e) => handleSort(e.target.value)}
                sx={{ width: 150 }}
            >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="category">Category</MenuItem>
                <MenuItem value="price">Price</MenuItem>
            </TextField>

            <Paper elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Sr. No.</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Category</strong></TableCell>
                            <TableCell><strong>Price</strong></TableCell>
                            <TableCell><strong>Operation</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.length > 0 ? (
                            products.map((item, index) => (
                                <TableRow key={item._id || index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <IconButton
                                                color="error"
                                                onClick={() => deleteProduct(item._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton
                                                color="primary"
                                                component={Link}
                                                to={`/update/${item._id}`}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        )}
                        <Dialog open={open} onClose={handleCancel}>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete this product? This action cannot be undone.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button color="error" variant="contained" onClick={confirmDelete}>
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
};
