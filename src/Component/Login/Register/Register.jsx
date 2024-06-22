import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hook/UseAuth';
import Swal from 'sweetalert2';
import { FaGoogle } from 'react-icons/fa';
import useAxios from '../../../Hook/useAxios';
import { Helmet } from 'react-helmet-async';

const Register = () => {
    const {createUser,user,googleLogin,updateuserProfile} = UseAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const axiosNormal = useAxios()
    const from = location?.state || '/'
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handlesociallogin = (socialProvider) => {
      socialProvider()
      .then(result => {
          console.log(result.user)
          const userInfo ={
            email: result.user?.email,
            name: result.user?.displayName,
            photo: result.user?.photoURL,
            role: 'user'
          }
          axiosNormal.post('/user',userInfo)
          .then(res=>{
            console.log(res.data)
            navigate(from)
          })
      })
      .catch(error => {
          toast('Failed to login');
      });
  };
    const onSubmit = (data) =>{
        const {name,email,photo,password} = data
        console.log(name,email,photo,password)
        // e.preventDefault()
        // const form = e.target 
        // const name = form.name.value
        // const email = form.email.value
        // const password = form.password.value
        // const photo = form.photo.value
        if (name === '' || email === '' || password === '' || photo === '') {
           return toast("NO field can be empty")
        }
        if(!/[A-Z]/.test(password)){
            return toast("Password should have a uppercase letter")
          }
          if(!/[a-z]/.test(password)){
            return toast("Password should have a lowercase letter")
          }
          if(password.length <6){
            return toast("Password have to be 6 character")
          }
        const re = {name,email,password,photo,role:'user'}
        createUser(email,password)
        .then(()=>{
            updateuserProfile(name,photo).then(()=>{
              axiosNormal.post('/user',re)
              .then(res=>{
                if(res.data.insertedId){
                  Swal.fire({
                    title: "Success!",
                    text: "User created Successfully!",
                    icon: "success",
                  });
                }
                navigate(from);
              })
              
            })
          
          })
        .catch(error=>{
            toast(error.message)
        })
        console.log(user)
        
    }
    return (
        <div className='max-w-[1440px] mx-auto'>
          <Helmet><title>PharmaEase-Register</title></Helmet>
           <h2 className=' text-4xl font-bold text-center mt-20'>Register</h2>
           <div className='mx-auto w-1/2 mt-10'>
           <form onSubmit={handleSubmit(onSubmit)} >
           <input type="text" 
           placeholder="Enter name" 
           name='name' 
           className="mt-5 input input-bordered w-full" 
           {...register("name", { required: true })}
           />
           {errors.name && <span>This field is required</span>} 
           <input type="email" 
           placeholder="Enter email" 
           name='email' 
           className="mt-5 input input-bordered w-full" 
           {...register("email", { required: true })}
           />
           {errors.email && <span>This field is required</span>} 
           <input type="password" 
           placeholder="Enter password" 
           name ='password' 
           className="mt-5 input input-bordered w-full" 
           {...register("password", { required: true })}
           />
           {errors.password && <span>This field is required</span>} 
           <input type="text" 
           placeholder="Enter photoUrl" 
           name ='photo' 
           className="mt-5 input input-bordered w-full" 
           {...register("photo", { required: true })}
           />
           <p>Already have an account?<Link to='/login' className='text-blue underline text-blue-700'>Login</Link></p>
           <input type="Submit" defaultValue='Register' placeholder="Type here" className="cursor-pointer bg-red-600 text-white font-lexend font-bold mt-5 input w-full" />
           </form>
           </div>
           <div className='max-w-[300px] mx-auto mt-10'>
           <button 
          onClick={() => handlesociallogin(googleLogin)} 
          className='p-2 flex items-center justify-between gap-1 bg-red-600 w-[3/4] rounded-lg text-white font-semibold mb-4 text-[16px]'>
          <FaGoogle />Google Login</button>
           </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
