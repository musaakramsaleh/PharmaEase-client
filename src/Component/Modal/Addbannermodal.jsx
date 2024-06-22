import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import pharmaceuticalCompanies from '../../../public/category'
import UseAuth from '../../Hook/UseAuth';
import useCategory from '../../Hook/useCategory'
import useAxios from '../../Hook/useAxios';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hook/UseAxiosSecure';
const image_hosting_key = import.meta.env.VITE_IMGAPI;
const imageurl = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
function Addbannermodal({ isOpen, closeModal }) {
    const [open, setIsOpen] = useState(false);
    const {category} = useCategory()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {user} = UseAuth()
    const axiosSecure = UseAxiosSecure()
    const axios = useAxios()
    useEffect(() => {
        setIsOpen(isOpen);
    }, [isOpen]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('image', data.imageUpload[0]);

        try {
            const imgUploadRes = await axios.post(imageurl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
               
            if (imgUploadRes.data.success) {
                const imageUpload = imgUploadRes.data.data.url;
                const Description = data.shortDescription;
                const name = data.name
                const status = 'not used';
                const email = user?.email
                const banner = { Description, imageUpload,status,name, email};

                if (user && user.email) {
                    const res = await axiosSecure.post('/banner', banner);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        reset(); // Reset the form after successful submission
                        closeModal(); // Close the modal
                    }
                }
            }
        } catch (error) {
            console.error("Image upload failed:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong with the image upload!',
            });
        }
    };
    
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-20"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-20"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Add New Advertisement
                                </Dialog.Title>
                                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <input 
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            {...register('shortDescription', { required: true })}
                                        />
                                        {errors.itemName && <span className="text-red-500 text-xs">This field is required</span>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
                                        <input 
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            {...register('name', { required: true })}
                                        />
                                        {errors.itemName && <span className="text-red-500 text-xs">This field is required</span>}
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Image</label>
                                        <input 
                                            type="file"
                                            className="mt-1 file-input file-input-info block w-full max-w-xs  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            {...register('imageUpload', { required: true })}
                                        />
                                        {errors.imageUpload && <span className="text-red-500 text-xs">This field is required</span>}
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Add Medicine
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default Addbannermodal;