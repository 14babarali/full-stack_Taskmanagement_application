import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TaskSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="mb-6">
      <Slider {...settings}>
        <div>
          <div className="flex flex-col items-center justify-center h-64 bg-blue-300 text-white rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold mb-2">Welcome to the Dashboard</h3>
            <p className="text-lg">Track your tasks and manage your team efficiently.</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center h-64 bg-green-300 text-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">Slide 2</h3>
            <p>Your message or information goes here.</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center h-64 bg-red-300 text-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">Slide 3</h3>
            <p>Your message or information goes here.</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default TaskSlider;
