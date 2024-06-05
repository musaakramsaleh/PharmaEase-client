import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import logo from '../../public/logo.png'
const Navbar = () => {
    const navitems = <>
       <li><NavLink to='/' className={({isActive})=>isActive?'text-yellow-600 font-bold':'text-secondary'}>Home</NavLink></li>
       <li><NavLink to='/items' className={({isActive})=>isActive?'text-yellow-600 font-bold':'text-secondary'}>Shop</NavLink></li>
       <li><NavLink to='/haga' className={({isActive})=>isActive?'text-yellow-600 font-bold':'text-secondary'}>Shopping<FaShoppingCart></FaShoppingCart></NavLink></li>
       <li><NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold':'text-secondary'}>Languages</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {
            navitems
        }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl"><div className='flex items-center justify-around'><p>PharmaEase</p><img className='w-[50px]' src={logo} alt=""/> </div></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {
        navitems
      }
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
    );
};

export default Navbar;