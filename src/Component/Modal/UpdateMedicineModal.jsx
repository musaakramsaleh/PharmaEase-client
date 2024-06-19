import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import useAxios from '../../Hook/useAxios';
import Swal from 'sweetalert2';
import pharmaceuticalCompanies from '../../../public/category';
import useCategory from '../../Hook/useCategory';

const UpdateMedicineModal = ({ isOpen, closeModal, medicine }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosNormal = useAxios();
    const { category } = useCategory();

    React.useEffect(() => {
        reset({
            itemName: medicine.itemName,
            itemGenericName: medicine.itemGenericName,
            shortDescription: medicine.shortDescription,
            imageUpload: medicine.imageUpload,
            category: medicine.category,
            company: medicine.company,
            itemMassUnit: medicine.itemMassUnit,
            perUnitPrice: medicine.perUnitPrice,
            discountPercentage: medicine.discountPercentage || 0,
        });
    }, [medicine, reset]);

    const onSubmit = async (data) => {
        try {
            const updatedData = {
                ...data,
                perUnitPrice: parseFloat(data.perUnitPrice),
                discountPercentage: parseFloat(data.discountPercentage || 0),
            };

            await axiosNormal.put(`/product/${medicine._id}`, updatedData);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Medicine updated successfully',
                showConfirmButton: false,
                timer: 1500,
            });
            closeModal();
        } catch (error) {
            console.error('Error updating medicine:', error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error updating medicine',
                showConfirmButton: true,
            });
        }
    };

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={closeModal}
            >
                {/* Background overlay with blur effect */}
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true"></div>
                
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Panel className="relative bg-white shadow-md rounded p-4 max-w-lg w-full z-10">
                        <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                            Update Medicine
                        </Dialog.Title>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register('itemName', { required: true })}
                                />
                                {errors.itemName && (
                                    <span className="text-red-500 text-xs">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Generic Name
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register('itemGenericName', { required: true })}
                                />
                                {errors.itemGenericName && (
                                    <span className="text-red-500 text-xs">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register('shortDescription', { required: true })}
                                />
                                {errors.shortDescription && (
                                    <span className="text-red-500 text-xs">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register('imageUpload', { required: true })}
                                />
                                {errors.imageUpload && (
                                    <span className="text-red-500 text-xs">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register('category', { required: true })}
                                >
                                    {category?.map((categories) => (
                                        <option key={categories._id} value={categories.category}>
                                            {categories.category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <span className="text-red-500 text-xs">This field is required</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Company</label>
                                <select 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register('company', { required: true })}
                                >
                                    {pharmaceuticalCompanies.map((company, index) => (
                                        <option key={index} value={company}>
                                            {company}
                                        </option>
                                    ))}
                                </select>
                                {errors.company && <span className="text-red-500 text-xs">This field is required</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Item Mass Unit (Mg or ML)
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register('itemMassUnit', { required: true })}
                                />
                                {errors.itemMassUnit && (
                                    <span className="text-red-500 text-xs">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Price per Unit
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register('perUnitPrice', { required: true })}
                                />
                                {errors.perUnitPrice && (
                                    <span className="text-red-500 text-xs">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Discount Percentage
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register('discountPercentage')}
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 mr-2"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                                >
                                    Update Medicine
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdateMedicineModal;
