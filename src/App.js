import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './Components/login/Login';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart'
import Product from './Components/Product/Product';
import ProductPage from './Components/Product/Product';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
  };
  localStorage.setItem("Credentials", { "username": "kminchelle", "password": "0lelplR" })


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />


      </Routes>
    </>

  );
};

export default App;

