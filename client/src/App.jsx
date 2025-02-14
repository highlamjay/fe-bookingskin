import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchDetailUser } from "./services/auth-service.js";
import { updateUser } from "./redux/slides/user-Slide.js";
import { isJsonString } from "./utils/isJson.js";
import { jwtDecode } from "jwt-decode"; // Lưu ý kiểm tra thư viện này đã được cài hay chưa
import * as UserService from "./services/auth-service.js";

// Import các trang
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import Products from "./components/Products.jsx";
import Confirm from "./components/Confirm.jsx";
import ConfirmEmail from "./components/ConfirmEmail.jsx";
import UserInfo from "./components/UserInfo.jsx";
import AdminLayout from "./components/admin/MainAdmin.jsx";
import Customers from "./components/admin/Customers.jsx";
import ProductAdmin from "./components/admin/Products.jsx";
import Community from "./components/Community.jsx";
import Information from "./components/Information.jsx";
import InformationID from "./components/InformationId.jsx";
import InformationProduct from "./components/InformationProduct.jsx";
import Buy from "./components/Buy.jsx";
import Post from "./components/admin/Posts.jsx";

// Private Route Component
const PrivateRoute = ({ children }) => {
  const storageData = localStorage.getItem("access_token");
  const user = storageData && isJsonString(storageData) ? jwtDecode(storageData) : null;
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();

  const handleGetDetailUser = async (id, token) => {
    const res = await fetchDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, []);

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product-id/:id" element={<InformationProduct />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/community" element={<Community />} />
      <Route path="/information" element={<Information />} />
      <Route path="/information/:id" element={<InformationID />} />

      
      {/* Admin Routes */}
      <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
        <Route index element={<div>Welcome to Admin Dashboard</div>} />
        <Route path="customers" element={<Customers />} />
        <Route path="productadmin" element={<ProductAdmin />} />
        <Route path="post" element={<Post />} />
      </Route>

    </Routes>
  );
};

export default App;
