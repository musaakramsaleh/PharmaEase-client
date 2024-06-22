import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import useCart from '../Hook/useCart';
import UseAuth from '../Hook/UseAuth';
import Modal from '../Component/Modal/Modal';
import Swal from 'sweetalert2';
import { FaEye } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Product = () => {
    const axiosNormal = useAxios();
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const { category } = useParams();
    const [cart, refetch] = useCart();
    const { user } = UseAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [count, setCount] = useState(21);
    const [search, setSearch] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('');

    const openModal = (medicine) => {
        setSelectedMedicine(medicine);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ['products', category, currentPage, itemsPerPage, search, sortOrder],
        queryFn: async () => {
            try {
                const { data } = await axiosNormal.get(`/products?page=${currentPage}&size=${itemsPerPage}&search=${search}&sort=${sortOrder}`);
                return data;
            } catch (error) {
                console.error('Error fetching medicines:', error);
                throw new Error('Failed to fetch medicines');
            }
        },
    });
    const medicines = data?.medicines || [];
    const totalItems = data?.count || 0;
    const handleSearch = (e) => {
        e.preventDefault();
        const text = e.target.search.value;
        console.log(text)
        setSearch(text);
        setCurrentPage(1);
    };

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const handleCurrentPage = (number) => {
        setCurrentPage(number);
    };

    const noOfPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [...Array(noOfPages).keys()].map((element) => element + 1);

    const handleCart = (medicine) => {
        const { _id, itemName, owner, perUnitPrice, company } = medicine;
        const usercart = user.email;
        const quantity = 1;
        const medical = { name: itemName, owner, price: perUnitPrice, company, usercart, quantity, menu_id: _id };
        if (user && user.email) {
            axiosNormal.post('/carts', medical).then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                refetch();
            });
        }
    };

    if (isLoading) {
        return <div>....Loading</div>;
    }

    return (
        <div>
            <Helmet><title>PharmaEase-Product</title></Helmet>
            <form className='max-w-[325px] my-10 mx-auto' onSubmit={handleSearch}>
                <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                    <input
                        className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                        type='text'
                        name='search'
                        placeholder='Search'
                        aria-label='Enter Medicine Info'
                    />
                    <button
                        type='submit'
                        className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider  uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500  text-white rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
                    >
                        Search
                    </button>
                </div>
            </form>
            <div className="flex justify-end mb-4">
                <button onClick={() => handleSort('asc')} className={`btn ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Sort by Price: Low to High</button>
                <button onClick={() => handleSort('desc')} className={`btn ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Sort by Price: High to Low</button>
            </div>
            <div className="overflow-x-auto">
                {
                    isLoading ? <span className="loading loading-spinner mx-auto loading-lg text-center"></span> : <table className="table">
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
                                            <label>{key + 1}</label>
                                        </th>
                                        <td>
                                            <div>
                                                <div className="font-bold">{medicine.itemName}</div>
                                                <div className="text-sm opacity-50">{medicine.itemGenericName}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <h2 className='{medicine.company}'>{medicine.company}</h2>
                                        </td>
                                        <td>
                                            <button onClick={() => openModal(medicine)}><FaEye></FaEye></button>
                                            {selectedMedicine && selectedMedicine._id === medicine._id && (
                                                <Modal medicine={selectedMedicine} isOpen={isModalOpen} closeModal={closeModal} />
                                            )}
                                        </td>
                                        <th>
                                            <button onClick={() => handleCart(medicine)} className="btn bg-gradient-to-b from-cyan-500 to-blue-500 text-white">Select</button>
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
                <div className='max-w-600px mx-auto text-center mt-5 mb-5'>
                    <button disabled={currentPage === 1} onClick={() => handleCurrentPage(currentPage - 1)} className='btn bg-gradient-to-r from-cyan-500 to-blue-500  text-white'>Prev</button>
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => handleCurrentPage(page)}
                            className={`${currentPage === page ? ' btn-ghost' : 'bg-gradient-to-r from-cyan-500 to-blue-500  text-white'} btn mr-3`}
                        >
                            {page}
                        </button>
                    ))}
                    <button disabled={currentPage === pages.length} onClick={() => handleCurrentPage(currentPage + 1)} className='btn bg-gradient-to-r from-cyan-500 to-blue-500  text-white mr-3'>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
