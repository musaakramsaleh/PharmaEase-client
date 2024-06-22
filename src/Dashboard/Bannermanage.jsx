import React, { useState } from 'react';
import Headline from '../shared/Headline';
import useCart from '../Hook/useCart';
import Addcategorymodal from '../Component/Modal/Addcategorymodal';
import UseAxiosSecure from '../Hook/UseAxiosSecure';
import useCategory from '../Hook/useCategory';
import Updatecategorymodal from '../Component/Modal/Updatecategorymodal';
import Swal from 'sweetalert2';
import Addbannermodal from '../Component/Modal/Addbannermodal';
import UseBanner from '../Hook/UseBanner';

const Bannermanage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [banner,refetch] = UseBanner()
    const axiosSecure = UseAxiosSecure();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    console.log(banner)
    refetch()
    return (
        <div>
            <Headline title="Advertisement" description="Request for advertisement through this page" />
            <button onClick={openModal} className="px-4 py-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600">
                Advertise
            </button>
            <Addbannermodal isOpen={isModalOpen} closeModal={closeModal} />
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
                                <th className="py-3 px-4 border-b text-center">Description</th>
                                <th className="py-3 px-4 border-b text-center">status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banner.map((item, index) => (
                                <tr key={index} className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <td className="py-3 px-4 border-b">
                                        <img src={item.imageUpload} alt='' className="w-16 h-16 object-cover rounded mx-auto" />
                                    </td>
                                    <td className="py-3 px-4 border-b">{item.name}</td>
                                    <td className="py-3 px-4 border-b">{item.Description}</td>
                                    <td className="py-3 px-4 border-b">{item.status}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Bannermanage;
