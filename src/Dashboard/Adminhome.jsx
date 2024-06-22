import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../Hook/UseAxiosSecure';
import { FaDollarSign, FaPills, FaProductHunt, FaUser } from 'react-icons/fa';
import useAxios from '../Hook/useAxios';
import { Helmet } from 'react-helmet-async';

const Adminhome = () => {
    const axios = useAxios()
    const { data: payment = [], isLoading, refetch } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const response = await axios.get(`/payment`);
            return response.data;
        },
        
    });
    const filter = payment.filter(payments=>payments.status === 'paid')
    const filter2 = payment.filter(payments=>payments.status === 'Pending')
    const totalPaid = filter.reduce((acc, curr) => acc + curr.price, 0);
    const totalPending = filter2.reduce((acc, curr) => acc + curr.price, 0);
    console.log(totalPaid,filter2)
    return (
        <div>
            <Helmet><title>PharmaEase-Adminhome</title></Helmet>
            <div className="stats shadow">
  
  <div className="stat">
    <div className="stat-figure text-2xl">
        <FaDollarSign></FaDollarSign>
    </div>
    <div className="stat-title">Paid Totals</div>
    <div className="stat-value">{totalPaid}</div>
  </div>
  <div className="stat">
    <div className="stat-figure text-2xl">
        <FaDollarSign></FaDollarSign>
    </div>
    <div className="stat-title">Pending Totals</div>
    <div className="stat-value">{totalPending}</div>
  </div>
  
</div>
        </div>
    );
};

export default Adminhome;