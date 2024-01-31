import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/widgets/Button";
import { ProductCard } from "@/components/ProductCard";
import axios, { AxiosError } from "axios";
import { T_product_data } from "@/types/products";
import Cookies from "js-cookie";
import { handleErrors } from "@/utils/errors.util";
import Image from "next/image";
import imags from "@/constants/images";
import { T_error_response } from "@/types/auth.type";
import useSelect from "@/hooks/useSelect";
import { useSelector } from "react-redux";
import { RootState } from "@/types/redux-store";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Scrollbar } from "swiper/modules";
interface SimilarProductsProps {
  oneProduct: T_product_data;
}

export const SimilarProducts: FC<SimilarProductsProps> = ({ oneProduct }) => {
  const { allProducts } = useSelector((state: RootState) => state.products);
  const { query } = useRouter();
  const filteredProducts = useMemo(
    () =>
      allProducts.filter(
        (product) =>
          product.categoryId?._id === oneProduct?.categoryId?._id &&
          product._id !== query as unknown as string
      ).slice(0,12),
    [allProducts, query]
  );

  if (filteredProducts && filteredProducts.length > 0) {
    return (
      <section className="md:mt-20 py-10 lg:pb-20 ">
        <div className="flex flex-col gap-6 max-w-[92%] sm:max-w-[85%] mx-auto">
          <div className="flex flex-col md:border-b border-[#EFEEED] md:flex-row gap-6 justify-between items-start md:items-end ">
            <div className="flex md:justify-start w-full items-center ">
              <Button
                yellowGray
                className="cursor-default md:px-7 font-extrabold"
              >
                Similar Products
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-[0.8rem] sm:gap-8 w-full">
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              freeMode={true}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 40,
                },
              }}
              pagination={{
                clickable: true,
              }}
              scrollbar={{ draggable: true }}
              modules={[FreeMode, Pagination, Scrollbar]}
              className="w-full"
            >
              {filteredProducts.map((product) => {
                // Project component
                return (
                  <SwiperSlide key={product._id}>
                    <ProductCard key={product._id} {...product} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    );
  }
  return;
};
