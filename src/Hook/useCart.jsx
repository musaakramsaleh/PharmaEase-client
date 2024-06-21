import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxios from './useAxios';
import UseAxiosSecure from './UseAxiosSecure';





const useCart = () => {
    const axiosSecure = useAxios()
    const {user} = UseAuth()
    const {data: cart=[],refetch} = useQuery({
     queryKey: ['cart'],
     queryFn: async ()=>{
        const res = await axiosSecure.get(`/cart?email=${user.email}`)
        return res.data;
     }
    })
    return [cart,refetch]
};

export default useCart;