import { FC } from "react";
import { Model } from "@/components/Model";
import { Button } from "@/components/widgets/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import images from "@/constants/images";
import { T_product_data } from "@/types/products";

interface AddToCartModelProps {
  isOpen: boolean;
  onClose: () => void;
  oneProduct: T_product_data;
}

export const AddToCartModel: FC<AddToCartModelProps> = ({
  isOpen,
  onClose,
  oneProduct,
}) => {
  const router = useRouter();
  // const image = productDetailsItems?.img;

  return (
    <Model
      isOpen={isOpen}
      onclose={onClose}
      rootClassName="sm:max-w-[80%] md:max-w-[65%]"
    >
      <div className="px-4 pb-6 sm:pb-10 lg:pb-20 w-full">
        <div className=" px-4 lg:px-24 flex flex-col w-full justify-center items-center gap-6">
          <div className="flex justify-center sm:mt-4 lg:mt-10 w-full items-center sm:justify-start">
            <h2 className="text-xl font-semibold md:text-4xl">Add To Cart</h2>
          </div>
          <div className="sm:mt-4 lg:mt-6 lg:w-full flex flex-col sm:flex-row gap-4 sm:justify-start lg:justify-center lg:items-center">
            <div className=" flex justify-center items-center">
              <div className="w-[6rem] h-[6rem] sm:w-[8rem] sm:h-[8rem] rounded-md mx-auto border border-slate-200 relative overflow-hidden flex justify-center items-center">
                <Image src={oneProduct?.images[0]} alt="cart-image" fill />
              </div>
            </div>
            <div className=" flex justify-center w-full items-center lg:items-start lg:justify-start">
              <p className="text-[#0C0E3B] w-full sm:text-lg lg:text-2xl sm:text-start lg:max-w-[80%]">
                {/* truncate */}
                {oneProduct?.name}
                {/* bnsdjkdsjkleoled lagdhh dgdt jsdhteu sdgeuijd hsdubka jsdhty */}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:mt-14 gap-3 sm:flex-row justify-center sm:w-full">
            <Button
              onClick={() => router.replace("/cart")}
              className="border border-[#FF9017] rounded-md text-[#0C0E3B]"
            >
              View Cart & Checkout
            </Button>
            <Button
              onClick={() => router.push("/")}
              primary
              className="rounded-md sm: py-3"
            >
              Continue shopping
            </Button>
          </div>
        </div>
      </div>
    </Model>
  );
};
