import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDetailUser } from "./services/auth-service.js";
import { updateUser } from "./redux/slides/user-Slide.js";
import { isJsonString } from "./utils/isJson.js";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/auth-service.js";

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

  return null;
};

export default App;
