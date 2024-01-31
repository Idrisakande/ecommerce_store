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
import { verifyImageUrl } from "@/utils/verify_image_url";

interface GridCardProps {
  _id: string;
  name: string;
  desc: string;
  quantity: number;
  categoryId: {
    _id: string;
    name: string;
    children: [];
  };
  price: number;
  discount: number;
  images: string[];
  coverPhoto: string[];
  ratings: number;
  vendorId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  color: string[];
  size: string;
  condition: string;
  brand: string;
  metaData: string[];
  deliveryLocations: string[];
  isOutOfStock: boolean;
  ratedBy: number;
  createdAt: string;
  updatedAt: string;
  customId: string;
}

export const GridCard: FC<T_product_data> = (props) => {
  // cart context to manage cart
  const [item, setItem] = useState<T_cart_item_data>();
  const { cartData, handleAddToCart, handleAllUnitFromCart } = useContext(
    CartContext
  ) as T_cart_context;

  const toggleAddToCart = () => {
    if (item?.productId._id === props._id) {
      handleAllUnitFromCart(props._id);
      toast.info("Item removed successfuliy", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      handleAddToCart({ productId: props._id });
      toast.success("Item added successfuliy", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    if (cartData) {
      const item = cartData?.items?.find(
        (item) => item.productId._id === props._id
      ); //includes(_id);
      setItem(item);
    }
    return;
  }, [cartData, props._id]);

  // wishlist context to manage item(s) in wishlist
  const [itemInWishlist, setItemInWishlist] = useState<boolean>();
  const { wishlistData, handleAddToWishList, handleRemoveFromWishList } =
    (useContext(WishlistContext) as T_wishlist_context) || {};
  const toggleWishlist = async () => {
    if (itemInWishlist === true) {
      await handleRemoveFromWishList(props._id);
      toast.info("Item removed successfuliy", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      handleAddToWishList(props._id);
      toast.success("Item added successfuliy", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    if (wishlistData) {
      const isFound = wishlistData.productsId.includes(props._id);
      setItemInWishlist(isFound);
    }
    return;
  }, [wishlistData, props._id]);

  const { compareProducts } = useSelector((state: RootState) => state.products);
  // compare context to manage compare product

  // compareProducts,
  const compare = useContext(CompareContext) as T_compare_context;
  const itemIncomparelist = useMemo(() => {
    const isProductInCompareList = compareProducts?.some(
      (product) => product._id === props._id
    );
    return isProductInCompareList;
  }, [compareProducts, props._id]);

  // State variables to track hover state
  const [isSectionHovered, setIsSectionHovered] = useState<boolean>(false);
  // const [isButtonHovered, setIsButtonHovered] = useState(false);
  // const [isButtonAddToCartHovered, setIsButtonAddToCartHovered] = useState(false);

  const router = useRouter();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const discountPrice = useMemo(() => {
    if (props.discount > 0 && props.discount !== undefined) {
      const disctPrice = props.price - (props.discount / 100) * props.price;
      return disctPrice.toFixed(2) as unknown as number;
    }
    return props.price.toFixed(2) as unknown as number;
  }, [props.price, props.discount]);
  const roundUpDiscount = useMemo(() => {
    if (props.discount > 0 && props.discount !== undefined) {
      const roundUpDisct = props.discount.toFixed(1) as unknown as number;

      return roundUpDisct;
    }
    return;
  }, [props.discount]);
  const priceFixed = props.price.toFixed(2) as unknown as number;

  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <section
      onClick={() => router.replace(`/product/${props._id}`)}
      className="flex justify-end items-start p-8 hover:cursor-pointer hover:bg-gray-100 hover:shadow-md transition duration-300 rounded-lg bg-[#FBFBFB]"
    >
      <div className="flex max-w-[77%] w-full justify-start items-start gap-4">
        <div className="flex justify-center items-center">
          {props.images ? (
            <div className="w-[4.5rem] h-[4.5rem] md:w-[6rem] md:h-[6rem] relative flex justify-center items-center">
              <Image
                src={verifyImageUrl(props.images[0])}
                alt={`${name} image`}
                fill
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="w-[4.5rem] h-[4.5rem] md:w-[6rem] md:h-[6rem] relative flex justify-center items-center">
              <Image src={images.product2} alt={`${name} image`} fill />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="tracking-tight text-gray-900 truncate text-[0.75rem] w-full md:text-[0.88rem] font-semibold">
            {props.name}
          </p>
          <div className="flex gap-4 justify-start w-full items-center text-sm mt-3">
            <span className="font-semibold text-[0.75rem] md:text-[0.82rem] text-[#1C1C1C]">{`#${discountPrice}`}</span>
            <span className="line-through text-[#9B9999] text-[0.75rem] md:text-[0.82rem] font-semibold">{`#${priceFixed}`}</span>
          </div>
          <div className="flex justify-start items-center mt-1 gap-1 ">
            {Array(5)
              .fill("_")
              .map((star, index) => (
                <div
                  className={`${
                    index < props.ratings ? "text-[#FF9E3A]" : "text-slate-400"
                  }  text-sm md:text-xs`}
                  key={index}
                >
                  {index < props.ratings ? (
                    index === Math.floor(props.ratings) &&
                    props.ratings % 1 !== 0 ? (
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
          <div className="w-full flex">
            <p className="tracking-tight mt-3 text-gray-900 text-[0.75rem] md:text-[0.88rem]">
              {showFullDescription ? (
                <>{props.desc}</>
              ) : (
                <>{`${props.desc.slice(0, 140)}...`}</>
              )}
              {props.desc.length > 100 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullDescription((prev) => !prev);
                  }}
                  className=" text-sm ml-2 cursor-pointer text-orange-400 z-40"
                >
                  {showFullDescription ? "Read less" : "Read more"}
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[23%] w-full justify-end items-center">
        <div className={`flex flex-col gap-1 justify-end items-end `}>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click event from propagating
              toggleAddToCart();
            }}
            className="flex justify-end items-center group rounded-sm hover:bg-afruna-blue transition-opacity duration-500"
          >
            <span className="font-medium pl-2 text-[0.65rem] md:text-xs opacity-0 w-full group-hover:opacity-100 group-hover:text-white transition duration-500">
              {item?.productId._id === props._id
                ? "Remove from Cart"
                : "Add to Cart"}
            </span>
            <MdOutlineShoppingCart
              size={28}
              className={`p-1 text-white bg-afruna-blue 
            `}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist();
            }}
            className="flex justify-end items-center group rounded-sm hover:bg-afruna-blue transition-opacity duration-500"
          >
            <span className="font-medium pl-2 text-[0.65rem] md:text-xs opacity-0 w-full group-hover:opacity-100 group-hover:text-white transition duration-500">
              {itemInWishlist === true
                ? "Remove from Wish list"
                : "Add to Wish list"}
            </span>
            <BsHeartFill
              size={27}
              className={`p-1 text-white bg-afruna-blue `}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              compare.handleCompareProducts(props);
              // handleclick(_id)
            }}
            className="flex justify-end items-center group rounded-sm hover:bg-afruna-blue transition-opacity duration-500"
          >
            <span className="font-medium pl-2 text-[0.65rem] md:text-xs opacity-0 w-full group-hover:opacity-100 group-hover:text-white transition duration-500">
              {itemIncomparelist
                ? "Uncompare this product"
                : "Compare this product"}
            </span>
            <FaArrowsRotate
              size={26}
              className={`p-1 text-white bg-afruna-blue `}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
