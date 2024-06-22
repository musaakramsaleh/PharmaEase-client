import React, { useState } from 'react';
import Headline from '../shared/Headline';
import useCart from '../Hook/useCart';
import Addcategorymodal from '../Component/Modal/Addcategorymodal';
import UseAxiosSecure from '../Hook/UseAxiosSecure';
import useCategory from '../Hook/useCategory';
import Updatecategorymodal from '../Component/Modal/Updatecategorymodal';

const ManageCategory = () => {
    const { category } = useCategory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const axiosSecure = UseAxiosSecure();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    console.log(category);

    return (
        <div>
            <Headline title="All Categories" description="Add or remove categories from medicine list" />
            <button onClick={openModal} className="px-4 py-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600">
                Add new Category
            </button>
            <Addcategorymodal isOpen={isModalOpen} closeModal={closeModal} />
            {selectedMedicine && (
                <Updatecategorymodal isOpen={true} closeModal={() => setSelectedMedicine(null)} medicine={selectedMedicine} />
            )}
            
            <div className="mt-8">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 shadow-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-3 px-4 border-b text-center">Image</th>
                                <th className="py-3 px-4 border-b text-center">Name</th>
                                <th className="py-3 px-4 border-b text-center">Quantity</th>
                                <th className="py-3 px-4 border-b text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.map((item, index) => (
                                <tr key={index} className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <td className="py-3 px-4 border-b">
                                        <img src={item.image} alt={item.category} className="w-16 h-16 object-cover rounded mx-auto" />
                                    </td>
                                    <td className="py-3 px-4 border-b">{item.category}</td>
                                    <td className="py-3 px-4 border-b">{item.quantity}</td>
                                    <td className="py-3 px-4 border-b">
                                        <div className='flex md:flex-row flex-col mx-auto justify-center'>
                                        <button onClick={() => setSelectedMedicine(item)} className="px-4 py-2 mr-3 bg-blue-500 text-white rounded hover:bg-blue-600">
                                          Update
                                        </button>
                                        <button onClick={() => setSelectedMedicine(item)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                          Delete
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCategory;
