import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});


/**
 * 1. REQUEST INTERCEPTOR
 * This ensures EVERY call (including the one on refresh) 
 * has the Authorization header your backend is looking for.
 */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


/**
 * 2. RESPONSE INTERCEPTOR
 * Handles 401 errors by attempting to refresh the token.
 */
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh if it's a 401 and we haven't tried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // We use standard axios here to avoid the interceptor loop
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/refresh-token",
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);

        // Update the failed request with the new token and retry
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return API(originalRequest);
        
      } catch (refreshError) {
        // If refresh fails, the session is truly dead.
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken")
        // We only redirect to login here as a last resort
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const loginUser = (data) => API.post("/users/login", data);
export const registerUser = (formData) => API.post("/users/register", formData);
export const getCurrentUser = () => API.get("/users/me");
export const logoutUser = () => API.post("/users/logout");


export default API;