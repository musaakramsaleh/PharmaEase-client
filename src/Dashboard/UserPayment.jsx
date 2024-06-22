import React from 'react';
import useAxios from '../Hook/useAxios';
import UseAuth from '../Hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import Headline from '../shared/Headline';

const UserPayment = () => {
    const axios = useAxios()
    const {user} = UseAuth()
    const { data: payment = [], isLoading, refetch } = useQuery({
        queryKey: ['payment',user?.email],
        queryFn: async () => {
            const response = await axios.get(`/payment/${user?.email}`);
            return response.data;
        },
        
    });
    console.log(payment)
    return (
        <div className="container mx-auto p-4 overflow-x-auto">
            <Headline title='Payment Management' description="See your transaction history"></Headline>
            
            {payment?.length === 0 ? (
                <p>No medicines found.</p>
            ) : (
                <table className="table-auto w-full mt-3">
                    <thead>
                        <tr>
                            <th className='border border-b-2'>Medicine Name</th>
                            <th className='border border-b-2'>Seller Email</th>
                            <th className='border border-b-2'>Buyer Email</th>
                            <th className='border border-b-2'>Total Price</th>
                            <th className='border border-b-2'>Transaction</th>
                            <th className='border border-b-2'>order time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payment && payment?.map(medicine => (
                            <tr className='text-center font-bold' key={medicine._id}>
                                <td className='border border-b-2'>{medicine.items.map(item=><p>{item.name}</p>)}</td>
                                <td className='border border-b-2'>{medicine.itemOwner.map(item=><p>{item.email}</p>)}</td>
                                <td className='border border-b-2'>{medicine.email}</td>
                                <td className='border border-b-2'>{medicine.price}</td>
                                <td className='border border-b-2'>{medicine.transaction}</td>
                                <td className='border border-b-2'>{new Date(medicine.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserPayment;