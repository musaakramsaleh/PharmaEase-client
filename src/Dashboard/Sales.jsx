import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Sales = () => {
    const [salesData, setSalesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        // Fetch sales data from your API
        fetchSalesData();
    }, []);

    const fetchSalesData = async () => {
        // Replace with your API call
        const response = await fetch('/api/sales');
        const data = await response.json();
        setSalesData(data);
        setFilteredData(data);
    };

    const handleFilter = () => {
        if (startDate && endDate) {
            const filtered = salesData.filter(sale => {
                const saleDate = new Date(sale.date);
                return saleDate >= startDate && saleDate <= endDate;
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(salesData);
        }
    };

    const columns = [
        { name: 'Medicine Name', selector: 'medicineName', sortable: true },
        { name: 'Seller Email', selector: 'sellerEmail', sortable: true },
        { name: 'Buyer Email', selector: 'buyerEmail', sortable: true },
        { name: 'Total Price', selector: 'totalPrice', sortable: true },
        { name: 'Date', selector: 'date', sortable: true, format: row => new Date(row.date).toLocaleDateString() },
    ];

    const exportToCSV = () => {
        const csvData = filteredData.map(row => ({
            MedicineName: row.medicineName,
            SellerEmail: row.sellerEmail,
            BuyerEmail: row.buyerEmail,
            TotalPrice: row.totalPrice,
            Date: new Date(row.date).toLocaleDateString(),
        }));
    };

    const exportToXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesReport');
        XLSX.writeFile(workbook, 'sales_report.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, { html: '#sales-table' });
        doc.save('sales_report.pdf');
    };

    return (
        <div>
            <h1>Sales Report</h1>
            <div className="filter-container">
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                />
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                />
                <button onClick={handleFilter}>Filter</button>
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
            />
            <div className="export-buttons">
                <CSVLink data={filteredData} filename="sales_report.csv">Export to CSV</CSVLink>
                <button onClick={exportToXLSX}>Export to XLSX</button>
                <button onClick={exportToPDF}>Export to PDF</button>
            </div>
        </div>
    );
};

export default Sales;
