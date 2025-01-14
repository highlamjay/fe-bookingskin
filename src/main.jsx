import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Home from './components/Home.jsx'; 
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import Products from './components/Products.jsx';
import Confirm from './components/Confirm.jsx';
import InformationProduct from './components/InformationProduct.jsx';
import UserInfo from './components/UserInfo.jsx';
import Buy from './components/Buy.jsx';
import Information from './components/Information.jsx';
import InformationId from "./components/InformationId.jsx"
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
        <Route path="/products-id" element={<InformationProduct />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/information" element={<Information />} />
        <Route path="/information-id" element={<InformationId />} />
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);