import React from 'react';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useCategory = () => {
    const axiosNormal = useAxios()
    const {data: category=[],isLoading,refetch} = useQuery({
     queryKey: ['category'],
     queryFn: async ()=>{
        const res = await axiosNormal.get('/category')
        return res.data;
     }
    })
    return {category,isLoading,refetch}
};

export default useCategory;
