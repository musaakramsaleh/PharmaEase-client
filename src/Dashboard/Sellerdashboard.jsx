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
import { FaDollarSign } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
const Sellerdashboard = () => {
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
    let allItems = [];

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
console.log(allItemsWithStatus);

const filter = allItemsWithStatus.filter(payments=>payments.status === 'paid')
const filter2 = allItemsWithStatus.filter(payments=>payments.status === 'Pending')
const totalPaid = filter.reduce((acc, curr) => acc + curr.price, 0);
const totalPending = filter2.reduce((acc, curr) => acc + curr.price, 0);

    return (
        <div>
          <Helmet><title>PharmaEase-SellerDashboard</title></Helmet>
            <div className="stats shadow">
  
  <div className="stat">
    <div className="stat-figure text-2xl">
        <FaDollarSign></FaDollarSign>
    </div>
    <div className="stat-title">Paid Totals</div>
    <div className="stat-value">{totalPaid}</div>
  </div>
  <div className="stat">
    <div className="stat-figure text-2xl">
        <FaDollarSign></FaDollarSign>
    </div>
    <div className="stat-title">Pending Totals</div>
    <div className="stat-value">{totalPending}</div>
  </div>
  
</div>
        </div>
    );
};

export default Sellerdashboard;
