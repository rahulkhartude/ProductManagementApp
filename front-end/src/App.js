// import Nav from './components/Nav';
// import './App.css';
// import { BrowserRouter, Routes ,Route} from 'react-router-dom';
// import { Footer } from './components/Footer';
// import { Signup } from './components/Signup';
// import { PrivtaeComponent } from './components/PrivtaeComponent';
// import { Login } from './components/Login';
// import { Product } from './components/Product';
// import { ProductList } from './components/ProductList';
// import { UpdateProduct } from './components/UpdateProduct';


// function App() {
//   return (
//     <div className="App">
//           <BrowserRouter>
//            <Nav></Nav>
//            <Routes>

//             <Route element={<PrivtaeComponent />} >
//             <Route path="/" element={<ProductList />} />
//             <Route path="/add" element={<Product />} />
//             <Route path="/update/:id" element={<UpdateProduct/>} />
//             <Route path="/profile" element={<h1>Profile</h1>} />
//             </Route>
            
//             <Route path="/logout" element={<h1>Logout</h1>} /> 
//             <Route path='/signup' element={<Signup/>}></Route>
//            <Route path='/login' element={<Login></Login>}></Route>
//            </Routes>
//           </BrowserRouter>
//           {/* <Footer/> */}
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';

import Nav from './components/Nav';
import { Footer } from './components/Footer';
import { Signup } from './components/Signup';
import { PrivtaeComponent } from './components/PrivtaeComponent';
import { Login } from './components/Login';
import { Product } from './components/Product';
import { ProductList } from './components/ProductList';
import { UpdateProduct } from './components/UpdateProduct';

import './App.css';

// Custom MUI theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f0f2f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Nav />
        <Container maxWidth="lg" sx={{ py: 3 }} >
          <Routes>
            <Route element={<PrivtaeComponent />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/add" element={<Product />} />
              <Route path="/update/:id" element={<UpdateProduct />} />
              <Route path="/profile" element={<h1>Profile</h1>} />
            </Route>
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
        {/* <Footer /> */}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
