import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Home from './components/Home.jsx'; // Giả sử bạn có một file App.js để định nghĩa các route
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);