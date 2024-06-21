import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import pharmaceuticalCompanies from '../../../public/category'
import UseAuth from '../../Hook/UseAuth';
import useCategory from '../../Hook/useCategory'
import useAxios from '../../Hook/useAxios';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hook/UseAxiosSecure';
function AddMedicineModal({ isOpen, closeModal }) {
    const [open, setIsOpen] = useState(false);
    const {category} = useCategory()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {user} = UseAuth()
    const axiosSecure = UseAxiosSecure()
    useEffect(() => {
        setIsOpen(isOpen);
    }, [isOpen]);

    const onSubmit =  (data) => {
        const itemName = data.itemName;
        const itemGenericName = data.itemGenericName;
        const shortDescription = data.shortDescription;
        const imageUpload = data.imageUpload[0];
        const category = data.category ;
        const company = data.company;
        const itemMassUnit = data.itemMassUnit;
        const perUnitPrice = parseInt(data.perUnitPrice, 10); // Convert to integer
        const discountPercentage = parseInt(data.discountPercentage, 10) || 0;
        const name = user.displayName
        const email  = user.email
        const owner = {name,email}
        const product = {itemName,itemGenericName,shortDescription,imageUpload,category,company,itemMassUnit,perUnitPrice,discountPercentage,owner}
        if(user && user.email){
            axiosSecure.post('/product',product)
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
              })
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
                                    Add New Medicine
                                </Dialog.Title>
                                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Item Name</label>
                                        <input 
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            {...register('itemName', { required: true })}
                                        />
                                        {errors.itemName && <span className="text-red-500 text-xs">This field is required</span>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Generic Name</label>
                                        <input 
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            {...register('itemGenericName', { required: true })}
                                        />
                                        {errors.itemGenericName && <span className="text-red-500 text-xs">This field is required</span>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            {...register('shortDescription', { required: true })}
                                        />
                                        {errors.shortDescription && <span className="text-red-500 text-xs">This field is required</span>}
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
                                        <label className="block text-sm font-medium text-gray-700">Item Mass Unit (Mg or ML)</label>
                                        <input 
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            {...register('itemMassUnit', { required: true })}
                                        />
                                        {errors.itemMassUnit && <span className="text-red-500 text-xs">This field is required</span>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Price per Unit</label>
                                        <input 
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            {...register('perUnitPrice', { required: true })}
                                        />
                                        {errors.perUnitPrice && <span className="text-red-500 text-xs">This field is required</span>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
                                        <input 
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            defaultValue={0}
                                            {...register('discountPercentage')}
                                        />
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

export default AddMedicineModal;