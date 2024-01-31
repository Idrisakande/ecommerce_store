import { WishlistContext } from "@/contexts/WishlistContextProvider";
import { updateCartData } from "@/redux/features/cart.slice";
import store from "@/redux/store";
import CartActions from "@/services/cart.services";
import CategoriesActions from "@/services/categories.services";
import ProductsActions from "@/services/products.services";
import { T_error_response } from "@/types/auth.type";
import { T_compare_context, T_product_data } from "@/types/products";
import { RootState } from "@/types/store.type";
import { T_wishlist_context } from "@/types/wishlist";
import { handleErrors } from "@/utils/errors.util";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MdArrowForwardIos, MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  BsFillHeartFill,
  BsHeart,
  BsPlus,
  BsStar,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";
import { SliderDetails } from "./SliderDetails";
import { IoCheckmark } from "react-icons/io5";
import { CompareContext } from "@/contexts/CompareContextProvider";
import { FaMinus } from "react-icons/fa";
import { Button } from "./widgets/Button";
import { NewsLetter } from "./NewsLetter";
import { SimilarProducts } from "./SimilarProducts";
import { ProductDetailsInfo } from "./ProductDetailsInfo";
import { FaArrowsRotate } from "react-icons/fa6";
import { AddToCartModel } from "./AddToCartModel";
import { useRouter } from "next/router";
import Main from "@/layouts/main";
import Image from "next/image";
import images from "@/constants/images";
import { LoadingPage } from "./LoadingPage";

interface ProductdetailscardProps {
  id: string;
}

const Productdetailscard: FC<ProductdetailscardProps> = ({ id }) => {
  const { push } = useRouter();
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  // const [itemInWishlist, setItemInWishlist] = useState<boolean>();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [oneProduct, setOneProduct] = useState<T_product_data | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [wishlistData, setWishlistData] = useState<T_wishlist_data>();
  useEffect(() => {
    console.log("Dynamic product ID:", id || "(No ID provided)");
    const productApis = new ProductsActions();
    console.log("game");
    if (id) {
      console.log(id);
      productApis
        .getOneProduct(id! as string)
        .then((data) => {
          console.log(data);
          setOneProduct(data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);
  console.log(oneProduct);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };
  // const handleselected = () => {
  //   // console.log("Selected Color:", selectedColor);
  //   // console.log("Selected Size:", selectedSize);
  // };

  // add to cart function
  const handleAddToCart = async (payload: {
    productId: string;
    quantity?: number;
  }) => {
    try {
      const { data } = await axios.post(`/api/carts`, payload, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        // ${store.store.getState().auth.token}
      });
      getCartData();
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  };
  // remove item from cart
  const decreaseQuantityItem = async () => {
    try {
      const { data } = await axios.delete(`/api/carts/${oneProduct?._id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      getCartData();
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  };
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
    if (productQuantity === oneProduct?.quantity) return;
    handleAddToCart({ productId: oneProduct?._id as string });
  };
  // decrease item quantity
  const decreaseItemQuantity = async () => {
    if (productQuantity === 0) return;
    decreaseQuantityItem();
  };
  // add user choice to the cart
  const addItemOptionsToCart = () => {
    handleAddToCart({
      productId: oneProduct?._id as string,
      quantity: productQuantity,
    });
    setIsModelOpen(true);
  };

  useMemo(async () => {
    const categoryService = new CategoriesActions();
    const categories = await categoryService.getCategories();
    return categories;
  }, []);
  const { categories } = useSelector((state: RootState) => state.categories);
  const categoryName = useMemo(() => {
    if (categories) {
      const category = categories.find(
        (item) => item._id === oneProduct?.categoryId._id
      );
      return category?.name;
    }
    return;
  }, []);
  //     const handleAddToCart = async () => {
  //     if (isAuthenticated) {
  //       if (productQuantity === oneProduct?.quantity) return;
  //       const cartServices = await new CartActions();
  //       cartServices.addToCart({ productId: oneProduct?._id });
  //       setModelOpen(true);
  //     } else {
  //       // console.log("Not Authenticated");
  //     }
  //   };

  //   const decreaseFromCart = async () => {
  //     if (isAuthenticated) {
  //       if (productQuantity === 0) return;
  //       const cartServices = new CartActions();
  //       cartServices.decreaseQuantityItem(oneProduct?._id); // Send the productId directly
  //     } else {
  //       // console.log("Not Authenticated");
  //     }
  //   };
  useEffect(() => {
    getCart();
  }, []);
  const getCart = useCallback(async () => {
    const cartService = new CartActions();
    const cart = await cartService.getCart();
    return cart;
  }, []);

  const { cart } = useSelector((state: RootState) => state.cart);
  // const productQuantity = useMemo(() => {
  //     if (cart.numberOfItems > 0) {
  //       return cart.items?.filter((item) => item.productId === oneProduct?._id)[0]
  //         ?.quantity;
  //     }
  //     return 0;
  //   }, [cart.numberOfItems, cart.items, oneProduct?._id]);
  const discountPrice = useMemo(() => {
    if (
      oneProduct &&
      oneProduct.discount > 0 &&
      oneProduct.discount !== undefined
    ) {
      // const roundUpDiscount = discount.toFixed(2) as unknown as number;
      const disctPrice =
        oneProduct.price - (oneProduct.discount / 100) * oneProduct.price;
      return disctPrice.toFixed(2) as unknown as number;
    }
    return oneProduct?.price.toFixed(2) as unknown as number;
  }, [oneProduct?.price, oneProduct?.discount]);
  const oneCartItem = useMemo(() => {
    if (cart && cart.items) {
      const item = cart.items.find(
        (item) => item.productId?._id === oneProduct?._id
      );
      return item;
    }
    return null;
  }, [cart, cart.items, oneProduct?._id]);

  const productQuantity = useMemo(() => {
    if (oneProduct && oneProduct?.quantity >= 0) {
      const quantity = 0;
      if (
        oneCartItem &&
        oneCartItem !== undefined &&
        oneCartItem.quantity > 0
      ) {
        const itemquantity = quantity + oneCartItem.quantity;
        return itemquantity;
      }
      return quantity;
    }
    return 0;
  }, [oneProduct, oneProduct?.quantity, oneCartItem, oneCartItem?.quantity]);
  // wishlist context to manage item(s) wishlist
  const [itemInWishlist, setItemInWishlist] = useState<boolean>();
  const { wishlistData, handleAddToWishList, handleRemoveFromWishList } =
    (useContext(WishlistContext) as T_wishlist_context) || {};
  const toggleRemoveFromWishlist = () => {
    if (itemInWishlist === true) {
      handleRemoveFromWishList(oneProduct?._id as string);
      toast.info("Item removed successfuliy", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    return;
  };
  const toggleAddToWishlist = () => {
    if (itemInWishlist !== true) {
      handleAddToWishList(oneProduct?._id as string);
      toast.success("Item added successfuliy", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    return;
  };
  useEffect(() => {
    if (wishlistData) {
      const isFound = wishlistData.productsId.includes(
        oneProduct?._id as string
      );
      setItemInWishlist(isFound);
    }
    return;
  }, [wishlistData, oneProduct?._id]);

  // compare context to manage compare product
  const { compareProducts } = useContext(CompareContext) as T_compare_context;
  const itemIncomparelist = useMemo(() => {
    const isProductInCompareList = compareProducts?.some(
      (product) => product._id === oneProduct?._id
    );
    return isProductInCompareList;
  }, [compareProducts]);

  const fixedPrice = oneProduct?.price.toFixed(2) as unknown as number;
  const fixedDiscount = oneProduct?.discount.toFixed(1) as unknown as number;
  
  const { handleCompareProducts} = useContext(
    CompareContext
  ) as T_compare_context;

  return (
    <>
      {isLoading ? (
        <LoadingPage/>
      ) : oneProduct ? (
        <Main>
          <main className="pt-10 bg-[#F2F5F7] min-h-screen">
            <section className="px-2 flex gap-1 sm:gap-2 justify-start items-center max-w-[92%] sm:max-w-[80%] md:max-w-[85%] mx-auto">
              <h3 className="text-sm md:text-[1.4rem] flex gap-1 justify-center items-center font-semibold text-[#0C0E3B]">
                Home{" "}
                <MdArrowForwardIos className="text-[#999999] mt-1 text-[0.65rem]" />
              </h3>
              {categoryName && (
                <h3 className="text-xs md:text-base flex gap-1 items-center justify-center font-semibold text-[#999999]">
                  {categoryName.trim().split(" ")[0]}{" "}
                  <MdArrowForwardIos className="text-[#999999] mt-1 text-[0.65rem] md:text-xs" />
                </h3>
              )}
              {oneProduct?.brand && (
                <h3 className="text-xs md:text-base flex gap-1 items-center justify-center font-semibold text-[#999999]">
                  {oneProduct?.brand}{" "}
                  <MdArrowForwardIos className="text-[#999999] mt-1 text-[0.65rem]" />
                </h3>
              )}

              <h3 className="text-[0.55rem] md:text-base font-semibold text-[#999999]">
                {`${oneProduct?.name.slice(0, 30)}...`}
              </h3>
            </section>

            <section className="bg-white py-6 mt-4 md:pt-8 lg:pt-12 px-4 md:px-8 max-w-[92%] sm:max-w-[80%] md:max-w-[85%]  mx-auto flex flex-col gap-4 md:gap-8 md:flex-row md:justify-start md:items-start rounded-lg">
              <div className="md:max-w-[40%] lg:max-w-[35%] md:w-full flex justify-center items-center">
                <SliderDetails oneProduct={oneProduct} />
              </div>
              <div className="md:max-w-[75%] lg:max-w-[75%] md:w-full h-[2px] bg-slate-200 w-full mt-8 md:hidden" />
              <div className="flex justify-center items-center py-4 md:pt-0 w-full max-w-full">
                <div className="flex flex-col max-w-full w-full ">
                  <div className="flex flex-col max-w-[24rem] mx-auto md:max-w-full w-full">
                    <div className="flex w-full">
                      <div className="flex flex-col gap-1 w-full">
                        <span
                          className={`${
                            oneProduct?.isOutOfStock === false
                              ? "text-[#00B517]"
                              : "text-red-400"
                          } flex gap-1 text-[0.9rem] font-bold justify-start items-center`}
                        >
                          <IoCheckmark className="text-lg lg:text-xl" />
                          {oneProduct?.isOutOfStock === false
                            ? "In Stock"
                            : "Out of stock"}
                        </span>
                        <h2 className="font-bold lg:mt-1 md:text-lg lg:text-xl leading-5 lg:leading-6 max-w-[90%] lg:max-w-[75%] text-[#1C1C1C] tracking-tight ">
                          {oneProduct?.name}
                        </h2>
                        <div className="flex gap-1 justify-start mt-2 md:mt-1 lg:mt-3 items-center">
                          {Array(5)
                            .fill("_")
                            .map((star, index) => (
                              <div
                                className={`${
                                  index < oneProduct?.ratings
                                    ? "text-[#FF9E3A]"
                                    : "text-slate-500"
                                }  text-sm md:text-xs flex`}
                                key={index}
                              >
                                {index < oneProduct?.ratings ? (
                                  index === Math.floor(oneProduct?.ratings) &&
                                  oneProduct?.ratings % 1 !== 0 ? (
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
                        <div className="flex mt-3 md:mt-2 lg:mt-3 justify-start items-center">
                          <span className="mr-9 font-bold text-[]">
                            {discountPrice}
                          </span>
                          <span className="mr-2 text-[#8B96A5] text-[0.9rem]">
                            #{fixedPrice}
                          </span>
                          {oneProduct?.discount > 0 ? (
                            <span className="text-[#8B96A5] text-[0.9rem]">
                              {`${fixedDiscount}% off`}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex justify-end items-start pr-4">
                        {itemInWishlist === true ? (
                          <BsFillHeartFill
                            onClick={toggleRemoveFromWishlist}
                            size={20}
                            className={`text-[#FF9E3A] cursor-pointer`}
                          />
                        ) : (
                          <BsHeart
                            onClick={toggleAddToWishlist}
                            size={20}
                            className={` text-[#FF9E3A] cursor-pointer `}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="h-[2px] bg-slate-200 w-full mt-5" />

                  <div className="flex flex-col max-w-[24rem] mx-auto md:max-w-full w-full mt-6 md:mt-3 lg:mt-6 gap-3">
                    {oneProduct?.size && (
                      <div className="flex mt-1 w-full flex-col gap-2 justify-start items-start">
                        <h2 className="tracking-tight flex justify-start font-semibold">
                          Size
                        </h2>
                        <div className="flex gap-2 justify-start items-start">
                          {oneProduct?.size.split(",").map((value) => {
                            return (
                              <button
                                key={value}
                                className="flex justify-center pt-[2px] border border-slate-500 items-center hover:scale-105 transition duration-500 text-[0.6rem] w-[1.7rem] h-[1rem] bg-gradient-outofstock "
                                onClick={() => handleSizeSelect(value)}
                              >
                                {value}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {oneProduct?.color && (
                      <div className="flex flex-col gap-2 justify-start items-start">
                        <h2 className="tracking-tight flex justify-start font-semibold">
                          Color
                        </h2>
                        <div className="flex gap-2 justify-start items-start">
                          {oneProduct?.color.map((col) => {
                            return (
                              <button
                                style={{ background: col }}
                                key={col}
                                className={`border border-gray-300 hover:scale-95 transition duration-500 rounded-md  w-[1.75rem] h-[1.75rem] `}
                                onClick={() => handleColorSelect(col)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col gap-2 justify-start items-start">
                      <p className="tracking-tight flex justify-start font-semibold">
                        Quantity
                      </p>
                      <div className="flex justify-start items-center gap-2">
                        <button
                          onClick={decreaseItemQuantity}
                          className="w-[2rem] hover:scale-95 transition duration-500 h-[1.2rem] bg-[#232F3E] text-white border border-afruna-blue flex justify-center items-center"
                        >
                          <FaMinus size={15} />
                        </button>
                        <button className="w-[2rem] h-[1.2rem] border border-[#FFC584] flex justify-center items-center text-[0.6rem]">
                          {productQuantity}
                        </button>
                        <button
                          onClick={increaseItemQuantity}
                          className="w-[2rem] hover:scale-95 transition duration-500 text-white h-[1.2rem] bg-afruna-blue  border border-afruna-blue flex justify-center items-center"
                        >
                          <BsPlus size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt-3 px-4 md:px-0 justify-start items-center">
                      <Button
                        fullWidth
                        onClick={() => addItemOptionsToCart()}
                        className="border border-[#0C0E3B] lg:max-w-[10rem] text-[#0C0E3B] rounded-md"
                      >
                        <MdShoppingCart className="text-base lg:text-lg" /> Add
                        to Cart
                      </Button>
                      <Button
                        fullWidth
                        primary
                        onClick={() => push("/cart")}
                        className="px-10 py-[0.65rem] lg:max-w-[10rem] rounded-md"
                      >
                        Buy Now
                      </Button>

                      <AddToCartModel
                        oneProduct={oneProduct}
                        isOpen={isModelOpen}
                        onClose={() => setIsModelOpen(false)}
                      />
                    </div>
                    <div className="mt-3">
                      <Button
                        onClick={() => {handleCompareProducts(oneProduct)}}
                        className="border border-transparent text-lg lg:text-xl hover:border-[#FFC584] text-[#FFC584] rounded-md transition-all duration-300"
                      >
                        <FaArrowsRotate className="text-lg lg:text-xl" />{" "}
                        {itemIncomparelist
                          ? "Remove item from compare list "
                          : "Add item to compare"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <ProductDetailsInfo oneProduct={oneProduct} />

            <SimilarProducts oneProduct={oneProduct} />

            {/* Newsletter */}
            <NewsLetter />
          </main>
        </Main>
      ) : (
        <Main>
          <main className="pt-10 bg-[#F2F5F7] text-xl gap-3 font-bold min-h-screen flex flex-col justify-center items-center">
            <div className="h-[7rem] w-[7rem] lg:w-[10rem] lg:h-[10rem] overflow-hidden mx-auto relative">
              <Image src={images.noResult} alt={`Not found image`} fill />
            </div>
            <h4>Sorry!.., No Result Found</h4>
            <span>The product detail is not provided</span>
          </main>
        </Main>
      )}
    </>
  );
};

export default Productdetailscard;
