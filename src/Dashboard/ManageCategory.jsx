import React, { useState } from 'react';
import Headline from '../shared/Headline';
import useCart from '../Hook/useCart';
import Addcategorymodal from '../Component/Modal/Addcategorymodal';
import UseAxiosSecure from '../Hook/UseAxiosSecure';

const ManageCategory = () => {
    const {cart} = useCart()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const axiosSecure = UseAxiosSecure();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div>
            <Headline title="All Categories" description="Add or remove categories from medicine list"></Headline>
            <button onClick={openModal} className="px-4 py-2 bg-green-500 text-white rounded">
                Add new Category
            </button>
            <Addcategorymodal isOpen={isModalOpen} closeModal={closeModal} />
            {selectedMedicine && (
                <UpdateMedicineModal isOpen={true} closeModal={() => setSelectedMedicine(null)} medicine={selectedMedicine} />
            )}
        </div>
    );
};

export default ManageCategory;