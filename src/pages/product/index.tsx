import { AddToCartModel } from "@/components/AddToCartModel";
import { NewsLetter } from "@/components/NewsLetter";
import { ProductDetailsInfo } from "@/components/ProductDetailsInfo";
import { SimilarProducts } from "@/components/SimilarProducts";
import { SliderDetails } from "@/components/SliderDetails";
import { Button } from "@/components/widgets/Button";
import Main from "@/layouts/main";
import {
  T_compare_context,
  T_initial_product_state,
  T_product_data,
  T_products_sorting_context,
} from "@/types/products";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FaArrowsRotate, FaMinus } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import { MdArrowForwardIos, MdNavigation, MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import ProductsActions from "@/services/products.services";
import { T_error_response, T_initial_auth_state } from "@/types/auth.type";
import CartActions from "@/services/cart.services";
import { T_initial_cart_state } from "@/types/cart.type";
import { T_wishlist_context } from "@/types/wishlist";
import CategoriesActions from "@/services/categories.services";
import {
  T_categories_data,
  T_initial_categories_state,
} from "@/types/categories";
import { handleErrors } from "@/utils/errors.util";
import axios, { AxiosError } from "axios";
import store from "@/redux/store";
import { updateCartData } from "@/redux/features/cart.slice";
import Cookies from "js-cookie";
import { WishlistContext } from "@/contexts/WishlistContextProvider";
import { toast } from "react-toastify";
import { CompareContext } from "@/contexts/CompareContextProvider";
import { ProductSidebar } from "@/components/ProductSidebar";
import { AiFillAppstore } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import ItemPicker from "@/components/ItemPicker";
import { LoadingStateContext } from "@/contexts/LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { RootState } from "@/types/store.type";
import { ProductCard } from "@/components/ProductCard";
import { ProductsContext } from "@/contexts/ProductsContextProvider";
import { LoadingPage } from "@/components/LoadingPage";
import { GridCard } from "@/components/GridCard";
import { RxCross2 } from "react-icons/rx";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
// type Props = {
//   params: {
//     id: string;
//   };
// };
7;
// { params: { id } }: Props

export default function Index() {
  const {
    categoryName,
    selectedBrands,
    setCategoryName,
    sortedProducts,
    setAllProducts,
    setSortedProducts,
    handleBrandsFiltering,
    lowprice,
    highprice,
    closePricebox,
    priceRangeSelected,
    condition,
    handleConditionsFiltering,
    ratingValue,
    handleRatingsFiltering,
  } = useContext(ProductsContext) as T_products_sorting_context;
  useMemo(() => setCategoryName("All Categories"), [setCategoryName]);
  const [categories, setCategories] = useState<T_categories_data[]>([]);
  const { isLoading, setIsloading } = useContext(
    LoadingStateContext
  ) as T_loading_provider;
  const router = useRouter();
  // useEffect(() => {
  //   router.prefetch
  // }, [router])

  useMemo(async () => {
    setIsloading && setIsloading(true);
    try {
      const { data } = await axios.get(`/api/products`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      // console.log(data.data);
      //   setAllProducts(data.data);
      setSortedProducts(data.data);
      setAllProducts(data.data);
      return data.data;
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    } finally {
      setIsloading && setIsloading(false);
    }
  }, []);

  useMemo(async () => {
    try {
      const { data } = await axios.get(`/api/categories`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      // console.log(data.data);
      setCategories(data.data);
      return data.data;
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  }, []);
  const { query, push } = useRouter();
  useMemo(async () => {
    const productService = new ProductsActions();
    // const product = await productService.getOneProduct(id as string);
    // // console.log(product); // Log the fetched product
    // return product; // Return the fetched product
  }, []);
  const { oneProduct } = useSelector(
    (state: RootState) => state.products as T_initial_product_state
  );
  const productsNumber = sortedProducts.length;
  const [isFlexDisplay, setIsFlexDisplay] = useState<boolean>(true);
  const toggleflexDispaly = useCallback(() => {
    if (isFlexDisplay) return;
    setIsloading && setIsloading(true); // Set isLoading to true before the toggle
    // Use setTimeout to simulate a loading delay
    setTimeout(() => {
      setIsFlexDisplay(true);
      setIsloading && setIsloading(false); // Set isLoading to false after the toggle
    }, 1000);
  }, [isFlexDisplay, setIsloading]);
  const toggleGridDispaly = useCallback(() => {
    if (!isFlexDisplay) return;
    setIsloading && setIsloading(true); // Set isLoading to true before the toggle
    // Use setTimeout to simulate a loading delay
    setTimeout(() => {
      setIsFlexDisplay(false);
      setIsloading && setIsloading(false); // Set isLoading to false after the toggle
    }, 1000);
  }, [isFlexDisplay, setIsloading]);

  const filBrand = [
    { name: "Brand X" },
    { name: "Brand Y" },
    { name: "Brand Z" },
  ];

  if (isLoading) {
    return <LoadingPage />;
  }

  // if there is product item
  return (
    <Main>
      <main className="pt-3 bg-[#F2F5F7] w-full">
        <div className="flex flex-col gap-4">
          <section className="w-[100%]">
            <div className="flex gap-1 sm:gap-2 justify-start items-end">
              <h3 className="text-base flex gap-1 justify-center items-center font-semibold text-[#0C0E3B]">
                Home{" "}
                <MdArrowForwardIos className="text-[#999999] mt-1 text-[0.65rem] md:text-xs" />
              </h3>
              {/* {categoryName && ( */}
              <h3 className="text-sm flex gap-1 items-center justify-center font-semibold text-[#999999]">
                {/* {categoryName.trim().split(" ")[0]}{" "} */} Phone &
                Accesories
                <MdArrowForwardIos className="text-[#999999] mt-1 text-[0.65rem] md:text-xs" />
              </h3>
              {/* )} */}
              {/* {oneProduct.brand && ( */}
              <h3 className="text-sm flex gap-1 items-center justify-center font-semibold text-[#999999]">
                {/* {oneProduct.brand}{" "} */} Phone
              </h3>
              {/* )} */}
            </div>
          </section>

          <div className="grid grid-cols-12 relative top-0 left-2">
            {/* product filters */}
            <section id="filters" className="w-1/2 top-14 absolute md:top-0 md:relative hidden md:col-span-4 lg:col-span-3 lg:block">
              <ProductSidebar
              // categories={categories}
              />
            </section>

            <section className="w-full md:col-span-8 lg:col-span-9">
              <div className="min-w-full w-screen p-3 bg-white flex justify-between items-center">
                <button onClick={()=>{
                  //handle toggle filters

                  const el = document.querySelector("#filters") as HTMLTableSectionElement;
                  if (el.classList.contains("hidden")){
                    el.classList.remove("hidden");
                    el.classList.add("z-20")
                    el.classList.add("bg-white")
                  }else {
                    el.classList.add("hidden");
                    el.classList.remove("z-20")
                  }
                }} className="inline-block md:hidden"><HamburgerMenuIcon /></button>
                <p className="text-sm">
                  {productsNumber} items
                  <span className="font-semibold ml-1">{categoryName}</span>
                </p>
                <div className="flex items-center justify-start gap-2 w-fit ">
                  <fieldset className="flex w-full flex-col gap-1 ">
                    <ItemPicker
                      items={[
                        "Hype",
                        
                      ]}
                      placeholder={"Hype"}
                      getSelected={(val) => {}}
                      // contentClassName={"p-2 bg-white text-xs"}
                      triggerClassName="px-3 py-[0.3rem] rounded max-w-[8rem] w-full"
                    />
                  </fieldset>
                  <div className="flex items-center gap-1">
                    <span
                      onClick={toggleflexDispaly}
                      className={`${
                        isFlexDisplay && "bg-[#FFF4EA]"
                      } border hover:bg-[#FFF4EA] duration-300 transition-all border-afruna-blue w-7 h-6 cursor-pointer flex justify-center items-center`}
                      >
                      <AiFillAppstore className="text-lg text-afruna-blue" />
                    </span>
                    <span
                      onClick={toggleGridDispaly}
                      className={`${
                        !isFlexDisplay && "bg-[#FFF4EA]"
                      } border hover:bg-[#FFF4EA] duration-300 transition-all border-afruna-blue w-7 h-6 cursor-pointer flex justify-center items-center`}
                    >
                      <BiMenu className="text-lg text-afruna-blue" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit gap-2 flex justify-start items-center">
                {selectedBrands && selectedBrands.length ? (
                  <div className="flex gap-1 items-center w-full">
                    {selectedBrands.map((item, index) => (
                      <div
                        key={index}
                        className="w-fit bg-white border text-blue-400 border-orange-400 p-1 flex items-center gap-1 rounded"
                        >
                        <h3 className="text-xs">{item}</h3>
                        <button
                          type="button"
                          className="flex justify-center items-center focus:outline-none "
                          onClick={() => handleBrandsFiltering(item)}
                        >
                          <RxCross2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
                {condition !== "" ? (
                  <div className="flex gap-1 items-center w-fit">
                    <div className="w-fit bg-white border text-blue-400 border-orange-400 p-1 flex items-center gap-1 rounded">
                      <h3 className="text-xs">{condition}</h3>
                      <button
                        type="button"
                        className="flex justify-center items-center focus:outline-none "
                        onClick={() => handleConditionsFiltering(condition)}
                      >
                        <RxCross2 size={13} />
                      </button>
                    </div>
                  </div>
                ) : null}
                {ratingValue ? (
                  <div className="flex gap-1 items-center w-fit">
                    <div className="w-fit bg-white border text-blue-400 border-orange-400 p-1 flex items-center gap-1 rounded">
                      <h3 className="text-xs">
                        Less/equal {ratingValue} rating
                      </h3>
                      <button
                        type="button"
                        className="flex justify-center items-center focus:outline-none "
                        onClick={() => handleRatingsFiltering(ratingValue)}
                        >
                        <RxCross2 size={13} />
                      </button>
                    </div>
                  </div>
                ) : null}
                {priceRangeSelected ? (
                  <div className="flex gap-1 items-center w-fit">
                    <div className="w-fit bg-white border text-blue-400 border-orange-400 p-1 flex items-center gap-1 rounded">
                      <h3 className="text-xs">
                         {`$${lowprice} - $${highprice}`}
                      </h3>
                      <button
                        type="button"
                        className="flex justify-center items-center focus:outline-none "
                        onClick={() => closePricebox()}
                      >
                        <RxCross2 size={13} />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              {/*== main  products  listing ==*/}
              <div
                className={`${
                  isFlexDisplay ? "" : "hidden"
                } w-screen mt-10 grid grid-cols-2 gap-1 md:gap-3 lg:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:max-w-[95%] ml-5`}
                >
                {sortedProducts &&
                  sortedProducts.map((product) => {
                    return <ProductCard key={product._id} {...product} />;
                  })}
              </div>

              <div
                className={`${
                  isFlexDisplay
                    ? "hidden"
                    : "flex flex-col gap-4 mt-2 w-full"
                } `}
              >
                {sortedProducts &&
                  sortedProducts.map((product) => {
                    return <GridCard key={product._id} {...product} />;
                  })}
              </div>
            </section>
          </div>
        </div>
        {/* Newsletter */}
        <NewsLetter />
      </main>
    </Main>
  );
}
