/* eslint-disable react/display-name */

import { Button } from "@/components/widgets/Button";
import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import React, { Ref, useMemo, useState } from "react";

import * as Tabs from "@radix-ui/react-tabs";
import images from "@/constants/images";
import { IoCheckmark } from "react-icons/io5";
import { BsQuestionCircleFill } from "react-icons/bs";
import { AccountLink } from "@/components/AccountLink";
import Image from "next/image";
import { NewsLetter } from "@/components/NewsLetter";
import Main from "@/layouts/main";
import { FeedBack } from "@/components/FeedBack";
import UsersActions from "@/services/user.services";
import { RootState } from "@/types/store.type";
import { useSelector } from "react-redux";
import { T_order_item } from "@/types/user";
import { useRouter } from "next/router";
import imags from "@/constants/images";
import withAuth10 from "@/hooks/withAuth";
import { verifyImageUrl } from "@/utils/verify_image_url";

export default withAuth10(function Index() {
  const router = useRouter();
  useMemo(() => {
    const userService = new UsersActions();
    userService.getAllOrders();
  }, []);
  const { allOrderData } = useSelector((state: RootState) => state.users);

  // Use the reduce function to extract all the objects from the items arrays
  const allProcessOrderItems = allOrderData?.reduce((accumulator, order) => {
    return accumulator
      .concat(order.items)
      .filter((item) => item.isCanceled === false);
  }, [] as T_order_item[]);
  const allCanceldOrderItems = allOrderData?.reduce((accumulator, order) => {
    return accumulator
      .concat(order.items)
      .filter((item) => item.isCanceled === true);
  }, [] as T_order_item[]);

  //   // You can map through this array to render each product order
  //   allOrderItems.forEach((orderItem, index) => {
  //     // console.log(`Order ${index + 1}:`, orderItem);
  //   });

  const formatedDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [isProcessModelOpenArray, setIsProcessModelOpenArray] = useState<
    boolean[]
  >(new Array(allProcessOrderItems.length).fill(false));
  const toggleProcessIsModalopen = (index: number) => {
    const newIsModelOpenArray = [...isProcessModelOpenArray];
    newIsModelOpenArray[index] = !newIsModelOpenArray[index];
    setIsProcessModelOpenArray(newIsModelOpenArray);
  };
  const [isCancelModelOpenArray, setIsCancelModelOpenArray] = useState<
    boolean[]
  >(new Array(allCanceldOrderItems.length).fill(false));
  const toggleCancelIsModelOpen = (index: number) => {
    const newIsModelOpenArray = [...isCancelModelOpenArray];
    newIsModelOpenArray[index] = !newIsModelOpenArray[index];
    setIsCancelModelOpenArray(newIsModelOpenArray);
  };

  return (
    <Main>
      <main className="pt-10 bg-[#F2F5F7] h-full relative">
        <div className="w-full md:flex justify-center items-start pb-10 md:pb-16 lg:pb-20 gap-5 px-4 sm:px-10 md:px-12 lg:px-28">
          <AccountLink />
          <div className="flex flex-col gap-6 grow md:max-w-[73%] mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-[#0C0E3B]">
              My Order
            </h3>
            {/* shrink-0   first:rounded-tl-md last:rounded-tr-md  data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black*/}
            <Tabs.Root
              className="flex flex-col w-full rounded-xl bg-white"
              defaultValue="tab1"
            >
              <Tabs.List className="flex " aria-label="Manage your account">
                <Tabs.Trigger
                  className="px-4 text-xs sm:text-sm md:text-base md:px-8 h-[3.5rem] group pb-3 flex flex-col gap-1 items-start justify-end font-extrabold leading-none select-none transition-all duration-300 hover:text-[#FFC283] data-[state=active]:text-[#FFC283] outline-none cursor-default"
                  value="tab1"
                >
                  Successful Orders({allProcessOrderItems.length})
                  <div className="h-[10px] -mb-[0.9rem] z-10 w-[5rem] group-data-[state=active]:border-orange-400 transition-all duration-300 border-b-2 border-transparent" />
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="px-2 text-xs sm:text-sm md:text-base md:px-8 h-[3.5rem] group pb-3 flex flex-col gap-1 items-start justify-end font-extrabold leading-none select-none transition-all duration-300 hover:text-[#FFC283] data-[state=active]:text-[#FFC283] outline-none cursor-default"
                  value="tab2"
                >
                  Canceled Orders
                  <div className="h-[10px] -mb-[0.9rem] z-10 w-[5rem] group-data-[state=active]:border-orange-400 transition-all duration-300 border-b-2 border-transparent" />
                </Tabs.Trigger>
              </Tabs.List>
              <div className="border-b w-full border-[#D5D5E6] max-w-[92.5%] mx-auto" />
              {/* focus:shadow-[0_0_0_2px] focus:shadow-black */}
              <Tabs.Content
                className="grow px-4 md:px-8 pt-8 pb-12  bg-white rounded-b-md outline-none"
                value="tab1"
              >
                {/* shadow-[0_2px_10px] shadow-black/5 */}
                <Accordion.Root
                  className="w-full flex flex-col gap-6"
                  type="single"
                  // defaultValue={allProcessOrderItems[0]._id??"test"}
                  collapsible
                >
                  {allProcessOrderItems && allProcessOrderItems.length > 0 ? (
                    allProcessOrderItems.map((item) => {
                      return (
                        <AccordionItem
                          key={item._id}
                          value={item._id}
                          className="border border-[#D5D5E6] rounded-lg"
                        >
                          <div className="flex py-5 pl-3 justify-start items-start gap-4 w-full">
                            <div className="min-w-[60%] md:min-w-[76%] flex gap-1 md:gap-6 justify-start items-start">
                              <div className="p-2 flex justify-center items-center">
                                {item.productId !== null ? (
                                  <div className=" overflow-hidden w-[7.5rem] h-[5rem] md:w-[7.5rem] md:h-[8rem] relative rounded-md p-2 flex justify-center items-center">
                                    <Image
                                      src={verifyImageUrl(item.productId?.images[0])}
                                      alt="product-img"
                                      priority
                                      fill
                                    />
                                  </div>
                                ) : (
                                  <div className="w-[7.5rem] h-[5rem] md:w-[7.5rem] md:h-[8rem] rounded-md p-2 flex justify-center items-center">
                                    <Image
                                      src={images.wishlist1}
                                      alt="order-img"
                                      priority
                                      className="w-[100%} md:w-[85%]"
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col gap-1 justify-start items-start">
                                <h1 className="tracking-tight text-start  md:max-w-[98%] leading-4 font-medium text-sm sm:text-[0.9rem] md:text-base sm:font-semibold text-[#1C1C1C]">
                                  {item.productId !== null
                                    ? item.productId?.name
                                    : "Mens Long Sleeve T-shirt Cotton Base Layer Slim"}
                                </h1>
                                <span className="text-xs mt-1 md:mt-0 md:text-sm tracking-tight text-[#818181]">
                                  Order Id:{" "}
                                  {
                                    item._id
                                    // .substring(0, 17)
                                  }
                                </span>
                                <div className="flex gap-1 text-xs md:text-sm justify-start items-center bg-[#E2FBE5] text-[#00B517] p-1">
                                  <IoCheckmark size={16} />{" "}
                                  {item.deliveryStatus}
                                </div>
                                <span className="text-[#0C0E3B] font-semibold mt-1 md:mt-2 text-[0.7rem] md:text-[0.8rem]">
                                  {formatedDate(item.updatedAt)}
                                </span>
                                <p className="text-[#818181] text-sm">
                                  Quantity:{" "}
                                  <span className="text-[#0C0E3B] text-sm font-semibold">
                                    {item.quantity}
                                  </span>
                                </p>
                                {/* <button
                                  onClick={() => toggleProcessIsModalopen(index)}
                                  className="flex text-sm md:text-base gap-2 justify-center items-center text-[#0C0E3B] font-semibold"
                                >
                                  La feedback{" "}
                                  <BsQuestionCircleFill
                                    size={15}
                                    className="text-slate-500"
                                  />
                                </button>
                                <FeedBack
                                  isOpen={isProcessModelOpenArray[index]}
                                  onClose={() => toggleProcessIsModalopen(index)}
                                /> */}
                              </div>
                            </div>

                            <AccordionTrigger
                              className={"flex justify-end items-start w-full"}
                            >
                              <span className=" lg:hidden md:font-semibold text-sm md:text-base text-[#FFC283]">
                                Details
                              </span>
                              <span className=" hidden lg:flex md:font-semibold text-sm md:text-base text-[#FFC283]">
                                See Details
                              </span>
                            </AccordionTrigger>
                          </div>

                          <AccordionContent className={""}>
                            <div className="flex flex-col gap-8">
                              <div className="flex flex-col md:flex-row w-full">
                                <div className="border-t pt-4 border-[#E5E5E5] flex flex-col justify-start items-start md:min-w-[50%]">
                                  <h2 className="font-semibold pl-5">
                                    PAYMENT INFORMATION
                                  </h2>
                                  <div className="flex flex-col w-full justify-start items-start">
                                    <div className="border-t w-full mt-4 border-[#E5E5E5]" />
                                    <h5 className="font-semibold mt-4 pl-5">
                                      Payment Method
                                    </h5>
                                    <span className="text-gray-500 pl-5 font-semibold text-[0.8rem] mt-4">
                                      Pay on Delivery
                                    </span>
                                    <h5 className="font-semibold pl-5 mt-7">
                                      Payment Details
                                    </h5>
                                    <span className="text-gray-500 pl-5 font-semibold text-[0.8rem] mt-4">
                                      Items total: &#x20A6; {item.total}
                                    </span>
                                    <span className="text-gray-500 pl-5 font-semibold text-[0.8rem] mt-1">
                                      Delivery Frees: # 1000
                                    </span>
                                    <span className="text-gray-500 pl-5 font-semibold text-[0.8rem] mt-1">
                                      Total: &#x20A6; {item.total}
                                    </span>
                                  </div>
                                </div>
                                <div className="border-t pt-4 border-[#E5E5E5] flex flex-col justify-start items-start md:min-w-[50%]">
                                  <h2 className="font-semibold pl-4 md:pl-16">
                                    DELIVERY INFORMATION
                                  </h2>
                                  <div className="flex flex-col w-full justify-start items-start">
                                    <div className="border-t w-full mt-4 border-[#E5E5E5]" />
                                    <h5 className="font-semibold mt-4 pl-4 md:pl-16">
                                      Delivery Method
                                    </h5>
                                    <span className="text-gray-500 pl-4 md:pl-16 font-semibold text-[0.8rem] mt-4">
                                      Pick-up Station
                                    </span>
                                    <h5 className="font-semibold pl-4 md:pl-16 mt-7">
                                      Pick-up Station Address
                                    </h5>
                                    <span className="text-gray-500 pl-4 md:pl-16 font-semibold text-[0.8rem] mt-4">
                                      Minna PUS
                                    </span>
                                    <span className="text-gray-500 pl-4 md:pl-16 font-semibold text-[0.8rem] max-w-[17rem]">
                                      Suite C4 Peniel Albarka Plaza Western
                                      Byebass Minna Niger State Opposite Federal
                                      High Court Minna-Western Byepass, Niger
                                    </span>
                                    <Link
                                      title="Coming feauture"
                                      href={""}
                                      className="mt-5 text-blue-500 pl-4 md:pl-16"
                                    >
                                      See Location
                                    </Link>
                                    <p className="text-gray-500 pl-4 md:pl-16 font-semibold text-[0.8rem] mt-4">
                                      Opening Hours:
                                    </p>
                                    <span className="text-gray-500 pl-4 md:pl-16 font-semibold text-[0.8rem] mt-1">
                                      Mon-Fri 8AM-7PM : Sat 8AM-7PM
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-4 py-3 justify-center items-center">
                                <Button className="border-transparent rounded-md border hover:border-slate-400 transition-all duration-300 md:py-3">
                                  Tracking History
                                </Button>
                                <Button
                                  primary
                                  className="rounded-md md:py-3"
                                  onClick={() =>
                                    router.push(
                                      `product/${item.productId?._id}`
                                    )
                                  }
                                >
                                  Buy Item Again
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })
                  ) : (
                    <div className="flex justify-center items-center flex-col pt-10 pb-8 grow w-full border border-[#D5D5E6] rounded-lg">
                      <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                        <Image
                          src={imags.noResult}
                          alt={`Not found image`}
                          fill
                        />
                      </div>
                      <h4 className="font-extrabold text-sm">
                        There is no Order(s) in your account yet
                      </h4>
                    </div>
                  )}
                </Accordion.Root>
              </Tabs.Content>

              <Tabs.Content
                className="grow px-4 md:px-8 pt-8 pb-12  bg-white rounded-b-md outline-none"
                value="tab2"
              >
                {/* shadow-[0_2px_10px] shadow-black/5 */}
                <Accordion.Root
                  className="w-full flex flex-col gap-6"
                  type="single"
                  defaultValue={allCanceldOrderItems[0]?._id}
                  collapsible
                >
                  {allCanceldOrderItems && allCanceldOrderItems.length > 0 ? (
                    allCanceldOrderItems.map((item, index) => {
                      return (
                        <AccordionItem
                          key={item._id}
                          value={item._id}
                          className="border border-[#D5D5E6] rounded-lg"
                        >
                          <div className="flex py-5 pl-3 justify-start items-start gap-4 w-full">
                            <div className="min-w-[60%] md:min-w-[76%] flex gap-1 md:gap-6 justify-start items-start">
                              <div className="p-2 flex justify-center items-center">
                                {item.productId !== null ? (
                                  <div className=" overflow-hidden w-[7.5rem] h-[5rem] md:w-[7.5rem] md:h-[8rem] relative rounded-md p-2 flex justify-center items-center">
                                    <Image
                                      src={verifyImageUrl(item.productId?.images[0])}
                                      alt="product-img"
                                      priority
                                      fill
                                    />
                                  </div>
                                ) : (
                                  <div className="w-[7.5rem] h-[5rem] md:w-[7.5rem] md:h-[8rem] rounded-md p-2 flex justify-center items-center">
                                    <Image
                                      src={images.wishlist1}
                                      alt="order-img"
                                      priority
                                      className="w-[100%} md:w-[85%]"
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col gap-1 justify-start items-start">
                                <h1 className="tracking-tight text-start  md:max-w-[98%] leading-4 font-medium text-sm sm:text-[0.9rem] md:text-base sm:font-semibold text-[#1C1C1C]">
                                  {item.productId !== null
                                    ? item.productId?.name
                                    : "Mens Long Sleeve T-shirt Cotton Base Layer Slim"}
                                </h1>
                                <span className="text-xs mt-1 md:mt-0 md:text-sm tracking-tight text-[#818181]">
                                  Order Id:{" "}
                                  {
                                    item._id
                                    // .substring(0, 17)
                                  }
                                </span>
                                <div className="flex gap-1 text-xs md:text-sm justify-start items-center bg-[#E2FBE5] text-[#00B517] p-1">
                                  <IoCheckmark size={16} />{" "}
                                  {item.deliveryStatus}
                                </div>
                                <span className="text-[#0C0E3B] font-semibold mt-1 md:mt-2 text-[0.7rem] md:text-[0.8rem]">
                                  {formatedDate(item.updatedAt)}
                                </span>
                                <p className="text-[#818181] text-sm">
                                  Quantity:{" "}
                                  <span className="text-[#0C0E3B] text-sm font-semibold">
                                    {item.quantity}
                                  </span>
                                </p>
                                {/* <button
                                  onClick={() => toggleCancelIsModelOpen(index)}
                                  className="flex text-sm md:text-base gap-2 justify-center items-center text-[#0C0E3B] font-semibold"
                                >
                                  La feedback{" "}
                                  <BsQuestionCircleFill
                                    size={15}
                                    className="text-slate-500"
                                  />
                                </button>
                                <FeedBack
                                  isOpen={isCancelModelOpenArray[index]}
                                  onClose={() => toggleProcessIsModalopen(index)}
                                />  */}
                              </div>
                            </div>

                            <AccordionTrigger
                              className={"flex justify-end items-start w-full"}
                            >
                              <span className=" lg:hidden md:font-semibold text-sm md:text-base text-[#FFC283]">
                                Details
                              </span>
                              <span className=" hidden lg:flex md:font-semibold text-sm md:text-base text-[#FFC283]">
                                See Details
                              </span>
                            </AccordionTrigger>
                          </div>

                          <AccordionContent className={""}>
                            <div className="flex flex-col gap-8">
                              <div className="flex flex-col md:flex-row w-full">
                                <div className="border-t pt-4 border-[#E5E5E5] flex flex-col justify-start items-start md:min-w-[50%]">
                                  <h2 className="font-semibold pl-5">
                                    PAYMENT INFORMATION
                                  </h2>
                                  <div className="flex flex-col w-full justify-start items-start">
                                    <div className="border-t w-full mt-4 border-[#E5E5E5]" />
                                    <h5 className="font-semibold mt-4 pl-5">
                                      Payment Method
                                    </h5>
                                    <span className="text-gray-500 pl-5 font-semibold text-[0.8rem] mt-4">
                                      Pay on Delivery
                                    </span>
                                    <h5 className="font-semibold pl-5 mt-7">
                                      Payment Details
                                    </h5>
                                    <span className="text-gray-500 pl-5 font-semibold text-[0.8rem] mt-4">
                                      Items total: &#x20A6; {item.total}
                                    </span>
                                    <span className="text-gray-500 pl-5 font-semibold text-[0.8rem] mt-1">
                                      Delivery Frees: # 1000
                                    </span>
                                    <span className="text-gray-500 pl-5 font-semibold text-[0.8rem] mt-1">
                                      Total: &#x20A6; {item.total}
                                    </span>
                                  </div>
                                </div>
                                <div className="border-t pt-4 border-[#E5E5E5] flex flex-col justify-start items-start md:min-w-[50%]">
                                  <h2 className="font-semibold pl-4 md:pl-16">
                                    DELIVERY INFORMATION
                                  </h2>
                                  <div className="flex flex-col w-full justify-start items-start">
                                    <div className="border-t w-full mt-4 border-[#E5E5E5]" />
                                    <h5 className="font-semibold mt-4 pl-4 md:pl-16">
                                      Delivery Method
                                    </h5>
                                    <span className="text-gray-500 pl-4 md:pl-16 font-semibold text-[0.8rem] mt-4">
                                      Pick-up Station
                                    </span>
                                    <h5 className="font-semibold pl-4 md:pl-16 mt-7">
                                      Pick-up Station Address
                                    </h5>
                                    <span className="text-gray-500 pl-4 md:pl-16 font-semibold text-[0.8rem] mt-4">
                                      Minna PUS
                                    </span>
                                    <span className="text-gray-500 pl-4 md:pl-16 font-semibold text-[0.8rem] max-w-[17rem]">
                                      Suite C4 Peniel Albarka Plaza Western
                                      Byebass Minna Niger State Opposite Federal
                                      High Court Minna-Western Byepass, Niger
                                    </span>
                                    <Link
                                      title="Coming feauture"
                                      href={""}
                                      className="mt-5 text-blue-500 pl-4 md:pl-16"
                                    >
                                      See Location
                                    </Link>
                                    <p className="text-gray-500 pl-4 md:pl-16 font-semibold text-[0.8rem] mt-4">
                                      Opening Hours:
                                    </p>
                                    <span className="text-gray-500 pl-4 md:pl-16 font-semibold text-[0.8rem] mt-1">
                                      Mon-Fri 8AM-7PM : Sat 8AM-7PM
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-4 py-3 justify-center items-center">
                                <Button className="border-transparent rounded-md border hover:border-slate-400 transition-all duration-300 md:py-3">
                                  Tracking History
                                </Button>
                                <Button
                                  primary
                                  className="rounded-md md:py-3"
                                  onClick={() =>
                                    router.push(
                                      `product/${item.productId?._id}`
                                    )
                                  }
                                >
                                  Buy Item Again
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })
                  ) : (
                    <div className="flex justify-center items-center flex-col pt-10 pb-8 grow w-full border border-[#D5D5E6] rounded-lg">
                      <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                        <Image
                          src={imags.noResult}
                          alt={`Not found image`}
                          fill
                        />
                      </div>
                      <h4 className="font-extrabold text-sm">
                        There is no Canceled Order(s) in your account yet
                      </h4>
                    </div>
                  )}
                </Accordion.Root>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>

        {/* Newsletter */}
        <NewsLetter />
      </main>
    </Main>
  );
});

const AccordionItem = React.forwardRef(
  (props: Accordion.AccordionItemProps, forwardedRef: Ref<HTMLDivElement>) => (
    //  focus-within:shadow-[0_0_0_2px]
    <Accordion.Item
      className={classNames(
        " mt-px overflow-hidden first:mt-0  focus-within:relative focus-within:z-10",
        props.className
      )}
      {...props}
      ref={forwardedRef}
    >
      {props.children}
    </Accordion.Item>
  )
);

const AccordionTrigger = React.forwardRef(
  (
    props: Accordion.AccordionTriggerProps,
    forwardedRef: Ref<HTMLButtonElement>
  ) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={classNames(
          "group flex cursor-pointer gap-1 items-center justify-center px-5 leading-none outline-none",
          props.className
        )}
        {...props}
        ref={forwardedRef}
      >
        {props.children}
        <ChevronDownIcon
          className="text-[#FFC283] w-6 h-6 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  (
    props: Accordion.AccordionContentProps,
    forwardedRef: Ref<HTMLDivElement>
  ) => (
    <Accordion.Content
      className={classNames(
        "data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden",
        props.className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="py-[15px] px-5">{props.children}</div>
    </Accordion.Content>
  )
);
