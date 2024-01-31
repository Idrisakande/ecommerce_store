/* eslint-disable react-hooks/exhaustive-deps */
import { T_product_data } from "@/types/products";
import { RootState } from "@/types/store.type";
import { verifyImageUrl } from "@/utils/verify_image_url";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";

interface SliderDetailsProps {
  oneProduct: T_product_data
}

export const SliderDetails: FC<SliderDetailsProps> = ({oneProduct}) => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideImgLength = oneProduct?.images.length;

  const autoShow = true;
  let showInterval: string | number | NodeJS.Timeout | undefined;
  let intervalTime = 7000;

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === slideImgLength - 1 ? currentSlide : currentSlide + 1
    );
    // setCurrentSlide(currentSlide === slideImgLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? currentSlide : currentSlide - 1);
    // setCurrentSlide(currentSlide === 0 ? slideImgLength - 1 : currentSlide - 1);
  };

  const autoshow = () => {
    setCurrentSlide(currentSlide === slideImgLength - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoShow) {
      const auto = () => {
        showInterval = setInterval(autoshow, intervalTime);
      };
      auto();
    }
    return () => clearInterval(showInterval);
  }, [currentSlide, showInterval, autoshow]);

  return (
    <div className="flex flex-col gap-4 max-w-[22rem] w-full md:max-w-full ">
      <div className="h-[19rem] md:h-[18rem] lg:h-[20rem] rounded-md shadow-md flex justify-center items-center bg-white relative overflow-hidden">
        <button
          className={`${
            currentSlide === 0
              ? "bg-gray-300 shadow-md text-white border-transparent"
              : "border-yellow-500 hover:bg-white"
          } border z-10 w-[1.8rem] h-[1.8rem] bg-transparent duration-300 transition-all flex justify-center items-center rounded-full cursor-pointer absolute top-[50%] transform -translate-y-2/4 left-3`}
        >
          <MdKeyboardArrowLeft
            size={20}
            onClick={prevSlide}
            //transform -translate-y-2/4  transform: translateY(-50%);
          />
        </button>
        <button
          className={`${
            currentSlide === slideImgLength - 1
              ? "bg-gray-300 shadow-md text-white border-transparent"
              : "border-yellow-500  hover:bg-white"
          } border z-10 w-[1.8rem] h-[1.8rem] bg-transparent duration-300 transition-all flex justify-center items-center rounded-full cursor-pointer absolute top-[50%] transform -translate-y-2/4 right-3`}
        >
          <MdKeyboardArrowRight size={20} onClick={nextSlide} />
        </button>
        {oneProduct && oneProduct.images.map((img, index) => (
          <div
            key={index}
            className={`duration-700 transition-all ${
              index === currentSlide
                ? " flex justify-center items-center opacity-100"
                : "opacity-0"
            }`}
          >
            {index === currentSlide && (
              <div className="w-[16rem] h-[16rem] rounded-md md:w-[11.5rem] md:h-[11.5rem] lg:w-[16rem] lg:h-[16rem] relative overflow-hidden flex justify-center items-center">
                <Image
                  src={verifyImageUrl(img)}
                  alt={`details-img-${index}`}
                  key={index}
                  fill
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* small images */}
      <div className="flex gap-3 justify-center items-center w-full">
        {oneProduct && oneProduct.images.map((slide, index) => {
          return (
            <button
              onClick={() => setCurrentSlide(index)}
              key={index}
              className={`${
                index === currentSlide
                  ? "border-orange-400 border-opacity-100"
                  : "border-opacity-0"
              } border transition-all duration-500 rounded-md overflow-hidden flex justify-center items-center`}
            >
              <div className="w-[3rem] h-[3rem] relative overflow-hidden flex justify-center items-center">
                <Image src={verifyImageUrl(slide)} alt="details-img" key={index} fill />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
