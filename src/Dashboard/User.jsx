import React from 'react';
import useAxios from '../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';

const User = () => {
    const axiosNormal = useAxios()
    const {data:users=[],refetch} = useQuery({
        queryKey:['users'],
        queryFn: async () => {
            const res = await axiosNormal.get('/users',{
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            console.log(res.data)
            return res.data
        }
    })
    return (
        <div>
            <p>Hello</p>
            <p>Number of Users: {users.length}</p> {/* Display the number of users */}
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li> // Adjust according to user object structure
                ))}
            </ul>
        </div>
    );
};

export default User;