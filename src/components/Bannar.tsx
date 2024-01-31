import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { bannarContent } from "@/constants/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Bannar = () => {
  //   const [currentSlide, setCurrentSlide] = useState(0);
  //   const slideLenght = bannarContent.length;
  //   useEffect(() => {
  //     setCurrentSlide(currentSlide === slideLenght - 1 ? 0 : currentSlide + 1);
  //   }, []);

  const settings = {
    customPaging: function (i: number) {
      return (
        <>
          {bannarContent.map((item, index) => (
            <button
              key={index}
              className={` ${i === index ? "bg-pink-600" : ""}
               w-[1rem] h-[1rem] bg-pink-900`}
            ></button>
          ))}
        </>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
  };
  return (
    <div>
      <Slider {...settings}>
        {bannarContent.map(({ title, category, buttonColor, divStyle }) => {
          return (
            <div
              key={title}
              className={`min-h-[14rem] sm:min-h-[15.5rem] md:min-h-[22rem] h-full flex flex-col items-center justify-center px-3 md:pl-10 rounded-md w-full ${divStyle}`}
            >
              <h4 className="text-sm sm:text-lg md:text-xl mt-10 md:mt-28 font-semibold">
                {title}
              </h4>
              <h1 className="max-w-[14rem] text-lg sm:text-2xl md:text-3xl font-extrabold">
                {category}
              </h1>
              <button
                className={`mt-2 text-sm md:text-base py-2 md:py-3 px-4 md:px-5 rounded-md ${buttonColor}`}
              >
                Shop Now!
              </button>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
