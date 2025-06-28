// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';


// export const Login = () => {
//     const [email,setEmail] = useState("");
//     const [password,setPassword] =useState("");
//     let navigate = useNavigate();
    
//     useEffect(()=>{
//         let isAuth = localStorage.getItem("user")
//         if(isAuth){
//             navigate("/")
//          }
//     },
//     [])

//     const handleLogin= async()=>{

//         let result = await fetch("http://localhost:5000/login", {
//             method: "POST",
//             body : JSON.stringify({email,password}),
//             headers:{ "Content-Type": "application/json" }
//         })
//         result = await result.json();

//         if(result.auth){
//             localStorage.setItem("user",JSON.stringify(result.user));
//             localStorage.setItem("token",JSON.stringify(result.auth));
//             navigate('/')
//         }
//         else 
//         {
//             alert("Please enter correct credential");
//         }

//     }
//   return (
//     <>
//     <div className='register'>
//         <h1>Log In</h1>
//         <input type='text' placeholder='Enter Name' className='inputBox' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
//         <input type='password' placeholder='Enter Password' className='inputBox' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
//         <button className='appButton' type='button' onClick={handleLogin}>Login</button>
//     </div>
//     </>
//   )
// }


import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError , setLoginError] = useState("");

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ''; 

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on typing
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let temp = {};
    // Email validations
  if (!formData.email) {
    temp.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    temp.email = 'Email is not valid';
  } else {
    temp.email = '';
  }

  // Password validations
  if (!formData.password) {
    temp.password = 'Password is required';
  } else if (formData.password.length < 6) {
    temp.password = 'Password must be at least 6 characters';
  } else {
    temp.password = '';
  }
    setErrors(temp);
    return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (validate()) {
      try {
        
        let resp = await fetch(`${BACKEND_URL}/login`, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

         let result = await resp.json();
        

        if (resp.ok && result.auth) {
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('token', JSON.stringify(result.auth));
          navigate('/');
        } else {
        //   alert('Invalid credentials');
        setLoginError("Invalid Email or Password");
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Server error');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >

        {loginError && (
    <Alert severity="error" sx={{ mb: 2 }}>
      {loginError}
    </Alert>
  )}

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  
    
  );
};
