import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate()
  useEffect(() => {
    //1. intercept request(clint -----> server)
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    //2.intercept Response (client -----> server)
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response && (error.response.status === 401) ||
          (error.response.status === 403)
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [ logOut, navigate]);
  return [axiosSecure];
};

export default useAxiosSecure;
