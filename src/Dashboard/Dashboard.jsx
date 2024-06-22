import React from 'react';
import logo from '../../public/logo.png';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaCalculator, FaProductHunt, FaSalesforce, FaUser } from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import UseAuth from '../Hook/UseAuth';
import UseAdmin from '../Hook/UseAdmin';
import UseSeller from '../Hook/UseSeller';  // Assuming you have this hook
import { FaAdversal } from 'react-icons/fa6';

const Dashboard = () => {
    const { user } = UseAuth();
    const [isAdmin] = UseAdmin();
    const [isSeller] = UseSeller();  // Assuming you have a hook to check seller status
    console.log(isAdmin);
    console.log(isSeller);
    
    return (
        <div className='flex min-h-screen'>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden m-4">Open dashboard</label>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 font-bold text-xl w-80 min-h-full bg-gradient-to-b from-cyan-500 to-blue-500 text-base-content">
                        {/* Sidebar content here */}
                        <div className='flex items-center justify-center text-2xl mb-4'>
                            <Link to='/'><p className='text-white'>PharmaEase</p></Link>
                            <Link to='/'><img className='w-10 h-10' src={logo} alt="Logo" /></Link>
                        </div>
                        
                        {/* Admin Routes */}
                        {user && isAdmin && (
                            <>
                                <li>
                                    <NavLink to='/dashboard/admin' className='text-white'>
                                        Admin Stats <GiMedicines />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/user' className='text-white'>
                                        All Users <FaUser />
                                    </NavLink>
                                </li>
                                {/* Seller Routes for Admins */}
                                <li>
                                    <NavLink to='/dashboard/sales' className='text-white'>
                                        Sales <FaSalesforce />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/payment' className='text-white'>
                                        Payment Details <FaProductHunt />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manage' className='text-white'>
                                        Manage Category <FaCalculator />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/bannermanage' className='text-white'>
                                        Banner Advertise <FaAdversal />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/adminbanner' className='text-white'>
                                        Banner Advertise<FaAdversal />
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Seller Routes */}
                        {user && isSeller && !isAdmin && (
                            <>
                                 <li>
                                    <NavLink to='/dashboard/sellerdashboard' className='text-white'>
                                        Seller Home <GiMedicines />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/sales' className='text-white'>
                                        Sales <FaSalesforce />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/payment' className='text-white'>
                                        Payment Details <FaProductHunt />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/seller' className='text-white'>
                                        My Medicines <FaProductHunt />
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* User Routes */}
                        {user && !isAdmin && !isSeller && (
                            <li>
                                <NavLink to='/dashboard/userpayment' className='text-white'>
                                    User Home <FaUser />
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
