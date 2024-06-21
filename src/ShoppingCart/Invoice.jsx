import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import UseAuth from '../Hook/UseAuth';
import logo from '../../public/logo.png';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../Hook/UseAxiosSecure';
import useAxios from '../Hook/useAxios';

const Invoice = () => {
  const { user } = UseAuth();
  const componentRef = useRef();
  const location = useLocation();
  const axiosSecure = UseAxiosSecure();
  const axiosNormal = useAxios()
  const transactionId = location.state.transactionId;
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Invoice',
  });

  const { data: payment = [], isLoading } = useQuery({
    queryKey: ['payment', transactionId],
    queryFn: async () => {
      const response = await axiosNormal.get(`/payments/${transactionId}`);
      return response.data;
    },
  });
  console.log(payment[0]?.items)
  const items = payment[0]?.items || [];
  const total = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="p-4">
      <div ref={componentRef} className="invoice max-w-[600px] mx-auto p-4 bg-white shadow-md rounded-md">
        <div className="flex items-center justify-center text-2xl mb-4">
          <p className="font-bold text-gray-800">PharmaEase</p>
          <img className="w-12 h-12 ml-2" src={logo} alt="Logo" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-4">Invoice</h1>
        <div className="mb-4">
          <p className="md:text-lg font-semibold">User: <span className="text-gray-600">{user?.displayName || 'Anonymous'}</span></p>
          <p className="md:text-lg font-semibold">Email: <span className="text-gray-600">{user?.email || 'anonymous'}</span></p>
          <p className="md:text-lg font-semibold">TransactionId: <span className="text-gray-600">{transactionId}</span></p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="md:w-full text-[10px] bg-gray-800 text-white">
                <th className="py-2 px-4">Medicine Name</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">Loading...</td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={index} className="text-center border-b">
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">${item.price.toFixed(2)}</td>
                    <td className="py-2 px-4">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))
              )}
              <tr className="text-center font-bold">
                <td colSpan="3" className="py-2 px-4">Total</td>
                <td className="py-2 px-4">${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Download Invoice as PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;
