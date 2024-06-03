import React, { useContext } from 'react';
import { AuthContext } from '../Component/Firebase-provider/Firebase_Provider';


const UseAuth = () => {
    const all = useContext(AuthContext)
    return all
};

export default UseAuth;