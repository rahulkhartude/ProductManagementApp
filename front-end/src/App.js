
import React from 'react';
import './App.css'; // Assuming your main CSS
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your components
import Nav from './components/Nav';
import { Signup } from './components/Signup';
import { PrivtaeComponent } from './components/PrivtaeComponent';
import { Login } from './components/Login';
import { Product } from './components/Product'; // Assuming you have this component

import { ProductList } from './components/ProductList';
import { UpdateProduct } from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav /> {/* Your navigation bar */}
        <Routes>
          {/* Protected Routes */}
          <Route element={<PrivtaeComponent />}>
            <Route path="/" element={<ProductList />} />
            {/* <Route path="/add" element={<AddProduct />} /> Assuming AddProduct exists */}
            <Route path="/add" element={<Product />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} /> {/* Or handle logout directly in Nav */}
            <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>

          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} /> {/* Catch-all for undefined routes */}
        </Routes>
        {/* <Footer /> Render the Footer component here */}
      </BrowserRouter>
    </div>
  );
}

export default App;
