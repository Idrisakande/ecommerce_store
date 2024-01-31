import { bannarContent } from "@/constants/data";
import React, { Component, ReactElement, ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IComponentProps {}

interface IComponentState {
  currentSlideIndex: number | null;
}

export default class HomeBannar extends Component<
  IComponentProps,
  IComponentState
> {
  constructor(props: IComponentProps) {
    super(props);
    this.state = {
      currentSlideIndex: 0,
    };
  }
  render() {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      swipeToSlide: true,
      autoplay: true,
      speed: 1500,
      autoplaySpeed: 1300,
      appendDots: (dots: ReactNode) => (
        <div
          className="w-[2.5rem] -mt-10 h-2 rounded-xl bg-[#ddd]"
          // style={{
          //   backgroundColor: "#ddd",
          //   borderRadius: "10px",
          //   padding: "10px"
          // }}
        >
          <ul className="my-16">
            {(dots as Array<ReactElement>).map((dot, idx) => (
              <li
                style={{ width: 20, height: 4 }}
                key={idx}
                className={`rounded-md ${
                  this.state.currentSlideIndex === idx
                    ? "bg-afruna-blue/90"
                    : "bg-afruna-gray/40"
                }`}
              />
            ))}
          </ul>
        </div>
      ),
    };
    return (
      <Slider
        {...settings}
        beforeChange={(idx) => this.setState({ currentSlideIndex: idx })}
        className=" w-full flex-1 h-full sm: md:max-w-[74%] lg:max-w-[70%]"
      >
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
    );
  }
}
