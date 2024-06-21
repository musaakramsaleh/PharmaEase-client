import React, { useState } from 'react';
import AddMedicineModal from '../Component/Modal/Additemmodal';
import UseAuth from '../Hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hook/useAxios';
import UpdateMedicineModal from '../Component/Modal/UpdateMedicineModal'; // Import the UpdateMedicineModal
import Headline from '../shared/Headline';
import UseAxiosSecure from '../Hook/UseAxiosSecure';

const Seller = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const { data: medicines = [], isLoading, error, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const response = await axiosSecure.get(`/product/${user?.email}`);
            return response.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error('Error fetching medicines:', error);
        return <div>Error loading medicines</div>;
    }
    refetch()
    return (
        <div className="container mx-auto p-4 overflow-x-auto">
            <Headline title='Your Medicines' description="Manage all the medicines you have uploaded to sell"></Headline>
            {medicines.length === 0 ? (
                <p>No medicines found.</p>
            ) : (
                <table className="table-auto w-full mt-3">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Generic Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Item Mass Unit</th>
                            <th>Price per Unit</th>
                            <th>Discount Percentage</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map(medicine => (
                            <tr className='text-center font-bold' key={medicine._id}>
                                <td className='border-2'>{medicine.itemName}</td>
                                <td className='border-2'>{medicine.itemGenericName}</td>
                                <td className='border-2'>{medicine.shortDescription}</td>
                                <td className='border-2'>{medicine.category}</td>
                                <td className='border-2'>{medicine.company}</td>
                                <td className='border-2'>{medicine.itemMassUnit}</td>
                                <td className='border-2'>{medicine.perUnitPrice}</td>
                                <td className='border-2'>{medicine.discountPercentage}</td>
                                <td className='border-2'>
                                    <button className='mt-5 text-center bg-gradient-to-r p-3 text-white font-bold from-cyan-500 to-blue-500' onClick={() => setSelectedMedicine(medicine)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button onClick={openModal} className="px-4 py-2 bg-green-500 text-white rounded">
                Add Medicine
            </button>
            <AddMedicineModal isOpen={isModalOpen} closeModal={closeModal} />
            {selectedMedicine && (
                <UpdateMedicineModal isOpen={true} closeModal={() => setSelectedMedicine(null)} medicine={selectedMedicine} />
            )}
        </div>
    );
};

export default Seller;
