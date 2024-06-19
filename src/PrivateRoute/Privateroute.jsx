import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../Hook/UseAuth';


const Privateroute = ({children}) => {
    const {user,loading} = UseAuth()
    const location = useLocation();
    if(loading){
         return <div className='max-w-1440 mx-auto flex justify-center items-center mt-4'>
         <span className="loading loading-spinner loading-lg text-center"></span>
     </div> 
    }
    if(!user){
        
        return <Navigate state={location.pathname} to='/login'></Navigate>

    }
    if(user){
        return children
    }
};

export default Privateroute;