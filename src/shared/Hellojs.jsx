import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../Hook/useAxios';
import { FaEye, FaTruckLoading } from 'react-icons/fa';
import useCategory from '../Hook/useCategory';
import Categorycard from './Categorycard';
import { useSearchParams } from 'react-router-dom';
import Modal from '../Component/Modal/Modal';
import UseAuth from '../Hook/UseAuth';
import Swal from 'sweetalert2';
import useCart from '../Hook/useCart';

const Hellojs = () => {
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [params, useParams] = useSearchParams();
    const categories = params.get('category');
    const axiosNormal = useAxios();
    const [cart,refetch] = useCart()
    const { category, isLoading: categoryLoading } = useCategory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {user} = UseAuth()
    const openModal = (medicine) => {
        setSelectedMedicine(medicine);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const { data: medicines = [], isLoading } = useQuery({
        queryKey: ['products', categories],
        queryFn: async () => {
            const { data } = await axiosNormal.get(`/products?category=${categories}`);
            return data;
        },
    });
    
    const handlecart = medicine =>{
        const menu_id = medicine._id
        const name = medicine.itemName
        const owner = medicine.owner
        const price = medicine?.perUnitPrice
        const company = medicine.company
        const usercart = user.email
        const quantity = 1
        const medical = {name,owner,price,company,usercart,quantity,menu_id}
        if(user && user.email){
            axiosNormal.post('/carts',medical)
            .then(res=>{
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
                refetch()
              })
        }
        
    }
    console.log(categories);
    

    return (
        <div>
            <div className='flex bg-green-500 items-center justify-around overflow-x-auto'>
                {
                    category && category.map(cata => <Categorycard key={cata._id} cata={cata}></Categorycard>)
                }
            </div>
            <div>
                <div className="overflow-x-auto">
                 {
                 isLoading?<span className="loading loading-spinner mx-auto loading-lg text-center"></span>:<table className="table">
                 {/* head */}
                 <thead className='text-center'>
                     <tr>
                         <th></th>
                         <th>Name</th>
                         <th>Company Name</th>
                         <th>Detail</th>
                         <th>Buy item</th>
                     </tr>
                 </thead>
                 <tbody className='text-center font-bold text-[16px]'>
                     {
                         medicines.map((medicine, key) => (
                             <tr key={medicine._id}>
                                 <th>
                                     <label>
                                         {key + 1}
                                     </label>
                                 </th>
                                 <td>
                                     <div className="">
                                         <div>
                                             <div className="font-bold">{medicine.itemName}</div>
                                             <div className="text-sm opacity-50">{medicine.itemGenericName}</div>
                                         </div>
                                     </div>
                                 </td>
                                 <td>
                                     <h2 className='{medicine.company}'>{medicine.company}</h2>
                                 </td>
                                 <td>
                                     <button onClick={() => openModal(medicine)}>See details</button>
                                     {selectedMedicine && selectedMedicine._id === medicine._id && (
                                         <Modal medicine={selectedMedicine} isOpen={isModalOpen} closeModal={closeModal} />
                                     )}
                                 </td>
                                 <th>
                                     <button onClick={()=>handlecart(medicine)} className="btn btn-ghost">Buy item</button>
                                 </th>
                             </tr>
                         ))
                     }
                 </tbody>
                 {/* foot */}
             </table>
                 }
                </div>
            </div>
        </div>
    );
};

export default Hellojs;
