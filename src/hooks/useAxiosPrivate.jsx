import axios from "axios";
import { BASE_URL } from "../constent/constent";

const axiosPrivate = axios.create({
    baseURL: BASE_URL
})

const useAxiosPrivate = () => {
    return axiosPrivate;
};

export default useAxiosPrivate;