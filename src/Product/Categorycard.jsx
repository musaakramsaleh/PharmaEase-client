import React from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
const Categorycard = ({cata}) => {
   const {category,image,quantity} = cata
   const navigate = useNavigate()
   const handleclick = ()=>{
    let currentQuery = {category: category}
    const url = queryString.stringifyUrl({
        url:'/product',
        query:currentQuery
    })
    navigate(url)
   }
    return (
        <div onClick={handleclick}>
            <div className='w-[200px] h-[200px] mt-5'><img className='w-full h-full mt-5'  src={image} alt="" />
            </div>
            <p>{category}</p>
             <p>Quantity: {quantity}</p>
        </div>
    );
};

export default Categorycard;