import React from 'react';
import useCategory from '../Hook/useCategory';
import { Link } from 'react-router-dom';

const Category = () => {
    const {category,isLoading,refetch} = useCategory()
    console.log(category)
    return (
        <div className='max-w-[1440px] mx-auto grid grid-cols-3 gap-3 mt-5 place-items-center mb-14'>
        {category.map((categories, index) => (
            <div key={index} className="w-[300px] bg-base-100 border-solid border-2 shadow-xl p-3 ">
                <figure><img src={categories.image} className='w-[300px] h-[200px]' alt="Shoes" /></figure>
                <div className="">
                    <h2 className="card-title">{categories.category}</h2> 
                    <p>Quantity: {categories.quantity}</p> 
                    <div className="w-full">
                        <Link to={`/categories/${categories.category}`}><button className="btn bg-gradient-to-r from-cyan-500 to-blue-500 w-full text-white">See Details</button></Link>
                    </div>
                </div>
            </div>
        ))}
    </div>
    );
};

export default Category;