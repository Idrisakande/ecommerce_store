import Image from "next/image";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { AccountLink } from "@/components/AccountLink";
import Link from "next/link";
import { NewsLetter } from "@/components/NewsLetter";
import Main from "@/layouts/main";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { useContext, useMemo, useState } from "react";
import { LoadingStateContext } from "@/contexts/LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { LoadingPage } from "@/components/LoadingPage";
import imags from "@/constants/images";
import UsersActions from "@/services/user.services";
import { T_order_item } from "@/types/user";
import { IoCheckmark } from "react-icons/io5";
import withAuth10 from "@/hooks/withAuth";
import { verifyImageUrl } from "@/utils/verify_image_url";

export default withAuth10( function Index() {
  const { push } = useRouter();
  const opt = useContext(LoadingStateContext) as T_loading_provider;

  // Create an instance of Users in useMemo hook
  // Fetch the all orders using the instance
  useMemo(() => {
    const userService = new UsersActions();
    userService.getAllOrders();
  }, []);
  const { allOrderData } = useSelector((state: RootState) => state.users);
  // const orders = useMemo(() => {
  //   const myOrder = allOrderData.find((order) => order.userId);
  //   return myOrder;
  // }, [allOrderData]);
  const allProcessOrderItems = allOrderData.reduce((accumulator, order) => {
    return accumulator
      .concat(order.items)
      .filter((item) => item.isCanceled === false);
  }, [] as T_order_item[]);
  const formatedDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (opt?.isLoading) {
    return <LoadingPage />;
  }

  return (
    <Main>
      <main className="pt-5 bg-[#F2F5F7] h-full relative">
        <div className="w-full md:flex justify-center items-start gap-5 pb-10 md:pb-16 px-4 sm:px-10 md:px-12 lg:px-28">
          <AccountLink />
          <div className="flex flex-col gap-4 grow md:max-w-[70%] mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-[#0C0E3B]">
              Reviews
            </h3>
            <ScrollArea.Root className="ScrollAreaRoot w-full h-[55vh] md:h-[82vh] lg:h-[55vh] px-2 pt-3 pb-3 bg-white overflow-auto rounded-xl">
              <ScrollArea.Viewport className="ScrollAreaViewport h-full">
                <div className="flex w-full grow gap-4 rounded-xl flex-col py-4 lg:py-8 px-2 md:px-4 lg:px-8 bg-white">
                  {allProcessOrderItems && allProcessOrderItems.length > 0 ? (
                    allProcessOrderItems.map((item) => (
                      <div
                        key={item._id}
                        className="border w-full rounded-md border-[#D5D5E6] px-2 sm:px-5 py-4 flex flex-col justify-start items-start gap-2 sm:gap-1 sm:flex-row"
                      >
                        <div className="flex justify-start  sm:max-w-[60%] items-start gap-1 md:gap-3 w-full">
                          <div className="p-2 flex justify-center items-center">
                            {item.productId !== null ? (
                              <div className=" w-[5rem] h-[5rem] md:w-[5remm] md:h-[5rem] overflow-hidden rounded-md relative">
                                <Image
                                  src={verifyImageUrl(item.productId?.images[0])}
                                  alt="product-img"
                                  priority
                                  fill
                                />
                              </div>
                            ) : (
                              <div className="w-[5rem] h-[5rem] md:w-[5remm] md:h-[5rem] overflow-hidden rounded-md relative">
                                <Image
                                  src={imags.wishlist1}
                                  alt="order-img"
                                  priority
                                  className="w-[100%} md:w-[85%]"
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <h1 className="tracking-tight text-start md:max-w-[98%] leading-4 font-semibold text-[0.8rem] sm:text-[0.9rem] md:text-base sm:font-semibold text-[#1C1C1C]">
                              {item.productId !== null
                                ? item.productId?.name
                                : "Mens Long Sleeve T-shirt Cotton Base Layer Slim"}
                            </h1>
                            <span className="text-xs mt-1 md:mt-0 md:text-sm tracking-tight text-[#818181]">
                              Order Id:{" "}
                              {
                                item._id
                                // .substring(0, 15)
                              }
                            </span>
                            <div className="flex gap-1 w-fit mt-2 text-xs md:text-sm justify-start items-center bg-[#E2FBE5] text-[#00B517] p-1">
                              <IoCheckmark size={16} /> {item.deliveryStatus}
                            </div>
                            <span className="text-[#0C0E3B] font-semibold mt-2 md:mt-3 text-[0.7rem] md:text-[0.8rem]">
                              {formatedDate(item.updatedAt)}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`flex justify-start items-center sm:justify-end sm:max-w-[40%] w-full px-3 mt-1 sm:mt-4 
                      `}
                        >
                          <button
                            onClick={() =>
                              push(`/review/${item.productId?._id}`)
                            }
                            className="text-[#FFC283] text-sm lg:text-base font-bold"
                          >
                            Rate and Review Item
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center flex-col pt-12 grow w-full">
                      <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                        <Image
                          src={imags.noResult}
                          alt={`Not found image`}
                          fill
                        />
                      </div>
                      <h4 className="font-extrabold text-sm">
                        Sorry!.., No Ordered item(s) Found
                      </h4>
                      <span className="text-gray-500 text-xs">
                        Add item(s) to your wishlist{"  "}
                        <Link
                          href={"/"}
                          className="inline-block ml-2 font-semibold text-orange-600 hover:underline transition-all duration-300 text-[0.8rem]"
                        >
                          back to shop
                        </Link>
                      </span>
                    </div>
                  )}

                  {/* {allProcessOrderItems && allProcessOrderItems.length > 0 ? (
                    allProcessOrderItems.map((item) => {
                      return <OrderCard key={item._id} item={item} />;
                    })
                  ) : (
                    <div className="flex justify-center items-center flex-col pt-12 grow w-full">
                      <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                        <Image
                          src={imags.noResult}
                          alt={`Not found image`}
                          fill
                        />
                      </div>
                      <h4 className="font-extrabold text-sm">
                        Sorry!.., No Ordered item(s) Found
                      </h4>
                      <span className="text-gray-500 text-xs">
                        Add item(s) to your wishlist{"  "}
                        <Link
                          href={"/"}
                          className="inline-block ml-2 font-semibold text-orange-600 hover:underline transition-all duration-300 text-[0.8rem]"
                        >
                          back to shop
                        </Link>
                      </span>
                    </div>
                  )} */}
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
          </div>
        </div>
        {/* Newsletter */}
        <NewsLetter />
      </main>
    </Main>
  );
})
