import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from 'react-icons/fa';
import logo from '../../public/logo.png'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-gradient-to-r from-cyan-500 to-blue-500'>
            <div className=' py-20 flex md:flex-row flex-col justify-around items-center'>
           <div className='text-center '>
           <a className="btn btn-ghost text-xl"><div className='flex items-center justify-around text-2xl'><p>PharmaEase</p><img className='w-[50px]' src={logo} alt=""/> </div></a>
           <p className='text-center font-lexend text-white font-bold'>Email: bottle@glass.com</p>
           <p className='text-center font-lexend text-white font-bold'>phone: 01151210101</p>
           <p className='text-center font-lexend text-white font-bold'>112/3, Dexter street, port city, Singapore</p>
           </div>
           <div>
                <p className='text-xl font-lexend font-bold w-[300px] text-center text-white'>Your partner incase of emergency.</p>
                <div className='flex justify-center text-white font-bold mt-3 text-xl gap-4'>
            <FaFacebook />
            <FaInstagram></FaInstagram>
            <FaTwitter></FaTwitter>
            <FaLinkedin></FaLinkedin>
            </div>
           </div>
        </div>
         <p className='text-center text-white mt-3 pb-3 text-[12px] md:text-xl font-bold'>2024@TastyMunchMarketplace. All rights reserved</p>
        </div>
    );
};

export default Footer;