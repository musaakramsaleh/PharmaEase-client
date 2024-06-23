import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import logo from "../../public/logo.png"
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import UseBanner from '../Hook/UseBanner';

const Banner = () => {
    const [banner] = UseBanner(); // Assuming UseBanner hook returns an array of banner objects
    const green = 'green'; // Example color variable
   const add = banner.filter(banners=>banners.status==='used')
   console.log(banner)
    return (
        <div className='max-w-[1440px] mx-auto mt-5'>
            <Swiper pagination={true} loop={true} modules={[Pagination]} className="text-center">
                {add.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className={`bg-blue-600 h-[400px] mx-auto flex p-[50px] items-center justify-center rounded-lg`}>
                            <div>
                                <img className='w-[300px] h-[200px]' src={item.imageUpload} alt="" />
                            </div>
                            <h2 className='text-white font-bold text-4xl'>{item.Description}</h2>
                            <div>{item.description}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
