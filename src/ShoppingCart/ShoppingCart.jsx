import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import useCart from '../Hook/useCart';
import useAxios from '../Hook/useAxios';
import UseAuth from '../Hook/UseAuth';

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [cart,refetch] = useCart()
    const {user} = UseAuth()
    const axiosNormal = useAxios()
    
    const handleIncrease = async (medicine) => {
        try {
            const response = await axiosNormal.patch(`/cart/${medicine._id}`, {
                quantity: medicine.quantity + 1
            });
            console.log("Quantity increased", response.data);
            refetch(); // Refresh the cart after update
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };
    const handleDecrease = async (medicine) => {
        if (medicine.quantity > 1) {
            try {
                const response = await axiosNormal.patch(`/cart/${medicine._id}`, {
                    quantity: medicine.quantity - 1
                });
                console.log("Quantity decreased", response.data);
                refetch(); // Refresh the cart after update
            } catch (error) {
                console.error("Error decreasing quantity:", error);
            }
        }
    };

    const handleRemove = async (medicine) => {
        try {
            const response = await axiosNormal.delete(`/cart/${medicine._id}`);
            console.log("Item removed", response.data);
            refetch(); // Refresh the cart after removal
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };


    const handleClearCart = async() => {
        try {
            const response = await axiosNormal.delete(`/carts?email=${user.email}`);
            console.log("All data removed", response.data);
            refetch(); 
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleCheckout = () => {
        navigate('/Payment');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map(medicine => (
                        <CartItem 
                            key={medicine.id} 
                            medicine={medicine} 
                            onIncrease={handleIncrease} 
                            onDecrease={handleDecrease} 
                            onRemove={handleRemove} 
                        />
                    ))}
                    <div className="flex justify-between mt-4">
                        <button onClick={handleClearCart} className="px-4 py-2 bg-red-500 text-white">Clear Cart</button>
                        <button onClick={handleCheckout} className="px-4 py-2 bg-green-500 text-white">Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
