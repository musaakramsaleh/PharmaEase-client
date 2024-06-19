import React, { useEffect, useState } from 'react'; 
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useCart from '../Hook/useCart';
import useAxios from '../Hook/useAxios';
import UseAuth from '../Hook/UseAuth';

const Checkoutform = () => {
    const stripe = useStripe()
    const {user} = UseAuth()
    const axiosnormal = useAxios()
    const elements = useElements()
    const [clientsecret,setClientsecret] = useState('')
    const [cart] = useCart()
    const total =  cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    

    useEffect(()=>{
        axiosnormal.post('/create-payment-intent',{price:total})
        .then(res=>{
            console.log(res.data.clientSecret);
            setClientsecret(res.data.clientSecret)
        })
    },[axiosnormal,total])

    const handlesubmit = async (e) =>{
        e.preventDefault()
        
        if(!stripe || !elements){
            return
        }
      const card = elements.getElement(CardElement);

      if(card === null){
        return
      }
      const {error,paymentMethod} = await stripe.createPaymentMethod({
           type:'card',
           card,
      });

      if(error){
        console.log("there is an error",error)
      }else{
        console.log("PaymentMethod is", paymentMethod);
      }
      const { paymentIntent,error: confirmError} = await stripe.confirmCardPayment(clientsecret,{
        payment_method:{
            card: card,
            billing_details: {
                email: user?.email || 'anonimous',
                name: user?.displayName || 'anonymous'
            }
        }
      })
      if(confirmError){
          console.log('confirm Error')
      }
      else{
        console.log('payment intent',paymentIntent)
        if(paymentIntent.status=='succeeded'){
            console.log('transaction id',paymentIntent.id)
        }
      }
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
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
      />
      <button type="submit" disabled={!stripe || !clientsecret}>
        Pay
      </button>
            </form>
        </div>
    );
};

export default Checkoutform;