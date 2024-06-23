import React from 'react';
import useAxios from '../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import Headline from '../shared/Headline';
const DiscountProduct = () => {
    const axiosNormal = useAxios()
    const { data:product=[], isLoading, error } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            try {
                const { data } = await axiosNormal.get(`/product`);
                return data;
            } catch (error) {
                console.error('Error fetching medicines:', error);
                throw new Error('Failed to fetch medicines');
            }
        },
    });    
    const discountproduct = product.filter(products=>products.discountPercentage>0)
    console.log(discountproduct)
    if(!discountproduct){
        return (
            <div>
                <Headline title="See the medicines that have discount" description="Currently no discount avaiable"></Headline>
            
            </div>
        )
    }
    return (
        <div className='mt-10 max-w-[1440px] mx-auto'>
            <Headline title="See the medicines that have discount"></Headline>
            <div>
            <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={window.innerWidth > 768 ? 3 : 1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
          
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        loop={true}
      >
        {discountproduct.map((client, index) => (
          <SwiperSlide key={index}>
            <div className="card bg-base-100 shadow-xl my-10">
              <div className="card-body">
                <img className='w-[300px] h-[220px] mx-auto' src={client.imageUpload} alt="" />
                <h2 className="text-black text-2xl font-medium text-center">{client.itemName}</h2> 
                <h2 className="text-black text-xl font-medium text-center">Price: ${client.perUnitPrice}</h2> 
                <h2 className="text-black text-xl font-medium text-center">Discount Percentage: {client.discountPercentage}</h2> 
              </div>
            </div>
            
          </SwiperSlide>
        ))}
      </Swiper>
            </div>
    </div>
       
    );
};

export default DiscountProduct;