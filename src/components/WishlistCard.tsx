import WishlistActions from "@/services/wishlist.services";
import { T_product_data } from "@/types/products";
import Image from "next/image";
import { FC, useContext, useMemo } from "react";
import { Button } from "./widgets/Button";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { WishlistContext } from "@/contexts/WishlistContextProvider";
import { T_wishlist_context } from "@/types/wishlist";
import { useRouter } from "next/router";
import { verifyImageUrl } from "@/utils/verify_image_url";

interface WishlistCardProps {
  item: T_product_data;
}

export const WishlistCard: FC<WishlistCardProps> = ({ item }) => {
  const router = useRouter();

  const discountPrice = useMemo(() => {
    if (item.discount > 0 && item.discount !== undefined) {
      // const roundUpDiscount = discount.toFixed(2) as unknown as number;
      const disctPrice = item.price - (item.discount / 100) * item.price;
      return disctPrice.toFixed(2) as unknown as number;
    }
    return item.price.toFixed(2) as unknown as number;
  }, [item.price, item.discount]);
  const price = item.price.toFixed(2) as unknown as number;

  const { handleRemoveFromWishList } =
    (useContext(WishlistContext) as T_wishlist_context) || {};
  return (
    <div className="border w-full rounded-md border-[#D5D5E6] px-2 sm:px-5 py-4 lg:min-w-full flex flex-col justify-start items-start gap-4 md:gap-1 md:flex-row">
      <div className="flex justify-start  md:min-w-[63%] items-start gap-3 w-full">
        <div className="w-[5rem] overflow-hidden h-[5rem] md:w-[5.5rem] md:h-[5.5rem] relative rounded-md p-2 flex justify-center items-center">
          <Image src={verifyImageUrl(item.images[0])} alt="wishlist-img" priority fill />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="tracking-tight  md:max-w-[98%] leading-4 font-medium text-sm sm:text-[0.9rem] md:text-base sm:font-semibold text-[#1C1C1C]">
            {item.name}
          </h1>
          <div className="flex justify-start flex-wrap gap-1 mt-2 text-[0.78rem] md:text-[0.82rem] w-full font-medium items-center text-slate-500">
            {item.size && (
              <span className="tracking-tight leading-3 w-fit">
                Size: large,
              </span>
            )}
            {item.color && (
              <span className="tracking-tight leading-3 w-fit">
                Color: blue,
              </span>
            )}
            {item.color && (
              <span className="tracking-tight leading-3 w-fit">
                Material: plastic
              </span>
            )}
          </div>
          <p className="text-sm font-semibold">#{discountPrice}</p>
          <div className="flex justify-start items-center gap-8">
            <span className="text-sm text-slate-300 line-through">
              #{price}
            </span>
            {item.discount > 0 && (
              <span className="text-xs p-[2px] bg-orange-200 text-orange-400">
                {item.discount}%
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex justify-start md:justify-end md:items-end w-full gap-4 px-3 mt-4 items-center md:flex-col md:gap-6
    `}
      >
        {/*  */}
        <div>
          <Button
            type="button"
            onClick={() => {
              item.isOutOfStock ? '': router.push(`/product/${item._id}`)
            }}
            className={`rounded-lg ${
              item.isOutOfStock
                ? "bg-gradient-outofstock cursor-default"
                : `text-white bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500`
            } `}
          >
            {item.isOutOfStock ? "Out of stock" : "Buy now"}
          </Button>
        </div>
        <div>
          <Button
            onClick={() => handleRemoveFromWishList(item._id)}
            className="border-transparent rounded-md border  transition-all duration-300 hover:border-slate-400 "
          >
            <RiDeleteBin6Fill className="" size={18} />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};
