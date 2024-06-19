import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Checkoutform from './Checkoutform';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_METHOD)
const Payment = () => {
    return (
        <div>
            <Elements stripe= {stripePromise}>
              <Checkoutform></Checkoutform>
            </Elements>
        </div>
    );
};

export default Payment;