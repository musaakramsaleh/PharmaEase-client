import React from 'react';
import UseAuth from './UseAuth';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseAdmin = () => {
    const {user,loading} = UseAuth()
    const axiosSecure = UseAxiosSecure()
    const {data:isAdmin,isPending:isAdminLoading} = useQuery({
        queryKey:[user?.email,'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            console.log("admin",user)
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            return res.data?.admin
        }
    })
    return [isAdmin,isAdminLoading]
};

export default UseAdmin;