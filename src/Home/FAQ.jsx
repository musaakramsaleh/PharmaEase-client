import React from 'react';
import Headline from '../shared/Headline';

const FAQ = () => {
    return (
        <div className='max-w-[1440px] mx-auto my-10'>
            <Headline title="FAQs" description="All the frequently asked questiones"></Headline>
            <div className="collapse collapse-arrow bg-base-200 mt-5">
  <input type="radio" name="my-accordion-2" defaultChecked /> 
  <div className="collapse-title text-xl font-medium">
    Our policy
  </div>
  <div className="collapse-content"> 
    <p>Here we like to use our platform for buyers to buy and sellers to sell</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
    Why choose us 
  </div>
  <div className="collapse-content"> 
    <p>We provide medicines from a variety range at an exclusive price</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
    Our Goal
  </div>
  <div className="collapse-content"> 
    <p>Our goal is to make online medicine purchasing more convinient and user friendly</p>
  </div>
</div>
        </div>
    );
};

export default FAQ;