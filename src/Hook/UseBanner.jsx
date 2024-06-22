import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from './useAxios';

const UseBanner = () => {
    const axiosNormal = useAxios()
    const {data: banner=[],isLoading,refetch} = useQuery({
     queryKey: ['banner'],
     queryFn: async ()=>{
        const res = await axiosNormal.get('/banner')
        return res.data;
     }
    })
    return [banner,refetch]

};

export default UseBanner;