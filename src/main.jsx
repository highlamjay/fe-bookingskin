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
import InformationProduct from './components/InformationProduct.jsx';
import UserInfo from './components/UserInfo.jsx';
import Buy from './components/Buy.jsx';
import './index.css';
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
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
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </BrowserRouter>
  </Provider>
  </QueryClientProvider>
);