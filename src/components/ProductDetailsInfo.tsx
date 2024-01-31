import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { IoCheckmark } from "react-icons/io5";
import Image from "next/image";
import images from "@/constants/images";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { Button } from "./widgets/Button";
import { RiGlobalLine } from "react-icons/ri";
import axios, { AxiosError } from "axios";
import { handleErrors } from "@/utils/errors.util";
import { T_product_data } from "@/types/products";
import ReviewsActions from "@/services/reviews.services";
import { RootState } from "@/types/store.type";
import { useSelector } from "react-redux";
import { ReviewCard } from "./ReviewCard";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { T_error_response } from "@/types/auth.type";
import imags from "@/constants/images";
import UsersActions from "@/services/user.services";
import { T_user_data } from "@/types/user";
import { LoadingStateContext } from "@/contexts/LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { verifyImageUrl } from "@/utils/verify_image_url";

interface ProductDetailsInfoProps {
  oneProduct: T_product_data;
}

export const ProductDetailsInfo: FC<ProductDetailsInfoProps> = ({
  oneProduct,
}: any) => {
  const { setIsloading } = useContext(
    LoadingStateContext
  ) as T_loading_provider;
  useEffect(() => {
    const userService = new UsersActions();
    userService.getMyData({ setIsloading: setIsloading });
  }, [setIsloading]);

  const [vendor, setVendor] = useState<T_user_data>();
  const [isFollowing, setIsFollowing] = useState<boolean>();

  const table = useMemo(() => {
    // Define a type for the extracted key-value pairs
    interface KeyValueTable {
      [key: string]: string | number | boolean | string[];
    }

    // Fields to exclude
    const excludedFields: string[] = [
      "images",
      "coverPhoto",
      "_id",
      "frequency",
      "hype",
      "createdAt",
      "updatedAt",
      "blocked",
      "ratedBy",
      "vendorId",
      "__v",
      "customId",
      "isPromoted",
      "inWishlist",
      "desc",
    ];

    // Create a table for the extracted key-value pairs
    const table: KeyValueTable = {};

    // Loop through the product object
    for (const key in oneProduct) {
      if (!excludedFields.includes(key)) {
        if (key === "categoryId" && typeof oneProduct[key] === "object") {
          // Handle sub-fields in categoryId
          for (const subKey in oneProduct[key] as any) {
            if (subKey === "options") {
              // Handle options within categoryId

              table[`Attributes`] = oneProduct[key][subKey] as any;
            } else if (subKey === "name") {
              table[`category`] = oneProduct[key][subKey];
            }
          }
        } else if (key === "options") {
          for (const option of oneProduct[key] as unknown as string[]) {
            if (option) {
              Object.entries(option).map(([subKey, value]) => {
                //exlude quantity field
                if (subKey !== "quantity") {
                  table[subKey] = value;
                }
              });
            }
          }
        } else {
          const value = oneProduct[key];
          table[key] =
            typeof value == "number"
              ? (value as unknown as number).toLocaleString()
              : typeof value == "string" || typeof value == "object"
              ? value
              : value === true
              ? "Yes"
              : "No";
        }
      }
    }
    return table;
  }, [oneProduct]);
  //Update table
  useEffect(() => {
    // Get the table body element
    const tableBody = document.querySelector(
      "#productTable tbody"
    ) as HTMLTableSectionElement;

    tableBody.innerHTML = "";

    // Populate the table with data
    for (const key in table) {
      const row = tableBody.insertRow();
      row.className = "grid grid-cols-3 gap-2 w-full border border-slate-300";
      const attributeCell = row.insertCell(0);
      attributeCell.className = "p-3 capitalize col-span-1 bg-slate-300";
      const valueCell = row.insertCell(1);
      valueCell.className = "p-3 col-span-2";
      attributeCell.textContent = key;
      valueCell.textContent = String(table[key]); // Ensure the value is a string
    }
  }, [table]);

  useMemo(async () => {
    try {
      const { data } = await axios.get(
        `/api/users/${oneProduct?.vendorId?._id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setVendor(data.data);
      // console.log(data.data);
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  }, [oneProduct, oneProduct?.vendorId?._id]);
  const { myData } = useSelector((state: RootState) => state.users);
  const following =
    myData && myData.following?.includes(oneProduct?.vendorId?._id);

  const handleFollowSeller = useCallback(async () => {
    try {
      const { data } = await axios.put(
        `/api/users/follow`,
        { userId: oneProduct?.vendorId?._id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const userService = new UsersActions();
      userService.getMyData({ setIsloading: setIsloading }).then((data) => {
        const my_data = data as T_user_data;
        const following =
          my_data && my_data.following.includes(oneProduct?.vendorId?._id);
        setIsFollowing(following); // Update the isFollowing state
        // console.log(following);

        if (following) {
          toast.success("You have followed the seller", {
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
          toast.info("You have unfollowed the seller", {
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
      });
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  }, [oneProduct?.vendorId?._id, isFollowing]);

  useMemo(async () => {
    const reviewService = new ReviewsActions();
    const review = await reviewService.getReviewsByProduct(oneProduct?._id);
    return review;
  }, [oneProduct?._id]);

  const { reviewsOfSingleProduct } = useSelector(
    (state: RootState) => state.reviews
  );

  return (
    <Tabs.Root
      className="flex flex-col mt-8 w-full rounded-xl bg-white max-w-[92%] sm:max-w-[85%] mx-auto"
      defaultValue="tab1"
    >
      <Tabs.List className="flex " aria-label="Manage your account">
        <Tabs.Trigger
          className="px-4 text-sm md:text-base md:px-8 h-[2.5rem] group pb-3 flex flex-col items-start justify-end font-extrabold leading-none select-none transition-all duration-300 hover:text-[#FFC283] data-[state=active]:text-[#FFC283] outline-none cursor-pointer"
          value="tab1"
        >
          <span className="-mb-[0.5rem]">Product details</span>
          <div className="h-[10px] -mb-[0.9rem] z-10 w-[5rem] group-data-[state=active]:border-orange-400 transition-all duration-300 border-b-2 border-transparent" />
        </Tabs.Trigger>
        <Tabs.Trigger
          className="px-4 text-sm md:text-base md:px-8 h-[2.5rem] group pb-3 flex flex-col items-start justify-end font-extrabold leading-none select-none transition-all duration-300 hover:text-[#FFC283] data-[state=active]:text-[#FFC283] outline-none cursor-pointer"
          value="tab2"
        >
          <span className="-mb-[0.5rem]">Reviews</span>
          <div className="h-[10px] -mb-[0.9rem] z-10 w-[5rem] group-data-[state=active]:border-orange-400 transition-all duration-300 border-b-2 border-transparent" />
        </Tabs.Trigger>
      </Tabs.List>
      <div className="border-b w-full border-orange-200 max-w-[94.2%] mx-auto" />
      {/* focus:shadow-[0_0_0_2px] focus:shadow-black */}
      <Tabs.Content
        className="grow px-4 md:px-8 pt-8 pb-12  bg-white rounded-b-xl outline-none"
        value="tab1"
      >
        <div className="flex flex-col lg:flex-row lg:justify-start lg:items-start gap-10 lg:mt-4">
          <div className="flex flex-col lg:max-w-[70%] w-full">
            <p className="text-[#232F3E] md:max-[70%] text-sm lg:text-base lg:max-w-[85%]">
              {oneProduct?.desc}
            </p>

            <table className="table mt-10 text-left" id="productTable">
              <tbody></tbody>
            </table>

            {/*     <div className="border border-[#E0E7E9] mt-6 lg:mt-8 max-w-[30rem] w-full">
              <div className="flex justify-start items-center">
                <span className="text-[#07090c] py-1 pl-2 text-sm lg:text-base w-[30%] border-b border-[#E0E7E9] bg-gray-200">
                  Brand
                </span>
                <span className="text-gray-600 py-1 pl-2 text-sm lg:text-base w-[70%] border-b border-[#E0E7E9]">
                  {oneProduct.brand}
                </span>
              </div>
              <div className="flex justify-start items-center">
                <span className="text-[#232F3E] py-1 pl-2 text-sm lg:text-base w-[30%] border-b border-[#E0E7E9] bg-gray-200">
                  Material
                </span>
                <span className="text-gray-600 py-1 pl-2 text-sm lg:text-base w-[70%] border-b border-[#E0E7E9]">
                  Plastic
                </span>
              </div>
              <div className="flex justify-start items-center">
                <span className="text-[#232F3E] py-1 pl-2 text-sm lg:text-base w-[30%] border-b border-[#E0E7E9] bg-gray-200">
                  Certificate
                </span>
                <span className="text-gray-600 py-1 pl-2 text-sm lg:text-base w-[70%] border-b border-[#E0E7E9]">
                  ISO-898921212
                </span>
              </div>
              {oneProduct && oneProduct?.size && (
                <div className="flex justify-start items-center">
                  <span className="text-[#232F3E] py-1 pl-2 text-sm lg:text-base w-[30%] border-b border-[#E0E7E9] bg-gray-200">
                    Size
                  </span>
                  <span className="text-gray-600 py-1 pl-2 text-sm lg:text-base w-[70%] border-b border-[#E0E7E9]">
                    {oneProduct.size}
                  </span>
                </div>
              )}
              <div className="flex justify-start items-center">
                <span className="text-[#232F3E] py-1 pl-2 text-sm lg:text-base w-[30%] bg-gray-200">
                  Protection
                </span>
                <span className="text-gray-600 py-1 pl-2 text-sm lg:text-base w-[70%]">
                  Refund policy
                </span>
              </div>
            </div> */}

            <div className="flex flex-col mt-6 lg:mt-8">
              <div className="flex gap-1 justify-start items-start">
                <IoCheckmark className="text-[1.1rem] mt-1 text-orange-500" />
                <p className="text-[0.9rem] lg:text-base text-[#232F3E]">
                  Some great feature name here
                </p>
              </div>
              <div className="flex gap-1 justify-start items-start">
                <IoCheckmark className="text-[1.1rem] mt-1 text-orange-500" />
                <p className="text-[0.9rem] lg:text-base text-[#232F3E]">
                  Lorem ipsum dolor sit amet, consectetur
                </p>
              </div>
              <div className="flex gap-1 justify-start items-start">
                <IoCheckmark className="text-[1.1rem] mt-1 text-orange-500" />
                <p className="text-[0.9rem] lg:text-base text-[#232F3E]">
                  Duis aute irure dolor in reprehenderit
                </p>
              </div>
              <div className="flex gap-1 justify-start items-start">
                <IoCheckmark className="text-[1.1rem] mt-1 text-orange-500" />
                <p className="text-[0.9rem] lg:text-base text-[#232F3E]">
                  Some great feature name here
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 w-full lg:hidden" />

          {vendor && (
            <div className="flex justify-center sm:justify-start lg:max-w-[30%] w-full">
              <div className="flex flex-col py-4 pb-6 rounded-md shadow px-3 max-w-[15rem] sm:max-w-[17.5rem] w-full">
                <div className="flex lg:pl-4 gap-3 justify-start items-center">
                  <div className="rounded-full overflow-hidden w-[4.3rem] h-[4.3rem] sm:w-[5rem] sm:h-[5rem] relative flex justify-center items-center">
                    <Image
                      src={verifyImageUrl(vendor.avatar) ?? images.seller1}
                      alt={`${vendor.firstName} image`}
                      fill
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start gap-1">
                    <h4 className="font-semibold text-[#1C1C1C] text-[0.9rem] text-start">
                      Supplier
                    </h4>
                    <p className="text-[#1C1C1C] font-semibold text-[0.85rem]">
                      {`${vendor.firstName} ${vendor.lastName}`}
                    </p>
                  </div>
                </div>
                <div className="h-[1px] bg-[#E0E0E0] w-full mt-5" />
                <div className="flex flex-col w-full gap-1 mt-4 text-[#8B96A5]">
                  <div className="flex gap-1 max-w-full w-full justify-start items-center">
                    <div className="max-w-[13%] w-full">
                      <Image
                        src={images.ctry1}
                        alt="cty-img"
                        priority
                        className="w-[1.5rem]/ h-[1rem] rounded-sm"
                      />
                    </div>

                    <p className="max-w-[87%] text-sm sm:text-base">{`${vendor.country}, Town`}</p>
                  </div>
                  <div className="flex gap-1 max-w-full w-full justify-start items-center">
                    <div className="max-w-[13%] w-full">
                      <MdOutlineVerifiedUser size={18} />
                    </div>
                    <p className="max-w-[87%] text-sm sm:text-base">
                      Verified Seller
                    </p>
                  </div>
                  <div className="flex gap-1 max-w-full w-full justify-start items-center">
                    <div className="max-w-[13%] w-full">
                      <RiGlobalLine size={18} />
                    </div>
                    <p className="max-w-[87%] text-sm sm:text-base">
                      Worldwide shipping
                    </p>
                  </div>
                  <Button
                    fullWidth
                    className="text-[#0C0E3B] hover:scale-90 duration-500 transition-transform rounded-md mt-5 border border-gray-300"
                    onClick={handleFollowSeller}
                  >
                    {following ? "Unfollow Seller" : "Follow Seller"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Tabs.Content>

      <Tabs.Content
        className="grow px-4 md:px-8 pt-8 pb-12 bg-white rounded-b-xl outline-none"
        value="tab2"
      >
        {reviewsOfSingleProduct && reviewsOfSingleProduct.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-y-10 gap-x-8 lg:max-w-[80%] lg:mx-auto py-10 px-8">
            {reviewsOfSingleProduct.map((item) => {
              return <ReviewCard item={item} />;
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col pt-8">
            <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
              <Image src={imags.noResult} alt={`Not found image`} fill />
            </div>
            <h4 className="font-extrabold mt-2 text-sm">
              Sorry!.., No Result Found
            </h4>
            <span className="text-gray-500 text-xs">
              The is no review for the product yet
            </span>
          </div>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
};
