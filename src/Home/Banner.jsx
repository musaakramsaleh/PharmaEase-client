import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import logo from "../../public/logo.png"
import 'swiper/css';
import 'swiper/css/pagination';


import { Pagination } from 'swiper/modules';
const Banner = () => {
    const green = 'green'
    return (
        <div>
        <Swiper pagination={true} loop={true} modules={[Pagination]} className="text-center ">
        <SwiperSlide><div className={`bg-${green}-300 h-[400px] mx-auto flex p-[50px] items-center justify-center rounded-lg`}>
              <div>
                <img src={logo} alt="" />
              </div>
              <h2 className='text-white font-bold text-4xl'>This is dummy text</h2>
              <div>

              </div>
            </div></SwiperSlide>
            <SwiperSlide><div className={`bg-${green}-300 h-[400px] mx-auto flex p-[50px] items-center justify-center rounded-lg`}>
              <div>
                <img src={logo} alt="" />
              </div>
              <h2 className='text-white font-bold text-4xl'>This is dummy text</h2>
              <div>

              </div>
            </div></SwiperSlide>
            <SwiperSlide><div className={`bg-${green}-300 h-[400px] mx-auto flex p-[50px] items-center justify-center rounded-lg`}>
              <div>
                <img src={logo} alt="" />
              </div>
              <h2 className='text-white font-bold text-4xl'>This is dummy text</h2>
              <div>

              </div>
            </div></SwiperSlide>
      </Swiper>
        </div>
    );
};

export default Banner;