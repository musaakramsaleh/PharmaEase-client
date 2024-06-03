import React from 'react';
import UseAuth from '../Hook/UseAuth';


const Home = () => {
    const {user} = UseAuth()
    return (
        <div>
            <p>hello world</p>
        </div>
    );
};

export default Home;