import axios from "axios";
import { toast } from "react-toastify";
const API_URL=import.meta.env.VITE_API_URL

const API=axios.create({
    baseURL:API_URL
})
// Request interceptor (attach token automatically)
API.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token")
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
},(error)=>Promise.reject(error))

// Response interceptor (handle expired token)
API.interceptors.response.use((response)=>response,
(error)=>{
    if(error.response && error.response.status===401){
        
        toast.error("Session expired. Please log in again.");
        localStorage.clear("token")
        setTimeout(()=>{
            window.location.href="/"

        },1500)
    }
    return Promise.reject(error);
})
export default API