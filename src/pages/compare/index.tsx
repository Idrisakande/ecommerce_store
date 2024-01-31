import { NewsLetter } from "@/components/NewsLetter";
import Image from "next/image";
import { useContext, useMemo } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Button } from "@/components/widgets/Button";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import Main from "@/layouts/main";
import { CompareContext } from "@/contexts/CompareContextProvider";
import { T_compare_context } from "@/types/products";
import imags from "@/constants/images";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { verifyImageUrl } from "@/utils/verify_image_url";

export default function Index() {

  interface ICompareProduct {
    model?: string;
    dimenssions?: string;
    weight?: string;
    processor?: string;
    id?: number | string;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  

  const {compareProducts, } = useSelector((state: RootState) => state.products)
  // console.log(compareProducts);
  
  // compare context to manage compare product
  const { handleCompareProducts } = useContext(
    CompareContext
  ) as T_compare_context;
    const firstProduct = compareProducts[0]
    const secondProduct = compareProducts[1]
    
    const secondDiscountPrice = useMemo(() => {
      if (
        secondProduct &&
        secondProduct.discount > 0 &&
        secondProduct.discount !== undefined
      ) {
        const disctPrice =
        secondProduct.price -
          (secondProduct.discount / 100) * secondProduct.price;
        return disctPrice.toFixed(2) as unknown as number;
      }
      return secondProduct?.price.toFixed(2) as unknown as number;
    }, [secondProduct?.price, secondProduct?.discount]);

  const firstDiscountPrice = useMemo(() => {
    if (
      firstProduct &&
      firstProduct.discount > 0 &&
      firstProduct.discount !== undefined
    ) {
      const disctPrice =
        firstProduct.price -
        (firstProduct.discount / 100) * firstProduct.price;
      return disctPrice.toFixed(2) as unknown as number;
    }
    return firstProduct?.price.toFixed(2) as unknown as number;
  }, [firstProduct?.price, firstProduct?.discount]);

  const router = useRouter();
  console.log(firstProduct);
  

  return (
    <Main>
      <main className="bg-white pt-12">
        <div className="mx-auto max-w-[88%] lg:max-w-[75%] mb-16 lg:mb-24 flex flex-col gap-6">
          <h2 className="font-extrabold text-xl lg:text-3xl">
            Product Comparison
          </h2>
          {compareProducts && compareProducts.length > 0 ? (
            <div className="w-full ">
              <div className="border-t bg-[#F8F6F6] py-3 border-x border-[#F8F6F6]  w-full">
                <span className="pl-4 font-semibold">Product Details</span>
              </div>
              <ScrollArea.Root className="w-full h-[60vh] sm:h-[66vh] md:h-full sm:mx-auto pr-4 md:pr-0 bg-white">
                <ScrollArea.Viewport className="min-w-full w-full h-full">
                  <table className="bg-white w-screen md:w-full mb-4">
                    <tbody className="w-full">
                      {firstProduct.name || secondProduct.name ? (
                        <tr className="w-full border-t border-[#A7B7DD]">
                          <td className="w-[16%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            Product
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            {firstProduct?.name}
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-x border-[#A7B7DD] text-start">
                            {secondProduct?.name}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}

                      {firstProduct.images ||
                      secondProduct.images ? (
                        <tr className="">
                          <td className="w-[16%] py-4 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            Item Image
                          </td>
                          <td className="w-[42%] py-4 border-b border-l border-[#A7B7DD] ">
                            {firstProduct?.images && (
                              <div className="mx-auto w-[6rem] h-[6rem] rounded-md relative overflow-hidden flex justify-center items-center">
                                <Image
                                  src={verifyImageUrl(firstProduct.images[0])}
                                  alt={`${firstProduct?.name} image`}
                                  fill
                                />
                              </div>
                            )}
                          </td>
                          <td className="w-[42%] py-4 border-b border-l border-x border-[#A7B7DD] ">
                            {secondProduct?.images && (
                              <div className="mx-auto w-[6rem] h-[6rem] rounded-md relative overflow-hidden flex justify-center items-center">
                                <Image
                                  src={verifyImageUrl(secondProduct.images[0])}
                                  alt={`${secondProduct?.name} image`}
                                  fill
                                />
                              </div>
                            )}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}

                      {firstProduct || secondProduct ? (
                        <tr>
                          <td className="w-[16%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            Seller
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                          {/* {firstProduct?.vendorId.firstName??"Admin"}  {firstProduct?.vendorId.lastName??"Admin"} */}
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-x border-l border-[#A7B7DD] text-start">
                            {secondProduct &&
                              `${secondProduct.vendorId.firstName} ${secondProduct.vendorId.lastName}`}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}

                      {firstDiscountPrice || secondDiscountPrice ? (
                        <tr>
                          <td className="w-[16%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            Price
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            {firstDiscountPrice && (
                              <span>#{firstDiscountPrice}</span>
                            )}
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-x border-l border-[#A7B7DD] text-start">
                            {secondDiscountPrice && (
                              <span>#{secondDiscountPrice}</span>
                            )}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}

                      {firstProduct.brand ||
                      secondProduct.brand ? (
                        <tr>
                          <td className="w-[16%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            Brand
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            {firstProduct?.brand}
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-x border-b border-l border-[#A7B7DD] text-start">
                            {secondProduct?.brand}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
{/* 
                      {firstProduct || secondProduct?.model ? (
                        <tr>
                          <td className="w-[16%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            Model
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            {firstProduct?.model}
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-x border-l border-[#A7B7DD] text-start">
                            {secondProduct?.model}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )} */}
                       {firstProduct.brand ||
                      secondProduct.brand ? (
                        <tr>
                          <td className="w-[16%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                          Availability
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                          {firstProduct && (
                            firstProduct.isOutOfStock
                            ? " Out of stock"
                            : "In stock"
                          )}
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-x border-b border-l border-[#A7B7DD] text-start">
                          {secondProduct && (
                            secondProduct?.isOutOfStock
                            ? "Out of stock"
                            : "In stock"
                          )}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
                      {firstProduct ||
                      secondProduct ? (
                        <tr>
                          <td className="w-[16%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            Rating
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            <span className="flex gap-1">
                              {/* {comparePr  */}
                              {firstProduct && (
                                Array(5)
                                .fill("_")
                                .map((star, index) => (
                                  <div
                                    className={`${
                                      index < firstProduct.ratings
                                        ? "text-[#FF9E3A]"
                                        : "text-slate-500"
                                    }  text-sm md:text-xs`}
                                    key={index}
                                  >
                                    {index < firstProduct.ratings ? (
                                      index ===
                                        Math.floor(
                                          firstProduct.ratings
                                        ) &&
                                      firstProduct.ratings % 1 !==
                                        0 ? (
                                        <BsStarHalf />
                                      ) : (
                                        <BsStarFill />
                                      )
                                    ) : (
                                      <BsStar />
                                    )}
                                  </div>
                                ))
                              )}
                            </span>
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-l border-x border-[#A7B7DD] text-start">
                            <span className="flex gap-1">
                            {
                              secondProduct && (
                                Array(5)
                                .fill("_")
                                .map((star, index) => (
                                  <div
                                    className={`${
                                      index < secondProduct?.ratings
                                        ? "text-[#FF9E3A]"
                                        : "text-slate-500"
                                    }  text-sm md:text-xs`}
                                    key={index}
                                  >
                                    {index < secondProduct?.ratings ? (
                                      index ===
                                        Math.floor(
                                          secondProduct?.ratings
                                        ) &&
                                      secondProduct?.ratings % 1 !==
                                        0 ? (
                                        <BsStarHalf />
                                      ) : (
                                        <BsStarFill />
                                      )
                                    ) : (
                                      <BsStar />
                                    )}
                                  </div>
                                ))
                              )
                                }
                            </span>
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}

                      {firstProduct.desc || secondProduct.desc ? (
                        <tr>
                          <td className="w-[16%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            Summary
                          </td>
                          <td className="w-[42%] py-3 px-4 lg:pr-12 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            {firstProduct.desc}
                          </td>
                          <td className="w-[42%] py-3 px-4 lg:pr-12 text-sm font-semibold border-b border-x border-l border-[#A7B7DD] text-start">
                            {secondProduct?.desc}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}

                      {/* {firstProduct.weight || secondProduct.weight ? (
                        <tr>
                          <td className="w-[16%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            Weight
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            {firstProduct.weight}
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-l border-x border-[#A7B7DD] text-start">
                            {secondProduct.weight}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )} */}

                      {/* {firstProduct?.dimenssions ||
                      secondProduct?.dimenssions ? (
                        <tr>
                          <td className="w-[16%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            Dimenssions
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            {firstProduct?.dimenssions}
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-x border-l border-[#A7B7DD] text-start">
                            {secondProduct?.dimenssions}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )} */}

                      {/* {firstProduct?.processor || secondProduct?.processor ? (
                        <tr>
                          <td className="w-[16%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            Processor
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-l border-[#A7B7DD] text-start">
                            {firstProduct?.processor}
                          </td>
                          <td className="w-[42%] py-3 px-4 text-sm font-semibold border-b border-x border-l border-[#A7B7DD] text-start">
                            {secondProduct?.processor}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )} */}
                    </tbody>
                  </table>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  className="flex rounded-xl select-none touch-none p-0.5 bg-slate-100 transition-colors duration-[160ms] ease-out hover:bg-slate-200 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb className="flex-1 bg-slate-400 rounded-xl relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar
                  className="flex rounded-xl select-none touch-none p-0.5 bg-slate-100 transition-colors duration-[160ms] ease-out hover:bg-slate-200 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                  orientation="horizontal"
                >
                  <ScrollArea.Thumb className="flex-1 bg-slate-400 rounded-xl relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="bg-slate-100" />
              </ScrollArea.Root>
              <div className=" flex gap-3 sm:gap-12 md:gap-24 justify-center items-center">
                {firstProduct && (
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() =>
                        router.push(`/product/${firstProduct._id}`)
                      }
                      primary
                      className="rounded-md py-3 px-8"
                    >
                      <MdShoppingCart className="text-base lg:text-lg" />
                      Buy now
                    </Button>
                    <Button
                      onClick={() =>
                        handleCompareProducts(firstProduct)
                      }
                      className="border py-3 px-8 border-[#FE3B20] text-[#FE3B20] rounded-md"
                    >
                      <RiDeleteBin6Fill className="text-base lg:text-lg" />
                      Remove
                    </Button>
                  </div>
                )}
                {secondProduct && (
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() =>
                        router.push(`/product/${secondProduct._id}`)
                      }
                      primary
                      className="rounded-md py-3 px-8"
                    >
                      <MdShoppingCart className="text-base lg:text-lg" />
                      Buy now
                    </Button>
                    <Button
                      onClick={() =>
                        handleCompareProducts(secondProduct)
                      }
                      className="border py-3 px-8 border-[#FE3B20] text-[#FE3B20] rounded-md"
                    >
                      <RiDeleteBin6Fill className="text-base lg:text-lg" />
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full ">
              <div className="border-t bg-[#F8F6F6] py-3 border-x border-[#F8F6F6]  w-full">
                <span className="pl-4 font-semibold">
                  No product(s) to compare
                </span>
              </div>
              <div className="flex justify-center items-center mt-12 flex-col">
                <div className="h-[7rem] w-[10rem] lg:w-[10rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                  <Image src={imags.noResult} alt={`Not found image`} fill />
                </div>
                <h4 className="font-extrabold text-sm">
                  Sorry!.., No item Found
                </h4>
                <span className="text-gray-500 text-xs">
                  Add items to compare by going
                  <Link
                    href={"/"}
                    className="inline-block ml-2 font-semibold text-orange-600 hover:underline transition-all duration-300 text-[0.8rem]"
                  >
                    back to shop
                  </Link>
                </span>
              </div>
            </div>
          )}
        </div>
        <NewsLetter />
      </main>
    </Main>
  );
}
