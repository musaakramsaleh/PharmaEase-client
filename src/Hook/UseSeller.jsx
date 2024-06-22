import React from 'react';
import UseAuth from './UseAuth';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseSeller = () => {
    const {user,loading} = UseAuth()
    const axiosSecure = UseAxiosSecure()
    const {data:isSeller,isPending:isAdminLoading} = useQuery({
        queryKey:[user?.email,'isSeller'],
        enabled: !loading,
        queryFn: async () => {
            console.log("admin",user)
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            return res.data?.admin
        }
    })
    return [isSeller,isAdminLoading]
};

export default UseSeller;