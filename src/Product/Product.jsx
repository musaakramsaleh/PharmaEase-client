import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../Hook/useAxios';
import { FaTruckLoading } from 'react-icons/fa';
import useCategory from '../Hook/useCategory';



const Product = () => {
     const [medicine,setMedicine] = useState([])
     const [loading,setLoading] = useState(false)
     const axiosNormal = useAxios()
     const { category, isLoading: categoryLoading } = useCategory();
     const {data: medicines = [],isLoading} = useQuery({
        queryKey:['products'],
        queryFn:async ()=>{
            const {data} = await axiosNormal.get('/products')
            return data
        },
     })
     console.log(medicines)
     console.log(category)
     if(isLoading) return <span className="loading loading-spinner mx-auto  loading-lg text-center"></span>
    return (
        <div>
            {
               category && category.map(cata=><p key={cata._id}>{cata.category}</p>)
            }
            {
            medicines.map(medicine  =><p key={medicine._id}>Hagu</p>)
            }
        </div>
    );
};

export default Product;