import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../public/logo.png'
import UseAuth from '../Hook/UseAuth';
import useCart from '../Hook/useCart';
const Navbar = () => {
  const {user,logout} = UseAuth()
const handleSignout =()=>{
 logout()
 .then()
 .catch()

}
    const [cart,refetch] = useCart() 
    const navitems = <>
       <li><NavLink to='/' className={({isActive})=>isActive?'text-white font-bold text-2xl':'text-black font-bold text-2xl'}>Home</NavLink></li>
       <li><NavLink to='/product' className={({isActive})=>isActive?'text-white font-bold text-2xl':'text-black font-bold text-2xl'}>Shop</NavLink></li>
       <li><NavLink to='/shopping' className={({isActive})=>isActive?'text-white font-bold text-2xl':'text-black font-bold text-2xl'}>Shopping<sup>{cart.length}</sup><FaShoppingCart></FaShoppingCart></NavLink></li>
       <div className="dropdown z-50">
                    <div tabIndex={0} className="btn btn-ghost ">
                        Languages
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box">
                        <li><Link to="/" className="text-black font-bold text-xl block">English</Link></li>
                        <li><Link to="/" className="text-black font-bold text-xl block">Spanish</Link></li>
                        {/* Add more language options as needed */}
                    </ul>
                </div>
    </>
    return (
        <div className="navbar bg-gradient-to-r from-cyan-500 to-blue-500">
  <div className="navbar-start">
    <div className="dropdown z-50">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden z-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {
            navitems
        }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl"><div className='flex items-center justify-around text-2xl'><p>PharmaEase</p><img className='w-[50px]' src={logo} alt=""/> </div></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {
        navitems
      }
    </ul>
  </div>
  <div className="navbar-end">
    {
     user? <div className='flex'>
      <div className='dropdown dropdown-end z-50'>
     <div
       tabIndex={0}
       role='button'
       className='btn btn-ghost btn-circle avatar'
     >
       <div className='w-10 rounded-full' title=''>
         <img
           referrerPolicy='no-referrer'
           alt='User Profile Photo'
           src={user.photoURL}
         />
       </div>
     </div>
     <ul
       tabIndex={0}
       className='menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52'
     >
       <li>
         <NavLink to='/dashboard'><div className='justify-between'>Dashboard</div></NavLink>
         <NavLink to='/updateprofile'><div className='justify-between'>Update profile</div></NavLink>
         <NavLink onClick={()=>handleSignout()} className='bg-secondary font-lexend px-5 py-3 rounded-lg font-bold text-white block text-center'>Logout</NavLink>
       </li>
     </ul>
   </div>
   {/* <button onClick={()=>handleSignout()} className='bg-secondary font-lexend px-5 py-3 rounded-lg font-bold text-white block text-center'></button> */}
     </div> :<>
  <Link to='/login'  className='bg-red-600 font-lexend px-5 py-3 rounded-lg font-bold text-white block text-center'>Join us</Link>
  </>
   
  
  }
  </div>
</div>
    );
};

export default Navbar;