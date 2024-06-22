import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType } from 'docx';
import autoTable from 'jspdf-autotable';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../Hook/UseAxiosSecure';
import Headline from '../shared/Headline';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import useAxios from '../Hook/useAxios';
const Detailedsell = () => {
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const axiosSecure = UseAxiosSecure();
    const axios = useAxios()
    const { data: payment = [], isLoading, refetch } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const response = await axios.get(`/payments?status=${status}&search=${search}&sort=${sortOrder}`);
            return response.data;
        },
        
    });

    const updatestatus = async (id) => {
        try {
            const response = await axiosSecure.patch(`/payments/${id}`, { status: "paid" });
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Status Updated',
                text: 'Payment status has been updated successfully!',
            });
            refetch();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if(isLoading){
      return <p>Data is loading</p>
    }
    return (
        <div className="container mx-auto p-4 overflow-x-auto">
            <Headline title='Payment Management' description="Manage all the medicines you have uploaded to sell"></Headline>
            {payment?.length === 0 ? (
                <p>No medicines found.</p>
            ) : (
                <table className="table-auto w-full mt-3">
                    <thead>
                        <tr>
                            <th className='border border-b-2'>Medicine Name</th>
                            <th className='border border-b-2'>Seller Email</th>
                            <th className='border border-b-2'>Buyer Email</th>
                            <th className='border border-b-2'>Total Price</th>
                            <th className='border border-b-2'>Transaction</th>
                            <th className='border border-b-2'>Status</th>
                            <th className='border border-b-2'>order time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payment && payment?.map(medicine => (
                            <tr className='text-center font-bold' key={medicine._id}>
                                <td className='border border-b-2'>{medicine.items.map(item=><p>{item.name}</p>)}</td>
                                <td className='border border-b-2'>{medicine.itemOwner.map(item=><p>{item.email}</p>)}</td>
                                <td className='border border-b-2'>{medicine.email}</td>
                                <td className='border border-b-2'>{medicine.price}</td>
                                <td className='border border-b-2'>{medicine.transaction}</td>
                                <td className='border border-b-2'>{medicine.status==="Pending"?<button onClick={()=>updatestatus(medicine._id)} className='btn bg-gradient-to-b from-cyan-500 to-blue-500 text-white'>Accept Payment</button>:medicine.status}</td>
                                <td className='border border-b-2'>{new Date(medicine.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Detailedsell;
