import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/widgets/Button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import images from "@/constants/images";
import { useRouter } from "next/router";
import { NewsLetter } from "@/components/NewsLetter";
import Main from "@/layouts/main";
import { useContext, useEffect, useMemo } from "react";
import { T_cart_context } from "@/types/cart.type";
import { CartCard } from "@/components/CartCard";
import imags from "@/constants/images";
import { CartContext } from "@/contexts/CartContextProvider";
import { LoadingStateContext } from "@/contexts/LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { LoadingPage } from "@/components/LoadingPage";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";

export default function Index() {
  const router = useRouter();
  const opt = useContext(LoadingStateContext) as T_loading_provider;

  const { clearAllCartItems, getCartData } = useContext(
    CartContext
  ) as T_cart_context;

  useEffect(() => {
    getCartData();
  }, []);

  const { cart } = useSelector((state: RootState) => state.cart);
  const { allProducts } = useSelector((state: RootState) => state.products);
  const { saveItemsData } = useSelector((state: RootState) => state.products);
  const saveItemIds = saveItemsData && saveItemsData.map((item) => item._id);
  const saveItems =
    allProducts &&
    allProducts.filter((product) => saveItemIds.includes(product._id));

  const productIdsInCart =
    cart && cart.items?.map((item) => item.productId._id);
  const totalDiscount =
    allProducts &&
    (allProducts
      .filter((product) => productIdsInCart.includes(product._id))
      .reduce((sum, product) => sum + product.discount, 0)
      .toFixed(2) as unknown as number);
  const itemsQuantity = cart && cart.items ? cart.items.length : 0;
  // console.log(cart);
  const overallTotal = useMemo(() => {
    const total =
      cart &&
      (cart.items
        .reduce((total, item) => total + item.total, 0)
        .toFixed(2) as unknown as number);
    return total;
  }, [cart]);

  if (opt.isLoading) {
    return <LoadingPage />;
  }

  return (
    <Main>
      <main className="pt-10 px-4 bg-[#F2F5F7]">
        {/* {cart && ( */}
        <div className="sm:px-4 lg:px-24">
          <h1 className="font-bold text-base mt-1 sm:text-2xl">
            My cart({itemsQuantity})
          </h1>

          {cart && cart.items.length > 0 ? (
            <div className="flex flex-col mt-3 sm:mt-5 gap-y-8 gap-x-6 md:flex-row items-start w-full">
              {/* cart items */}
              <div className="w-full md:max-w-[70%] lg:max-w-[75%] bg-white rounded-xl">
                <ScrollArea.Root className="ScrollAreaRoot w-full h-[45vh] sm:h-[66vh] px-4 pt-3 bg-white overflow-auto rounded-xl">
                  <ScrollArea.Viewport className="ScrollAreaViewport h-full ">
                    <div className="bg-white rounded-lg p-3 flex flex-col gap-5 relative">
                      {/* Render wishlistProduct here */}
                      {cart.items.map((item) => {
                        return <CartCard key={item._id} item={item} />;
                      })}
                    </div>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar
                    className="ScrollAreaScrollbar p-[2px] rounded-xl mb-4 flex bg-slate-100 hover:bg-slate-200"
                    orientation="vertical"
                  >
                    <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Scrollbar
                    className="ScrollAreaScrollbar"
                    orientation="horizontal"
                  >
                    <ScrollArea.Thumb className="" />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Corner className="" />
                </ScrollArea.Root>

                <div className="flex gap-1 pr-6 mt-4 mb-6 justify-end items-center">
                  <Button
                    grayPurple
                    onClick={() => router.push("/product")}
                    className="rounded-md transition duration-300 hover:scale-95"
                  >
                    <FaArrowLeft size={15} />
                    Back to shop
                  </Button>
                  <Button
                    onClick={clearAllCartItems}
                    className="rounded-md text-[#232F3E] transition duration-300 hover:scale-95"
                  >
                    Remove all
                  </Button>
                </div>
              </div>
              {/* check out */}
              <div className="bg-[#F7FAFC] rounded-lg md:max-w-[30%] lg:max-w-[25%] p-4 flex flex-col gap-6 mx-auto max-w-[23rem] w-full">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="text-sm tracking-tight text-[#505050]">
                    Have a coupon?
                  </h4>
                  <form className="max-w-[27rem] mx-auto mt-1 rounded-md border border-[#D3D3D3] overflow-hidden flex justify-center items-center">
                    <input
                      type="text"
                      placeholder="Add coupon"
                      disabled={true}
                      className="w-full px-2 py-1 tracking-tight bg-white h-full placeholder:text-[#D3D3D3]"
                    />
                    {/* <div className="ring-2 ring-blue-800 w-fit"> */}
                    <button
                      type="button"
                      title="Coming feature"
                      className="px-4 py-2 tracking-tight text-white bg-gradient-topBottomBlue"
                    >
                      Apply
                    </button>
                    {/* </div> */}
                  </form>
                </div>

                <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="w-fit text-sm tracking-tight text-[#505050]">
                      Subtotal:
                    </span>
                    <span className="w-fit text-sm tracking-tight text-[#505050]">
                      &#x20A6; {overallTotal}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="w-fit text-sm tracking-tight text-[#505050]">
                      Discount:
                    </span>
                    <span className="w-fit text-sm tracking-tight text-[#FA3434]">
                      -&#x20A6; {totalDiscount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="w-fit text-sm tracking-tight text-[#505050]">
                      Tax:
                    </span>
                    <span className="w-fit text-sm tracking-tight text-[#00B517]">
                      +# 14.90
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="w-fit text-sm tracking-tight text-[#505050]">
                      Shipping:
                    </span>
                    <span className="w-fit text-sm tracking-tight text-[#00B517]">
                      Free
                    </span>
                  </div>
                  <div className="border-b border-slate-300 h-[1px] w-full" />
                  <div className="flex justify-between mt-3 items-center">
                    <span className="w-fit font-semibold tracking-tight">
                      Total:
                    </span>
                    <span className="w-fit font-semibold tracking-tight">
                      &#x20A6; {overallTotal}
                    </span>
                  </div>
                  <Button
                    primary
                    fullWidth
                    onClick={() => router.push("/checkout")}
                    className="mt-5 max-w-[12rem] mx-auto rounded-md"
                  >
                    Check out
                  </Button>

                  <div className="flex justify-center gap-1 mt-2 items-center">
                    <div className="border w-[2rem] h-[1.4rem] flex justify-center items-center border-slate-200">
                      <Image
                        src={images.AfrunaPay}
                        alt="image"
                        className="w-[98%]"
                      />
                    </div>
                    <div className="border w-[2rem] h-[1.4rem] flex justify-center items-center border-slate-200">
                      <Image
                        src={images.visa}
                        alt="image"
                        className="w-[95%]"
                      />
                    </div>
                    <div className="border w-[2rem] h-[1.4rem] flex justify-center items-center border-slate-200">
                      <Image
                        src={images.palmpay}
                        alt="image"
                        className="w-[0.8rem] h-[0.75rem]"
                      />
                    </div>
                    <div className="border w-[2rem] h-[1.4rem] flex justify-center items-center border-slate-200">
                      <Image
                        src={images.opay}
                        alt="image"
                        className="w-[98%]"
                      />
                    </div>
                    <div className="border w-[2rem] h-[1.4rem] flex justify-center items-center border-slate-200">
                      <Image
                        src={images.visa}
                        alt="image"
                        className="w-[98%]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center rounded-lg mt-8 pb-10 items-center flex-col pt-12 grow bg-white w-full">
              <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                <Image src={imags.noResult} alt={`Not found image`} fill />
              </div>
              <h4 className="font-extrabold text-sm">
                Sorry!.., No item(s) Found
              </h4>
              <span className="text-gray-500 text-xs">
                Your cart is empty
                <Link
                  href={"/product"}
                  className="inline-block ml-2 font-semibold text-orange-600 hover:underline transition-all duration-300 text-[0.8rem]"
                >
                  Add to cart
                </Link>
              </span>
            </div>
          )}
        </div>
        {/* )} */}

        {/* save items */}
        {saveItemsData && saveItemsData.length > 0 ? (
          <section className="flex flex-col gap-4 md:gap-6 md:mt-8 sm:px-9 lg:px-[4.2rem] py-10 lg:pb-20">
            <div className="flex w-full flex-col md:border-b border-[#EFEEED] md:flex-row gap-2 md:gap-6 justify-between items-start md:items-end ">
              <div className="flex md:justify-start w-full items-center ">
                <Button
                  yellowGray
                  className="md:px-7 cursor-default font-extrabold"
                >
                  Save items
                </Button>
              </div>

              <div className="md:flex justify-end w-full text-end">
                <Link
                  href={"/product"}
                  className="text-orange-400 md:font-semibold md:text-lg hover:scale-95 transition duration-300"
                >
                  See All
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-[0.8rem] md:gap-8">
              {saveItems.slice(0, 10).map((product) => {
                // Product component
                return <ProductCard key={product._id} {...product} />;
              })}
            </div>
          </section>
        ) : null}

        {/* Newsletter */}
        <NewsLetter />
      </main>
    </Main>
  );
}
