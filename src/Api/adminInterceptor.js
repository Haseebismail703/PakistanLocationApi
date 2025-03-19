import axios from 'axios';
import api from './api.js'
const adminInterceptor = axios.create({
  baseURL: `${api}`,
  withCredentials: true, // Automatically cookies send hongi
});

// Token refresh ke liye variable
let isRefreshing = false;
let refreshSubscribers = [];

// Token ko update karne ke liye helper function
const onRrefreshed = (token) => {
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// 🟢 Request Interceptor
adminInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🟢 Response Interceptor
adminInterceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🛑 401 Unauthorized Handling
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Refresh token agar already call ho rahi ho
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(adminInterceptor(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${api}/admins/refresh-tokens`,
          {},
          { withCredentials: true }
        );

        // ✅ Local Storage me sahi tarike se tokens ko save karna
        localStorage.setItem('accessToken', data.data?.accessToken);
        localStorage.setItem('refreshToken', data.data?.refreshToken);

        // ✅ Original request ko dobara bhejna with new token
        adminInterceptor.defaults.headers.common.Authorization = `Bearer ${data.data?.accessToken}`;
        onRrefreshed(data.data?.accessToken);
        
        return adminInterceptor(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        // ✅ Invalid token case me logout ya redirect
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('admin');
        window.location.href = '/';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default adminInterceptor;
