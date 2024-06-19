import React, { useState } from 'react';
import UseAuth from '../Hook/UseAuth';
import Banner from './Banner';
import Swal from 'sweetalert2';
import Modal from '../Component/Modal/Modal';
import { Helmet } from 'react-helmet-async';



const Home = () => {
    const {user} = UseAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
    const handleclick= async e =>{
        Swal.fire({
            title: user.displayName,
            html: `
            <h2 classname='text-2xl'>${user.displayName}</h2>
            <img src = ${user.photoURL}/>
            `,
            imageUrl:user.photoURL ,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
          
    }
    
    return (
        <div>
          <Helmet><title>PharmaEase-Home</title></Helmet>
            <Banner></Banner>
        </div>
    );
};

export default Home;