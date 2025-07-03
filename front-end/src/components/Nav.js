// import React from 'react'
// import { Link,useNavigate } from 'react-router-dom'


//  const Nav = () => {
//   const isAuth =localStorage.getItem("user");
//   const navigate = useNavigate();

//   const logout= ()=>{
//     localStorage.clear();
//     navigate('/logout')
//   }
//   return (
//     <div className='nav-ul'>
//       {
//        isAuth?
//       <ul className='nav-ul'>
//           <img className='logoRK' alt="Logo" src='https://cdn.mobcoder.com/assets/blog_images/mern-stack/Mern-1_11zon.webp'></img>
    
//             <li> <Link to="/">Products</Link></li>
//             <li> <Link to="/add">Add Products</Link></li>
//             <li> <Link to="/profile">Profile </Link></li>
//             <li> <Link to="/signup" onClick={logout} > Logout ({JSON.parse(isAuth).name}) </Link> </li>
          
//         </ul>
//         :
//        <ul className='rightAlign'> 
//         <li > <Link to="/signup">Signup</Link></li>
//             <li> <Link to="/login">Login</Link>  </li>
//         </ul>}
//     </div>
//   )
// }
// export default Nav


// src/components/Nav.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("user");
  const userName = isAuth ? JSON.parse(isAuth).name : '';

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Drawer state
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navLinks = isAuth
    ? [
        { label: 'Products', path: '/' },
        // { label: 'Add Products', path: '/add' },
        { label: 'Profile', path: '/profile' },
        { label: `Logout (${userName})`, action: logout },
      ]
    : [
        { label: 'Signup', path: '/signup' },
        { label: 'Login', path: '/login' },
      ];

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>

        {isAuth &&  
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt="Logo"
              src="https://cdn.mobcoder.com/assets/blog_images/mern-stack/Mern-1_11zon.webp"
              sx={{ width: 40, height: 40 }}
            />
            <Typography variant="h6" noWrap>
              MERN SHOP
            </Typography>
          </Stack>
          }

          {!isAuth && <Typography variant="h6" noWrap>PRODUCT MANAGEMENT</Typography>}

          {!isMobile ? (
            <Box>
              {navLinks.map((link, i) =>
                link.action ? (
                  <Button key={i} color="inherit" onClick={link.action}>
                    {link.label}
                  </Button>
                ) : (
                  <Button key={i} color="inherit" component={Link} to={link.path}>
                    {link.label}
                  </Button>
                )
              )}
            </Box>
          ) : (
            <IconButton color="inherit" onClick={() => setOpenDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpenDrawer(false)}>
          <List>
            {navLinks.map((link, i) => (
              <ListItem
                button
                key={i}
                onClick={link.action ? link.action : undefined}
                component={link.path ? Link : 'li'}
                to={link.path || undefined}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
};

export default Nav;
