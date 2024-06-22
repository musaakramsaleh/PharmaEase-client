import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../Hook/UseAxiosSecure';
import Headline from '../shared/Headline';
import { Button } from '@headlessui/react';
import Swal from 'sweetalert2';

const User = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            console.log(res.data);
            return res.data;
        }
    });
    const makeAdmin = async(id)=>{
        try {
            const response = await axiosSecure.patch(`/users/${id}`, {
                role: "admin"
            });
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Role Updated',
                text: 'Role status has been updated successfully!',
            }); 
            refetch();
        } catch (error) {
            console.error('Error updating status:', error);
        }
        console.log(id)
    }
    const makeuser = async(id)=>{
        try {
            const response = await axiosSecure.patch(`/users/${id}`, {
                role: "user"
            });
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Role Updated',
                text: 'Role status has been updated successfully!',
            }); 
            refetch();
        } catch (error) {
            console.error('Error updating status:', error);
        }
        console.log(id)
    }
    const makeseller = async(id)=>{
        try {
            const response = await axiosSecure.patch(`/users/${id}`, {
                role: "seller"
            });
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Role Updated',
                text: 'Role status has been updated successfully!',
            }); 
            refetch();
        } catch (error) {
            console.error('Error updating status:', error);
        }
        console.log(id)
    }
    return (
        <div className="container mx-auto p-6">
            <Headline title="Users list" description={`Total number of users is ${users.length}`}></Headline>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-gray-600 uppercase ">Name</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-gray-600 uppercase ">Role</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-gray-600 uppercase ">Email</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-gray-600 uppercase ">Update Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b border-gray-300">{user.name}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{user.role}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{user.role==='admin'?'Cannot change':user.role==='seller'?<div><button onClick={()=>makeAdmin(user.email)} className='btn bg-gradient-to-b from-cyan-500 to-blue-500 text-white'>Make Admin</button><button onClick={()=>makeuser(user.email)} className='btn bg-gradient-to-b from-cyan-500 to-blue-500 text-white'>Make User</button ></div>:<button onClick={()=>makeseller(user.email)} className='btn bg-gradient-to-b from-cyan-500 to-blue-500 text-white'>Make Seller</button>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;
