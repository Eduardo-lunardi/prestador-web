import axios from "axios";
import { getToken, getRefreshToken, logout, login } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    console.log(error.response)
    if (error.response && error.response.data.erro.indexOf('jwt expired') > -1) {
      api.post('refresh', { refresh: getRefreshToken() }).then(res => {
        login({ token: res.data.token });
      }, err => {
        logout();
        window.location.href = "/login"
      })
    } else {
      logout();
      window.location.href = "/login"
    }
  }
  return Promise.reject(error);
})

export default api;