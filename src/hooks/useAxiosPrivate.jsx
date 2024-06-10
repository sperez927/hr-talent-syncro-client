import axios from "axios";
import { BASE_URL } from "../constent/constent";

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

const useAxiosPrivate = () => {
    axiosPrivate.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    return axiosPrivate;
};

export default useAxiosPrivate;
