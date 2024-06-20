import React from 'react';

const Headline = ({title,description}) => {
    return (
        <div className='mt-10'>
            <h2 className='text-2xl md:text-4xl font-bold text-center'>{title}</h2>
            <p className='text-xl font-semibold text-center mt-3'>{description}</p>
        </div>
    );
};

export default Headline;