import React, { useEffect, useState } from 'react'; 
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useCart from '../Hook/useCart';
import useAxios from '../Hook/useAxios';
import UseAuth from '../Hook/UseAuth';
import { useNavigate } from 'react-router-dom';
import UseAxiosSecure from '../Hook/UseAxiosSecure';

const Checkoutform = () => {
    const stripe = useStripe();
    const [newCart, setNewCart] = useState([]);
    const [error, setError] = useState('');
    const { user } = UseAuth();
    const [transaction, setTransaction] = useState('');
    const axiosNormal = useAxios();
    const axiosSecure = UseAxiosSecure();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [cart, refetch] = useCart();
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const navigate = useNavigate();

    useEffect(() => {
        if (total > 0) {
            axiosNormal.post('/create-payment-intent', { price: total })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosNormal, total]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log("There is an error", error);
            setError(error.message);
        } else {
            console.log("PaymentMethod is", paymentMethod);
            setError('');
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });
        if (confirmError) {
            console.log('Confirm Error', confirmError);
        } else {
            console.log('Payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setNewCart(cart);
                console.log('Transaction ID', paymentIntent.id);
                setTransaction(paymentIntent.id);
                const payment = {
                    email: user.email,
                    price: total,
                    itemOwner: cart.map(item => item.owner),
                    items: cart.map(item => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    transaction: paymentIntent.id,
                    status: "Pending",
                    date: new Date()
                };
                const res = await axiosSecure.post('payments', payment);
                refetch();
                navigate('/invoice', { state: { transactionId: paymentIntent.id, newCart } });
            }
        }
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="p-4 border border-gray-300 rounded-md"
                />
                <button 
                    type="submit" 
                    disabled={!stripe || !clientSecret}
                    className="w-full mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                >
                    Pay
                </button>
                {error && <p className="text-red-800 mt-2">{error}</p>}
                {transaction && <p className="text-green-800 mt-2">Transaction ID: {transaction}</p>}
            </form>
        </div>
    );
};

export default Checkoutform;
