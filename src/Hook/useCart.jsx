import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxios from './useAxios';





const useCart = () => {
    const axiosnormal = useAxios()
    const {user} = UseAuth()
    const {data: cart=[],refetch} = useQuery({
     queryKey: ['cart'],
     queryFn: async ()=>{
        const res = await axiosnormal.get(`/cart?email=${user.email}`)
        return res.data;
     }
    })
    return [cart,refetch]
};

export default useCart;