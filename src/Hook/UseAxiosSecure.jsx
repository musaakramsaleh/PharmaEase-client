import axios from 'axios';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
const UseAxiosSecure = () => {
    const {logout} = UseAuth()
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config;
    },function (error) {
        return Promise.reject(error)
    })
    axiosSecure.interceptors.response.use(function(response){
        return response
    }, async (error)=>{
        const status = error.response.status
        console.log('error in the interceptor',status)
        if(status === 401 || status === 403){
            await logout();
            navigate('/login');
        }
        return Promise.reject(error)
    })
     return axiosSecure
};

export default UseAxiosSecure;