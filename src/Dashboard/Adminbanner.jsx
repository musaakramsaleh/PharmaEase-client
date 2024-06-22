import React from 'react';
import UseBanner from '../Hook/UseBanner';
import UseAxiosSecure from '../Hook/UseAxiosSecure';
import Swal from 'sweetalert2';

const Adminbanner = () => {
    const [banner, refetch] = UseBanner(); // Custom hook to fetch banners
    const axiosSecure = UseAxiosSecure(); // Custom hook for secure Axios instance

    // Function to toggle banner status
    const toggleBannerStatus = async (id, currentStatus) => {
        try {
            // Determine the new status based on the current status
            const newStatus = currentStatus === 'not used' ? 'used' : 'not used';

            // Send PATCH request to update banner status
            const response = await axiosSecure.patch(`/banner/${id}`, {
                status: newStatus
            });

            console.log(response.data); // Log response data to console

            // Show success message using Swal (SweetAlert)
            Swal.fire({
                icon: 'success',
                title: 'Status Updated',
                text: 'Banner status has been updated successfully!',
            });

            // Refetch the banner data to update the component with the latest data
            refetch();
        } catch (error) {
            console.error('Error updating status:', error); // Log error to console
        }
    };

    return (
        <div className="mt-8">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-3 px-4 border-b text-center">Image</th>
                            <th className="py-3 px-4 border-b text-center">Name</th>
                            <th className="py-3 px-4 border-b text-center">Description</th>
                            <th className="py-3 px-4 border-b text-center">Status</th>
                            <th className="py-3 px-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banner.map((item, index) => (
                            <tr key={index} className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                <td className="py-3 px-4 border-b">
                                    <img src={item.imageUpload} alt={item.Description} className="w-16 h-16 object-cover rounded mx-auto" />
                                </td>
                                <td className="py-3 px-4 border-b">{item.name}</td>
                                <td className="py-3 px-4 border-b">{item.Description}</td>
                                <td className="py-3 px-4 border-b">{item.status}</td>
                                <td className="py-3 px-4 border-b">
                                    {/* Button to toggle banner status */}
                                    <button
                                        className={`rounded-md px-4 py-2 text-sm font-medium ${item.status === 'not used' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} hover:bg-opacity-80 focus:outline-none`}
                                        onClick={() => toggleBannerStatus(item._id, item.status)}
                                    >
                                        {item.status === 'not used' ? 'Add to Advertise' : 'Remove from Advertise'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Adminbanner;
