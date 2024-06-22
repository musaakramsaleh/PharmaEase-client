import React, { useState } from 'react';
import UseAuth from '../Hook/UseAuth';
import Banner from './Banner';
import Swal from 'sweetalert2';
import Modal from '../Component/Modal/Modal';
import { Helmet } from 'react-helmet-async';
import Headline from '../shared/Headline';
import Category from './Category';
import FAQ from './FAQ';



const Home = () => {
    return (
        <div>
          <Helmet><title>PharmaEase-Home</title></Helmet>
            <Banner></Banner>
            <div>
              <Headline title="Category" description="Buy from wide range of variety of products"></Headline>
              <Category></Category>
              <FAQ></FAQ>
            </div>
        </div>
    );
};

export default Home;