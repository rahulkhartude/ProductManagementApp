
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
import {useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';

export const ProductList = () => {
    console.log("Product list called");
    const [products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState("");
    const [sortField, setSortField] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedProductId, setSelectedProducuctId] = useState("");

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

  const totalRecords = products.length;
  const recordsPerPage = 5;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Calculate start and end record numbers
  const startRecord = (page - 1) * recordsPerPage + 1;
  const endRecord = Math.min(page * recordsPerPage, totalRecords);

  // Get only the products for the current page
  const paginatedProducts = products.slice(startRecord - 1, endRecord);
  let indexRecord = recordsPerPage * (page -1) +1
  
  const navigate = useNavigate();

  // Memoize the getProduct function using useCallback
    const getProduct = useCallback(async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const response = await fetch(`${BACKEND_URL}products`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
                setProducts([]); 
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

    useEffect(() => {
        getProduct();
    }, [getProduct]); 

    const deleteProduct = async (deleteId) => {
        setSelectedProducuctId(deleteId);
        setOpen(true);
    };

   
const confirmDelete = async () => {
    try {
        const result = await fetch(`${BACKEND_URL}product/${selectedProductId}`, { // THIS 'result'
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
                const response = await fetch(`${BACKEND_URL}search/${key}`, {
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
    setSortField(value);
  if (value) {
    console.log("sort", value);
    const sortedProducts = [...products].sort((a, b) => {
      if (typeof a[value] === 'number' && typeof b[value] === 'number') {
        return a[value] - b[value];
      } else if (a[value] && b[value]) {
        return String(a[value]).localeCompare(String(b[value]), undefined, { sensitivity: 'base' });
      }
      return 0;
    });
    setProducts(sortedProducts);
  }
   else {

    getProduct();
  }
};

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Product List
            </Typography>
            {/* <Stack spacing={2} direction="row" sx={{mb:2}}>
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
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="category">Category</MenuItem>
                <MenuItem value="price">Price</MenuItem>
            </TextField>
      
            <Button variant="contained">Add Product</Button>
            </Stack> */}

            <Stack
  spacing={2}
  direction="row"
  justifyContent="space-between"
  alignItems="center"
  sx={{ mb: 2 }}
>
  <Box sx={{ display: 'flex', gap: 2 }}>
    <TextField
      label="Search Product..."
      variant="outlined"
      value={searchProduct}
      onChange={(e) => {
        setSearchProduct(e.target.value);
        searchProductByKey(e.target.value);
      }}
      sx={{ width: '300px' }}
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
  </Box>

  <Button variant="contained" onClick={()=>navigate('/add')}>Add Product</Button>
</Stack>


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
                        {paginatedProducts.length > 0 ?
                         (
                            paginatedProducts.map((item, index) => (
                                <TableRow key={item._id || index}>
                                    <TableCell>{index +indexRecord}</TableCell>
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
                <Stack spacing={1}>
              {/* <Pagination count={10} size="large" /> */}
               <Pagination count={totalPages} page={page} onChange={handleChange} size="large" />
             </Stack>
            </Paper>
        </Box>
    );
};
