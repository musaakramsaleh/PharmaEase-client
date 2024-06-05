import React from 'react';
import UseAuth from '../Hook/UseAuth';
import Banner from './Banner';
import ModalForm from '../Component/ModalForm';


const Home = () => {
    const {user} = UseAuth()
    return (
        <div>
            <p>hello world</p>
            <Banner></Banner>
            <h1>React Modal Form Example</h1>
            <ModalForm></ModalForm>
        </div>
    );
};

export default Home;