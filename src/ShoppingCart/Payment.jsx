import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Checkoutform from './Checkoutform';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_METHOD)
const Payment = () => {
    return (
        <div>
            <Helmet><title>PharmaEase-Payment</title></Helmet>
            <Elements stripe= {stripePromise}>
              <Checkoutform></Checkoutform>
            </Elements>
        </div>
    );
};

export default Payment;