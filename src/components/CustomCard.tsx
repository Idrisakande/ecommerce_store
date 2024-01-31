"use-client";

import Image from "next/image";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BsHeartFill, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaArrowsRotate } from "react-icons/fa6";
import { useRouter } from "next/router";
// import { motion } from "framer-motion";
import images from "@/constants/images";
import { useSelector } from "react-redux";
import CartActions from "@/services/cart.services";
import axios, { AxiosError } from "axios";
import { handleErrors } from "@/utils/errors.util";
import store from "@/redux/store";
import { T_wishlist_context, T_wishlist_data } from "@/types/wishlist";
import {
  T_cart_context,
  T_cart_data,
  T_cart_item_data,
} from "@/types/cart.type";
import { updateCartData } from "@/redux/features/cart.slice";
import { T_compare_context, T_product_data } from "@/types/products";
import ProductsActions from "@/services/products.services";
import { RootState } from "@/types/store.type";
import { CompareContext } from "@/contexts/CompareContextProvider";
import { WishlistContext } from "@/contexts/WishlistContextProvider";
import { CartContext } from "@/contexts/CartContextProvider";
import { toast } from "react-toastify";
import { ItrendingItems } from "@/interfaces/data.interface";

interface CustomCardProps {
  items: ItrendingItems
}

export const CustomCard: FC<CustomCardProps> = ({
    items 
}) => {
    const {id, img, price, discount, rate, title} = items
  
  // State variables to track hover state
  const [isSectionHovered, setIsSectionHovered] = useState<boolean>(false);
  // const [isButtonHovered, setIsButtonHovered] = useState(false);
  // const [isButtonAddToCartHovered, setIsButtonAddToCartHovered] = useState(false);

  const router = useRouter();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const discountPrice = useMemo(() => {
    if (discount && discount > 0 && discount !== undefined) {
      const disctPrice = price - (discount / 100) * price;
      return disctPrice.toFixed(2) as unknown as number;
    }
    return price.toFixed(2) as unknown as number;
  }, [price, discount]);
  const roundUpDiscount = useMemo(() => {
    if (discount && discount > 0 && discount !== undefined) {
      const roundUpDisct = discount.toFixed(1) as unknown as number;

      return roundUpDisct;
    }
    return;
  }, [discount]);
  const priceFixed = price.toFixed(2) as unknown as number;

  return (
    <section
      onClick={() => router.replace(`/product/${id}`)}
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="relative pt-7 md:pt-9 pb-7 md:pb-10 max-w-[9.55rem] md:max-w-[13.3rem] hover:cursor-pointer hover:bg-gray-100 hover:shadow-md transition duration-300 rounded-lg w-full flex flex-col gap-2 md:gap-3 justify-center items-center text-center overflow-hidden bg-[#FBFBFB]"
    >
      {discount && discount > 0 && (
        <div className="absolute w-[3rem] md:w-[3rem] h-[1.35rem] md:h-[1.5rem] text-[0.67rem] md:text-xs text-white bg-[#FE3B20] flex justify-center items-center top-0 right-0">
          {`-${roundUpDiscount}%`}
        </div>
      )}
      <div
        className={`absolute z-10 top-10 left-[0.35rem] md:left-[0.65rem] transition duration-500" flex-col w-fit gap-2  ${
          isSectionHovered
            ? "block translate-x-0 transition duration-500"
            : "block transform -translate-x-[6rem]"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click event from propagating
          }}
          // onMouseEnter={() => setIsButtonHovered(true)}
          // onMouseLeave={() => setIsButtonHovered(false)}
          className="flex justify-between items-center group rounded-sm hover:pr-1 w-fit hover:bg-afruna-blue transition-opacity duration-500"
        >
          <MdOutlineShoppingCart
            size={28}
            className={`p-1  text-white bg-afruna-blue 
            ${isSectionHovered ? "block" : "hidden"} 
            `}
          />
          <span className="font-medium text-[0.65rem] md:text-xs opacity-0 w-full group-hover:opacity-100 group-hover:text-white transition duration-500">
            {"Add to Cart"}
          </span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex justify-between items-center group rounded-sm hover:pr-1 w-fit hover:bg-afruna-blue transition-opacity duration-500"
        >
          <BsHeartFill
            size={27}
            className={`p-1 text-white bg-afruna-blue ${
              isSectionHovered ? "block" : "hidden"
            }`}
          />
          <span className="font-medium text-[0.65rem] md:text-xs opacity-0 w-full group-hover:opacity-100 group-hover:text-white transition duration-500">
            { "Add to Wish list"}
          </span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // handleclick(_id)
          }}
          className="flex justify-between items-center group rounded-sm hover:pr-1 w-fit hover:bg-afruna-blue transition-opacity duration-500"
        >
          <FaArrowsRotate
            size={26}
            className={`p-1 text-white bg-afruna-blue ${
              isSectionHovered ? "block" : "hidden"
            }`}
          />
          <span className="font-medium text-[0.65rem] md:text-xs opacity-0 w-full group-hover:opacity-100 group-hover:text-white transition duration-500">
            { "Compare this product"}
          </span>
        </button>
      </div>
      
        <div className="mx-auto w-[4.5rem] h-[4.5rem] md:w-[6rem] md:h-[6rem] relative flex justify-center items-center">
          <Image src={images.product2} alt={`${name} image`} fill />
        </div>
      <p className="tracking-tight text-gray-900 truncate text-[0.75rem] w-full px-12 md:text-[0.88rem] font-semibold">
        {title}
      </p>
      <div className="flex justify-center items-center gap-2 mx-auto ">
        {Array(5)
          .fill("_")
          .map((star, index) => (
            <div
              className={`${
                index < rate ? "text-[#FF9E3A]" : "text-slate-400"
              }  text-sm md:text-xs`}
              key={index}
            >
              {index < rate ? (
                index === Math.floor(rate) && rate % 1 !== 0 ? (
                  <BsStarHalf />
                ) : (
                  <BsStarFill />
                )
              ) : (
                <BsStar />
              )}
            </div>
          ))}
      </div>
      <div className="flex px-4 md:px-8 justify-between w-full items-center text-sm">
        <span className="font-semibold text-[0.75rem] md:text-[0.82rem] text-[#1C1C1C]">{`$${discountPrice}`}</span>
        <span className="line-through text-[#9B9999] text-[0.75rem] md:text-[0.82rem] font-semibold">{`$${priceFixed}`}</span>
      </div>
    </section>
  );
};
