import React from 'react';
import Headline from '../shared/Headline';
import johnson from '../../public/Johnson.png'
import Pfyzer from '../../public/Pfizer.jpeg'
import Moderna from '../../public/Moderna.jpeg'
import Bayer from '../../public/Bayer.png'

const Partner = () => {
    return (
        <div>
           <Headline title="Our Partners"></Headline>
           <div className='max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-3 mt-5 place-items-center mb-14'>
           <div>
            <img src={johnson} alt="" />
            <p className='text-center text-2xl font-bold'>Johnson and Johnson</p>
           </div>
           <div>
            <img src={Pfyzer} alt="" />
            <p className='text-center text-2xl font-bold'>Pfizer</p>
           </div>
           <div>
            <img src={Moderna} alt="" />
            <p className='text-center text-2xl font-bold'>Moderna</p>
           </div>
           <div>
            <img src={Bayer} alt="" />
            <p className='text-center text-2xl font-bold'>Johnson and Johnson</p>
           </div>
           </div>
        </div>
    );
};

export default Partner;