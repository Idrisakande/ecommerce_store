import { afrunaHypeContent } from "@/constants/data";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { T_product_data } from "@/types/products";
import { FC } from "react";
import { verifyImageUrl } from "@/utils/verify_image_url";

function SampleNextArrow(props: { onClick: () => void }) {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="relative">
      <button className="w-[2.3rem] h-[2.3rem] shadow-lg rounded-full flex justify-center items-center transition duration-500 bg-white absolute top[70%] -right-7">
        <MdNavigateNext size={25} />
      </button>
    </div>
  );
}

function SamplePrevArrow(props: { onClick: () => void }) {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="relative">
      <button className="w-[2.3rem] h-[2.3rem] shadow-lg rounded-full flex justify-center items-center transition duration-500 bg-white absolute top[0%] -left-8 z-10 ">
        <MdNavigateBefore size={25} />
      </button>
    </div>
  );
}

// const SamplePrevArrow = (props: { className: string; style: any }) => {
//   const { className, style } = props;
//   return (
//     <div
//       className="text-black bg-white"
//       style={{ ...style, display: "block" }}
//       //   onClick={onClick}
//     />
//   );
// };

export const AfrunaHypeItems: FC<{
  memoizedHypeProducts: T_product_data[];
}> = ({ memoizedHypeProducts }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6.5,
    slidesToScroll: 2,
    nextArrow: (
      <SampleNextArrow
        onClick={() => {
          // console.log("");
        }}
      />
    ),
    prevArrow: (
      <SamplePrevArrow
        onClick={() => {
          // console.log("");
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
    ],
  };
  // const settings = {
  //   className: "center",
  //   infinite: true,
  //   // centerPadding: "60px",
  //   slidesToShow: 6.5,
  //   swipeToSlide: true,
  //   // afterChange: function (index: number) {
  //   //   // console.log(
  //   //     `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
  //   //   );
  //   // },
  //   nextArrow: <SampleNextArrow className={""} style={""} />,
  //   prevArrow: <SamplePrevArrow className={""} style={""} />,
  // };
  return (
    <>
      <section className="relative">
        <div className="flex gap-3 justify-around items-center">
          {/* <Slider {...settings}> */}
          {memoizedHypeProducts &&
            memoizedHypeProducts.slice(0, 6).map((item) => (
              // <div className="boxs" key={id}>
              <div
                key={item._id}
                className=" bg-[#FBFBFB] pb-4 pt-4 flex flex-col justify-center text-center items-center rounded-md hover:shadow-lg hover:bg-pink-50 transition duration-300"
              >
                <div className="flex justify-center items-center">
                  <div className="mx-auto w-[6.5rem] h-[6.5rem] rounded-md overflow-hidden relative ">
                    <Image
                      src={verifyImageUrl(item.images[0])}
                      alt={`${item.name} image`}
                      fill
                    />
                  </div>
                </div>
                <p className="text-xs font-semibold mt-1 px-4 truncate w-full">{item.name}</p>
              </div>
            ))}
          {/* </Slider> */}
        </div>
      </section>
    </>
  );
};
