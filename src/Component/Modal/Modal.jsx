import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function Modal({ isOpen, closeModal, medicine }) {
    const [open, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(isOpen);
    }, [isOpen]);

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
                                    <img src={medicine.imageUpload} alt="" />
                                </Dialog.Title>
                                <Dialog.Description className="mt-2">
                                    This will permanently deactivate your account
                                </Dialog.Description>

                                <div className="mt-4">
                                    {/* Additional content can go here */}
                                </div>

                                <div className="mt-4">
                                    <button className="mr-2 px-4 py-2 bg-red-600 text-white rounded" onClick={closeModal}>Deactivate</button>
                                    <button className="px-4 py-2 bg-gray-600 text-white rounded" onClick={closeModal}>Cancel</button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default Modal;

