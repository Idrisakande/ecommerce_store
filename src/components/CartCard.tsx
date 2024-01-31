import { T_save_item_context } from "@/types/products";
import Image from "next/image";
import { FC, useContext, useEffect, useMemo } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  T_cart_context,
  T_cart_data,
  T_cart_item_data,
} from "@/types/cart.type";
import { BsHeart, BsHeartFill, BsPlus } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { handleErrors } from "@/utils/errors.util";
import { T_error_response } from "@/types/auth.type";
import { updateCartData } from "@/redux/features/cart.slice";
import store from "@/redux/store";
import { RootState } from "@/types/store.type";
import { useSelector } from "react-redux";
import { CartContext } from "@/contexts/CartContextProvider";
import { SaveItemContext } from "@/contexts/SaveContextProvider";
import { verifyImageUrl } from "@/utils/verify_image_url";

interface CartCardProps {
  item: T_cart_item_data;
}

export const CartCard: FC<CartCardProps> = ({ item }) => {
  const { saveItemsData } = useSelector((state: RootState) => state.products);
  const saveItemIds = saveItemsData && saveItemsData.map((item) => item._id);
  const inSaveItems = saveItemIds.includes(item.productId?._id);

  const { handleSaveItem } = useContext(SaveItemContext) as T_save_item_context;
  const {
    cartData,
    handleAddToCart,
    handleAllUnitFromCart,
    handleOneUnitFromCart,
  } = useContext(CartContext) as T_cart_context;

  useEffect(() => {
    getCartData();
  }, []);
  const getCartData = async () => {
    try {
      const { data } = await axios.get(`/api/carts`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      store.store.dispatch(updateCartData(data.data));
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  };
  // increase item quantity
  const increaseItemQuantity = () => {
    // if (productQuantity === item.quantity) return;
    handleAddToCart({ productId: item.productId._id });
  };

  // const oneCartItem = useMemo(() => {
  //   if (cartData && cartData.items) {
  //     const item = cartData.items.find(
  //       (item) => item.productId?._id === item.productId?._id
  //     );
  //     return item;
  //   }
  //   return null;
  // }, [cartData, cartData?.items, item.productId?._id]);
  // // console.log(oneCartItem);
  // const productQuantity = useMemo(() => {
  //   if (item && item.quantity >= 0) {
  //     const quantity = 0;
  //     if (
  //       oneCartItem &&
  //       oneCartItem !== undefined &&
  //       oneCartItem.quantity > 0
  //     ) {
  //       const itemquantity = quantity + oneCartItem.quantity;
  //       return itemquantity;
  //     }
  //     return quantity;
  //   }
  //   return 0;
  // }, [item, item.quantity, oneCartItem, oneCartItem?.quantity]);
  const itemTotalPrice = item.total.toFixed(2) as unknown as number;

  return (
    <div className="flex flex-col w-full shadow-md rounded-lg p-3">
      <div className="flex justify-between">
        <div className="flex justify-start items-start w-full gap-2 lg:max-w-[70%]">
          <div className="flex justify-center items-center">
            <div className="w-[6rem] h-[6rem] overflow-hidden relative rounded-md p-2 flex justify-center items-center">
              <Image
                src={verifyImageUrl(item.productId?.images[0])}
                alt="cart-img"
                priority
                fill
              />
            </div>
          </div>

          <div className="flex justify-start items-start flex-col w-full">
            <h1 className="tracking-tight sm:max-w-[63%] leading-4 font-medium text-sm sm:text-[0.9rem] md:text-base sm:font-semibold text-[#1C1C1C]">
              {item.productId?.name}
            </h1>
            <div className="flex justify-start flex-wrap gap-1 mt-2 text-[0.78rem] md:text-[0.82rem] w-full font-medium items-center text-slate-500">
              <span className="tracking-tight leading-3 w-fit">
                Size:
                {/* // {size}, */}
              </span>
              <span className="tracking-tight leading-3 w-fit">
                Color:
                {/* {color}, */}
              </span>
              <span className="tracking-tight leading-3 w-fit">
                Material:
                {/* {material} */}
              </span>
            </div>
            <p className="tracking-tight mt-1 text-[#7B848F] text-[0.78rem] md:text-[0.82rem]">
              Seller:{" "}
              {`${item.productId?.vendorId?.firstName} ${item.productId?.vendorId?.lastName}`}
            </p>
          </div>
        </div>

        <div className=" flex w-full flex-col justify-center items-end lg:max-w-[30%]">
          <span className="tracking-tight flex justify-end text-sm font-semibold">
            #{itemTotalPrice}
          </span>
          <div className="flex mt-1 w-full flex-col justify-end items-end">
            <p className="tracking-tight flex justify-end text-[0.9rem] font-semibold">
              Quantity:
            </p>
            <div className="flex justify-end items-center mt-1 gap-2">
              <button
                onClick={() => {
                  item.quantity >= 1
                    ? handleOneUnitFromCart(item.productId?._id)
                    : null;
                }}
                className="w-[1.5rem] hover:scale-95 transition duration-500 h-[1.3rem] bg-slate-200 text-white border border-afruna-blue flex justify-center items-center"
              >
                <FaMinus size={15} />
              </button>
              <button className="w-[1.5rem] h-[1.3rem] border border-[#FFC584] flex justify-center items-center text-[0.6rem]">
                {item.quantity}
                {/* {item.quantity} */}
              </button>
              <button
                onClick={increaseItemQuantity}
                className="w-[1.7rem] hover:scale-95 transition duration-500 text-white h-[1.4rem] bg-afruna-blue  border border-afruna-blue flex justify-center items-center"
              >
                <BsPlus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex sm:pl-[5.7rem] sm:-mt-4 md:mt-0 justify-center sm:justify-start items-center gap-1">
        <button
          onClick={() => handleSaveItem(item.productId?._id)}
          className="flex text-xs md:text-[0.82rem] hover:scale-95 transition duration-300 rounded-md border border-[#FFC584] text-[#FFC584] py-1 px-2 justify-center items-center tracking-tight"
        >
          {inSaveItems ? (
            <BsHeartFill className="mr-1 md:text-[1rem]" />
          ) : (
            <BsHeart className="mr-1 md:text-[1rem]" />
          )}
          {inSaveItems ? "Unsave the item" : "Save for later"}
        </button>
        <button
          onClick={() => handleAllUnitFromCart(item.productId?._id)}
          className="flex md:text-[0.82rem] hover:scale-95 transition duration-300 text-xs text-afruna-blue py-1 px-4 justify-center items-center tracking-tight"
        >
          <RiDeleteBin6Fill className="mr-1" size={18} />
          Remove
        </button>
      </div>
    </div>
  );
};
