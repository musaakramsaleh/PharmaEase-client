import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import useCart from '../Hook/useCart';

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [cart] = useCart()
    console.log(cart)
    const [carts, setCart] = useState([
        { id: 1, name: 'Medicine A', company: 'Company A', price: 10, quantity: 1 },
        { id: 2, name: 'Medicine B', company: 'Company B', price: 15, quantity: 2 },
    ]);

    const handleIncrease = (medicine) => {
        setCart(carts.map(item => 
            item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDecrease = (medicine) => {
        setCart(carts.map(item => 
            item.id === medicine.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const handleRemove = (medicine) => {
        setCart(carts.filter(item => item.id !== medicine.id));
    };

    const handleClearCart = () => {
        setCart([]);
    };

    const handleCheckout = () => {
        navigate('/checkout');
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
