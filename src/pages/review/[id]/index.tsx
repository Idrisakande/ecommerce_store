import { AccountLink } from "@/components/AccountLink";
import { LoadingPage } from "@/components/LoadingPage";
import { NewsLetter } from "@/components/NewsLetter";
import { Button } from "@/components/widgets/Button";
import imags from "@/constants/images";
import { LoadingStateContext } from "@/contexts/LoadingStateContextProvider";
import Main from "@/layouts/main";
import { T_error_response } from "@/types/auth.type";
import { T_loading_provider } from "@/types/loading";
import { RootState } from "@/types/store.type";
import { T_order_item } from "@/types/user";
import { handleErrors } from "@/utils/errors.util";
import { verifyImageUrl } from "@/utils/verify_image_url";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FieldValue } from "react-hook-form";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type T_review_data = {};

export default function Index() {
  const { query } = useRouter();
  const { id } = query;
  const _id = id as string;
  const { allOrderData } = useSelector((state: RootState) => state.users);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { allProducts } = useSelector((state: RootState) => state.products);
  const oneProduct = allProducts.filter((item) => item._id === _id)[0]
  const category = categories.filter(({ _id }) => _id === oneProduct?.categoryId?._id)[0];
  const allProcessOrderItems = allOrderData.reduce((accumulator, order) => {
    return accumulator
      .concat(order.items)
      .filter((item) => item.isCanceled === false);
  }, [] as T_order_item[]);
  const oneOrderItem = allProcessOrderItems.find(item => item.productId?._id === _id)
  const { isLoading, setIsloading } = useContext(
    LoadingStateContext
  ) as T_loading_provider;

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  // handle the number of star selected
  const handleStarClick = (index: number) => {
    // Calculate the new rating based on the index of the star
    const newRating = index === rating ? index + (1 - 0.5) : index;
    setRating(newRating);
  };
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const starRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);
  const handleProductReview = async (payload: {
    productId: string;
    rating: number;
    comment: string;
  }) => {
    try {
      const { data } = await axios.post(`/api/reviews`, payload, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  };

  const onSubmit = (
    data: FieldValue<{ rating: number; comment: string }>,
    e: { preventDefault: () => void }
  ) => {
    e.preventDefault();
    if (rating === 0) {
      if (starRef.current) {
        starRef.current.textContent = "Please rate the product";
      }
      return;
    }
    if (comment === "") {
      if (textareaRef.current) {
        textareaRef.current.textContent = "Comment on the product";
        textareaRef.current.focus();
      }
      return;
    }
    setIsloading && setIsloading(true);
    const _id = id as string;
    handleProductReview({ productId: _id, rating, comment })
      .then((data) => {
        // console.log(data.data);
        
        if (data.success === true) {
          toast.success(`You have review the product successfully`);
          setRating(0)
          setComment('')
        } else {
          toast.error(`Something went wrong`);
        }
      })
      .finally(() => {
        setIsloading && setIsloading(false);
      });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Main>
      <main className="pt-6 bg-[#F2F5F7] h-full relative">
        <div className="w-full pb-10 md:pb-16 lg:pb-20 md:flex justify-center items-start gap-5 px-4 sm:px-10 md:px-12 lg:px-28">
          <AccountLink />
          <div className="flex flex-col gap-4 grow md:max-w-[70%] mx-auto">
            <div className="flex gap-1 md:gap-2 items-center">
              <h3 className="text-base md:text-2xl flex gap-1 justify-center items-center font-semibold text-[#0C0E3B]">
                 <>{'Reviews'} <MdArrowForwardIos className="text-[#999999] text-xs" /></>
              </h3>
              <h3 className="flex text-xs md:text-sm gap-1 items-center justify-center font-semibold text-[#999999]">
                {category ?  <> {category.name} <MdArrowForwardIos className="text-xs"/></> : null} 
              </h3>
              <h3 className="flex text-xs md:text-sm gap-1 items-center justify-center font-semibold text-[#999999]">
                {oneProduct ? <>{oneProduct.brand} <MdArrowForwardIos className="text-xs" /></>  : null} 
              </h3>
              <h3 className="font-semibold text-xs md:text-sm text-[#999999]">{ oneOrderItem && oneOrderItem?.productId !== null ? oneOrderItem.productId?.name.length > 14 ? `${oneOrderItem?.productId.name.substring(0, 14)}...` : oneOrderItem?.productId.name : null}</h3>
            </div>
            <div className="flex w-full gap-4 rounded-xl flex-col py-6 px-4 lg:py-10 lg:px-8 bg-white">
              <div className="border rounded-md border-[#D5D5E6] py-6 px-4 flex justify-start grow items-start gap-3 w-full">
                {oneOrderItem && oneOrderItem?.productId !== null ? (
                  <>
                    <div className="p-2 flex justify-center items-center">
                      <div className="w-[5rem] h-[5rem] overflow-hidden rounded-md relative">
                        <Image
                          src={verifyImageUrl(oneOrderItem.productId.images[0])}
                          alt={`product image`}
                          fill
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1  max-w-[75%] w-full">
                      <h1 className="tracking-tight text-start  md:max-w-[98%] leading-4 font-semibold text-sm sm:text-[0.9rem] md:text-base sm:font-semibold text-[#1C1C1C]">
                        {oneOrderItem.productId.name}
                      </h1>
                      <span className="text-[0.77rem] mt-1 md:mt-0 md:text-sm tracking-tight text-[#818181]">
                        Order Id: {oneOrderItem._id }
                      </span>
                      <form
                        onSubmit={(e) => onSubmit({ rating, comment }, e)}
                        className="w-full max-w-[28rem]"
                      >
                        <div className="flex flex-col gap-1 mt-1">
                          <span className="text-sm font-semibold">
                            Rate (Select your preferable star)
                          </span>
                          <div>
                            <div className="flex mt-1 justify-start items-center gap-1 text-[#FF9E3A] text-xs">
                              {Array(5)
                                .fill("_")
                                .map((star, index) => (
                                  <div
                                    className={`${
                                      index < rating
                                        ? "text-[#FF9E3A]"
                                        : "text-slate-500"
                                    }  text-sm md:text-xs cursor-pointer`}
                                    key={index}
                                    onClick={() => handleStarClick(index + 0.5)}
                                  >
                                    {index < rating ? (
                                      index === Math.floor(rating) &&
                                      rating % 1 !== 0 ? (
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
                            {rating === 0 && (
                              <span
                                ref={starRef}
                                className="text-rose-500 block text-xs mt-1 bg-white rounded-sm w-fit"
                              ></span>
                            )}
                          </div>
                        </div>
                        <fieldset className="w-full mt-3 flex flex-col gap-1">
                          <label className="text-sm font-semibold">
                            Comment
                          </label>
                          <div className="flex flex-col">
                            <textarea
                              rows={5}
                              value={comment}
                              ref={textareaRef}
                              onChange={(e) => setComment(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  onSubmit({ rating, comment }, e);
                                }
                              }}
                              placeholder="Enter your coment ..."
                              style={{ resize: "none" }}
                              className="p-2 w-full placeholder:text-gray-400 text-sm border border-slate-300 rounded-md"
                            />
                            {comment === "" && (
                              <span
                                ref={textareaRef}
                                className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1"
                              ></span>
                            )}
                          </div>
                        </fieldset>
                        <div className="mt-4 md:mt-6 flex sm:justify-end w-full">
                          <Button type="submit" primary className=" rounded-md">
                            Submit Review
                          </Button>
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center text-center items-center flex-col py-4 grow w-full">
                    <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                      <Image
                        src={imags.noResult}
                        alt={`Not found image`}
                        fill
                      />
                    </div>
                    <h4 className="font-extrabold text-sm ">
                      Sorry!.., Something went wrong
                    </h4>
                    <span className="text-gray-500 text-sm">
                      Reload the page{"  "}
                      {/* <Link
                        href={"/review"}
                        className="inline-block ml-2 font-semibold text-orange-600 hover:underline transition-all duration-300 text-[0.8rem]"
                      >
                        
                      </Link> */}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <NewsLetter />
      </main>
    </Main>
  );
}


// "This is one of the best Samsung Galaxy A series have ever used. It is very smart with amazing functionality. Check out to see for it."


