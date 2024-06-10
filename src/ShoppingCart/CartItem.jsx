import React from 'react';

const CartItem = ({ medicine, onIncrease, onDecrease, onRemove }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div>
                <h2 className="text-lg font-bold">{medicine.name}</h2>
                <p>{medicine.company}</p>
                <p>${medicine.price} per unit</p>
            </div>
            <div className="flex items-center">
                <button onClick={() => onDecrease(medicine)} className="px-2 py-1 bg-gray-200">-</button>
                <span className="px-4">{medicine.quantity}</span>
                <button onClick={() => onIncrease(medicine)} className="px-2 py-1 bg-gray-200">+</button>
            </div>
            <button onClick={() => onRemove(medicine)} className="px-4 py-2 bg-red-500 text-white">Remove</button>
        </div>
    );
};

export default CartItem;