// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// export const Signup = () => {
//     const [name ,setName] =useState("");
//     const [email ,setEmail] =useState("");
//     const [password,setPassword] = useState("")
//     const navigate = useNavigate();

//     const collectData = async()=>{
//     console.log(name,email,password);
//     let result = await fetch('http://localhost:5000/register',
//         {
//             method:'post',
//             body :JSON.stringify({name,email,password}),
//             headers :{
//                 'Content-Type' : 'application/json'
//             },
//         }
//     );
//     console.log("result",result);

//     result = await result.json();
//     if(result.auth){


//     console.log("sign up data: ",result);
//     localStorage.setItem("user",JSON.stringify(result.result));
//     localStorage.setItem("token",JSON.stringify(result.auth));
//     if(result){
//         navigate('/')
//     }
//    }
//    else {
//     alert("Please insert all details");
//    }
// }
//   return (
//     <div className='register'>
//         <h3>Register</h3>
//         <input className='inputBox' type='text' placeholder='enter name' value={name} onChange ={(e)=>setName(e.target.value)}/>
//         <input className='inputBox' type='email' placeholder='enter email' value={email} onChange ={(e)=>setEmail(e.target.value)}/>
//         <input className='inputBox' type='password' placeholder='enter password' value={password} onChange ={(e)=>setPassword(e.target.value)} />
//         <button className='appButton' type='button' onClick={collectData}>Signup</button>
//     </div>
//   )
// }



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper
} from '@mui/material';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  // const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ''; 
  
const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value ? '' : 'Full Name is required';
      case 'email':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'Email is not valid';
      case 'password':
        return value.length >= 6 ? '' : 'Password must be at least 6 characters';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const validate = () => {
    let temp = {};
    temp.name = validateField('name', formData.name);
    temp.email = validateField('email', formData.email);
    temp.password = validateField('password', formData.password);

    setErrors(temp);
    return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = async(e) => {
    console.log("data sign up called")
    e.preventDefault();
    const { name, email, password } = formData;
    if (validate()) {
      //start
      console.log("validate called")
      // let result = await fetch(`${BACKEND_URL}register`,
       
        // let result = await fetch(`https://productmanagementapp-xqhc.onrender.com/register`,
        // {
        //     method:'post',
        //     body :JSON.stringify({name,email,password}),
        //     headers :{
        //         'Content-Type' : 'application/json'
        //     },
        // }
            // headers :{
       // fetch
fetch('https://productmanagementapp-xqhc.onrender.com/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({name,email,password}),
  credentials: 'include'
});

    

    if(result.auth){
    localStorage.setItem("user",JSON.stringify(result.result));
    localStorage.setItem("token",JSON.stringify(result.auth));
    if(result){
        navigate('/')
    }
      //end

    }
  };
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom align="center">
          Signup
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
