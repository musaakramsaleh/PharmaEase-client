import React, { useState } from 'react';
import Headline from '../shared/Headline';
import useCart from '../Hook/useCart';
import Addcategorymodal from '../Component/Modal/Addcategorymodal';
import UseAxiosSecure from '../Hook/UseAxiosSecure';
import useCategory from '../Hook/useCategory';
import Updatecategorymodal from '../Component/Modal/Updatecategorymodal';
import Swal from 'sweetalert2';

const Bannermanage = () => {
    const { category, refetch } = useCategory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const axiosSecure = UseAxiosSecure();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    console.log(category);

    const handleUpdate = async (category) => {
        const { value: formValues } = await Swal.fire({
            title: "Update Category",
            html: `
                <label>Category Name</label><br>
                <input id="swal-input1" class="swal2-input" value="${category.category}"><br>
                <label>Image URL</label><br>
                <input id="swal-input2" class="swal2-input" value="${category.image}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const categoryName = document.getElementById("swal-input1").value;
                const image = document.getElementById("swal-input2").value;
                return { category: categoryName, image: image }; // Ensure this matches the backend expectation
            }
        });

        if (formValues) {
            try {
                const response1 = await axiosSecure.put(`/category/${category._id}`, formValues);
                console.log(response1.data);
                Swal.fire({
                    title: "Success!",
                    text: "Category Updated Successfully",
                    icon: "success"
                });
                refetch();
            } catch (err) {
                console.error(err);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update category",
                    icon: "error"
                });
            }
        }
    };
    const handleDelete = async (category) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Do you really want to delete the category "${category.category}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await axiosSecure.delete(`/category/${category._id}`);
                console.log(response.data);
                Swal.fire({
                    title: "Deleted!",
                    text: "Category has been deleted.",
                    icon: "success"
                });
                refetch();
            } catch (err) {
                console.error(err);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete category",
                    icon: "error"
                });
            }
        }
    };
    return (
        <div>
            <Headline title="All Categories" description="Add or remove categories from medicine list" />
            <button onClick={openModal} className="px-4 py-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600">
                Add Banner
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
