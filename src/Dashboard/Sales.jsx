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
const Sales = () => {
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

    const exportPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Medicine Name', 'Seller Email', 'Buyer Email', 'Total Price', 'Transaction', 'Status', 'Order Time']],
            body: payment.map(medicine => [
                medicine.items.map(item => item.name).join(', '),
                medicine.itemOwner.map(owner => owner.email).join(', '),
                medicine.email,
                medicine.price,
                medicine.transaction,
                medicine.status,
                new Date(medicine.date).toLocaleString(),
            ]),
        });
        doc.save('sales_report.pdf');
    };

    const exportXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(payment.map(medicine => ({
            'Medicine Name': medicine.items.map(item => item.name).join(', '),
            'Seller Email': medicine.itemOwner.map(owner => owner.email).join(', '),
            'Buyer Email': medicine.email,
            'Total Price': medicine.price,
            'Transaction': medicine.transaction,
            'Status': medicine.status,
            'Order Time': new Date(medicine.date).toLocaleString(),
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');
        XLSX.writeFile(workbook, 'sales_report.xlsx');
    };

    const downloadDOCX = () => {
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            text: 'Payments Report',
                            heading: 'Title',
                        }),
                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [new Paragraph('Medicine Name')],
                                            width: { size: 25, type: WidthType.PERCENTAGE },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph('Seller Email')],
                                            width: { size: 25, type: WidthType.PERCENTAGE },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph('Buyer Email')],
                                            width: { size: 25, type: WidthType.PERCENTAGE },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph('Total Price')],
                                            width: { size: 25, type: WidthType.PERCENTAGE },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph('Transaction')],
                                            width: { size: 25, type: WidthType.PERCENTAGE },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph('Status')],
                                            width: { size: 25, type: WidthType.PERCENTAGE },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph('Order Time')],
                                            width: { size: 25, type: WidthType.PERCENTAGE },
                                        }),
                                    ],
                                }),
                                ...payment.map(medicine =>
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                children: medicine.items.map(item => new Paragraph(item.name)),
                                                width: { size: 25, type: WidthType.PERCENTAGE },
                                            }),
                                            new TableCell({
                                                children: medicine.itemOwner.map(item => new Paragraph(item.email)),
                                                width: { size: 25, type: WidthType.PERCENTAGE },
                                            }),
                                            new TableCell({
                                                children: [new Paragraph(medicine.email)],
                                                width: { size: 25, type: WidthType.PERCENTAGE },
                                            }),
                                            new TableCell({
                                                children: [new Paragraph(medicine.price.toString())],
                                                width: { size: 25, type: WidthType.PERCENTAGE },
                                            }),
                                            new TableCell({
                                                children: [new Paragraph(medicine.transaction)],
                                                width: { size: 25, type: WidthType.PERCENTAGE },
                                            }),
                                            new TableCell({
                                                children: [new Paragraph(medicine.status)],
                                                width: { size: 25, type: WidthType.PERCENTAGE },
                                            }),
                                            new TableCell({
                                                children: [new Paragraph(new Date(medicine.date).toLocaleString())],
                                                width: { size: 25, type: WidthType.PERCENTAGE },
                                            }),
                                        ],
                                    })
                                ),
                            ],
                        }),
                    ],
                },
            ],
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, 'payments-report.docx');
        });
    };
    if(isLoading){
      return <p>Data is loading</p>
    }
    return (
        <div className="container mx-auto p-4 overflow-x-auto">
            <Headline title='Sales Report' description="Manage the sales report page"></Headline>
            
            <div className="my-4 flex justify-between items-center">
                <CSVLink data={payment} filename="sales_report.csv" className="btn bg-gradient-to-b from-green-500 to-blue-500 text-white p-2 rounded">Export CSV</CSVLink>
                <button onClick={exportXLSX} className="btn bg-gradient-to-b from-green-500 to-blue-500 text-white p-2 rounded">Export XLSX</button>
                <button onClick={exportPDF} className="btn bg-gradient-to-b from-green-500 to-blue-500 text-white p-2 rounded">Export PDF</button>
                <button onClick={downloadDOCX} className="btn bg-gradient-to-b from-green-500 to-blue-500 text-white p-2 rounded">Export DOCX</button>
            </div>
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
                                <td className='border border-b-2'>{medicine.status}</td>
                                <td className='border border-b-2'>{new Date(medicine.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Sales;
