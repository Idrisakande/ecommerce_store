"use-client";

import Image from "next/image";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { BsHeartFill, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaArrowsRotate } from "react-icons/fa6";
import { useRouter } from "next/router";
import images from "@/constants/images";
import { useSelector } from "react-redux";
import { T_wishlist_context } from "@/types/wishlist";
import { T_cart_context, T_cart_item_data } from "@/types/cart.type";
import { T_compare_context, T_product_data } from "@/types/products";
import { RootState } from "@/types/store.type";
import { CompareContext } from "@/contexts/CompareContextProvider";
import { WishlistContext } from "@/contexts/WishlistContextProvider";
import { CartContext } from "@/contexts/CartContextProvider";
import { toast } from "react-toastify";
import { verifyImageUrl } from "@/utils/verify_image_url";

export const ProductCard: FC<T_product_data> = (props) => {
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
        (item) => item.productId?._id === props._id
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
  const { handleCompareProducts} = useContext(
    CompareContext
  ) as T_compare_context;
  const itemIncomparelist = useMemo(() => {
    const isProductInCompareList = compareProducts?.some(
      (product) => product._id === props._id
    );
    return isProductInCompareList;
  }, [compareProducts]);


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

  return (
    <section
      onClick={() => router.push(`/product/${props._id}`)}
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="relative pt-7 md:pt-9 pb-7 px-4 md:pb-10 max-w-[9.55rem] md:max-w-[13.3rem] hover:cursor-pointer hover:bg-gray-100 hover:shadow-md transition duration-300 rounded-lg w-full flex flex-col gap-2 md:gap-3 justify-center items-center text-center overflow-hidden bg-[#FBFBFB]"
    >
      {props.discount > 0 && (
        <div className="absolute w-[3rem] md:w-[3rem] h-[1.35rem] md:h-[1.5rem] text-[0.67rem] md:text-xs text-white bg-[#FE3B20] flex justify-center items-center top-0 right-0">
          {`-${roundUpDiscount}%`}
        </div>
      )}
      <div
        className={`block md:hidden bg-afruna-blue absolute z-10 top-6 left-[0.35rem] md:left-[0.65rem] transition duration-500" flex-col w-[1.75rem] gap-2  `}
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click event from propagating
            toggleAddToCart();
          }}
          className="flex justify-center items-center transition-opacity duration-500"
        >
          <MdOutlineShoppingCart
            size={28}
            className={`p-1 ${
              item?.productId._id === props._id
                ? "text-orange-200"
                : "text-white"
            }
            
            `}
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist();
          }}
          className="flex justify-center items-center transition-opacity duration-500"
        >
          <BsHeartFill
            size={27}
            className={`p-1  ${
              itemInWishlist === true ? "text-orange-200" : "text-white"
            }`}
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCompareProducts(props)
          }}
          className="flex justify-center items-center transition-opacity duration-500"
        >
          <FaArrowsRotate
            size={26}
            className={`p-1
            ${itemIncomparelist ? "text-orange-200" : "text-white"} `}
          />
        </button>
      </div>
      <div
        className={` hidden md:block absolute z-10 top-10 left-[0.35rem] md:left-[0.65rem] transition duration-500" flex-col w-fit gap-2  ${
          isSectionHovered
            ? "block translate-x-0 transition duration-500"
            : "block transform -translate-x-[6rem]"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click event from propagating
            toggleAddToCart();
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
            {item?.productId._id === props._id
              ? "Remove from Cart"
              : "Add to Cart"}
          </span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist();
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
            {itemInWishlist === true
              ? "Remove from Wish list"
              : "Add to Wish list"}
          </span>
        </button>
        <button
          onClick={(e) => {
            // e.stopPropagation();
            handleCompareProducts(props)
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
            {itemIncomparelist
              ? "Uncompare this product"
              : "Compare this product"}
          </span>
        </button>
      </div>
      <div className="mx-auto w-[4.5rem] h-[4.5rem] rounded-md overflow-hidden md:w-[6rem] md:h-[6rem] relative flex justify-center items-center">
        <Image
          src={verifyImageUrl(props.images[0])}
          alt={`${props.name} image`}
          fill
        />
      </div>

      <p className="tracking-tight text-gray-900 truncate text-[0.75rem] w-full md:px-2 md:text-[0.88rem] font-semibold">
        {props.name}
      </p>
      <div className="flex justify-center items-center gap-2 mx-auto ">
        {Array(5)
          .fill("_")
          .map((star, index) => (
            <div
              className={`${
                index < props.ratings ? "text-[#FF9E3A]" : "text-slate-400"
              }  text-xs md:text-xs`}
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
      <div className="flex md:px-4 gap-2 justify-between truncate w-full items-center text-sm">
        <span className="font-semibold text-[0.75rem] md:text-[0.82rem] text-[#1C1C1C]">
          &#x20A6;{`${discountPrice}`}
        </span>
        <span className="line-through text-[#9B9999] text-[0.75rem] md:text-[0.82rem] font-semibold">
          &#x20A6;{`${priceFixed}`}
        </span>
      </div>
    </section>
  );
};
