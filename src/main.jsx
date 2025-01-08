import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Home from './components/Home.jsx'; // Giả sử bạn có một file App.js để định nghĩa các route
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import Products from './components/Products.jsx';
import Confirm from './components/Confirm.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/products" element={<Products />} />
        <Route path="/confirm" element={<Confirm />} />
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);