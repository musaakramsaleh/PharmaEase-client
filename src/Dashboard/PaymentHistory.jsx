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
import UseAuth from '../Hook/UseAuth';
import { Helmet } from 'react-helmet-async';
const PaymentHistory = () => {
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');
    const {user} =UseAuth()
    const [sortOrder, setSortOrder] = useState('');
    const axiosSecure = UseAxiosSecure();
    const axios = useAxios()
    const { data: payment = [], isLoading, refetch } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const response = await axios.get(`/payment`);
            return response.data;
        },
        
    });
  

// Iterate through each medicine object and collect its items
let allItemsWithStatus = [];

// Iterate through each medicine object and collect its items with status
payment.forEach(medicine => {
  const itemsWithStatus = medicine.items.map(item => ({
    ...item,
    status: medicine.status
  }));
  allItemsWithStatus = [...allItemsWithStatus, ...itemsWithStatus];
});

// Output all items collected with their status
 const my = allItemsWithStatus.filter(medicine=>medicine.owner.email===user?.email)

   
    return (
        <div className="container mx-auto p-4 overflow-x-auto">
            <Helmet><title>PharmaEase-Payment History</title></Helmet>
            <Headline title='Payment History' description="All the items that are sold so far"></Headline>
            {my?.length === 0 ? (
                <p>No medicines found.</p>
            ) : (
                <table className="table-auto w-full mt-3">
                    <thead>
                        <tr>
                            <th className='border border-b-2'>Medicine Name</th>
                            <th className='border border-b-2'>Quantity</th>
                            <th className='border border-b-2'>price</th>
                            <th className='border border-b-2'>Total</th>
                            <th className='border border-b-2'>Status</th>
                            <th className='border border-b-2'>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {my?.map((medicine,index) => (
                            <tr className='text-center font-bold' key={index}>
                                <td className='border border-b-2'>{medicine.name}</td>
                                <td className='border border-b-2'>{medicine.quantity}</td>
                                <td className='border border-b-2'>{medicine.price}</td>
                                <td className='border border-b-2'>{medicine.price * medicine.quantity}</td>
                                <td className='border border-b-2'>{medicine.status}</td>
                                <td className='border border-b-2'>{medicine.transaction}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PaymentHistory;
