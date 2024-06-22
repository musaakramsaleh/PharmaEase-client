import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hook/UseAxiosSecure';

const Updatecategorymodal = ({ isOpen, closeModal, category }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = UseAxiosSecure();

    React.useEffect(() => {
        reset({
            category: category.category,
            imageUpload: category.image,
        });
    }, [category, reset]);

    const onSubmit = async (data) => {
        try {
            const updatedData = {
                category: data.category,
                image: data.imageUpload,
            };

            await axiosSecure.put(`/product/${category._id}`, updatedData);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Category updated successfully',
                showConfirmButton: false,
                timer: 1500,
            });
            closeModal();
        } catch (error) {
            console.error('Error updating category:', error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error updating category',
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
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true"></div>
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Panel className="relative bg-white shadow-md rounded p-4 max-w-lg w-full z-10">
                        <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                            Update Category
                        </Dialog.Title>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    {...register('category', { required: true })}
                                />
                                {errors.category && (
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
                                    Update Category
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Updatecategorymodal;
