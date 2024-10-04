// src/components/Slider.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';

const Slider = () => {
  return (
    <div className="mb-6">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-64 bg-blue-300 text-white rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold mb-2">Welcome to the Dashboard</h3>
            <p className="text-lg">Track your tasks and manage your team efficiently.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-64 bg-green-300 text-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">Slide 2</h3>
            <p>Your message or information goes here.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-64 bg-red-300 text-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">Slide 3</h3>
            <p>Your message or information goes here.</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
