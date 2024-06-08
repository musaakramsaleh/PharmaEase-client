import React, { useState } from 'react';
import UseAuth from '../Hook/UseAuth';
import Banner from './Banner';
import Swal from 'sweetalert2';
import Modal from '../Component/Modal/Modal';


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
            <p>hello world</p>
            <Banner></Banner>
            <h1>React Modal Form Example</h1>
            <button onClick={handleclick}>click me</button>
            <button onClick={()=>setIsEditModalOpen(true)}></button>
            <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
        </div>
    );
};

export default Home;