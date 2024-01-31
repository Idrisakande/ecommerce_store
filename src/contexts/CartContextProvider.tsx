// import react stuff
import { clearCartData, updateCartData } from "@/redux/features/cart.slice";
import store from "@/redux/store";
import { T_error_response } from "@/types/auth.type";
import { T_cart_context, T_cart_data } from "@/types/cart.type";
import { handleErrors } from "@/utils/errors.util";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { LoadingStateContext } from "./LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

interface CartContextProviderProps {
  children: ReactNode;
}

/** === WARNING ===
 * Escaping types error with the any
 * @type{any}
 */

// export create cart context
export const CartContext = createContext<T_cart_context | null>(null);

export const CartContextProvider: FC<CartContextProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // State to manage the cart item(s)
  const [cartData, setCartData] = useState<T_cart_data | null>(null);
  const opt = useContext(LoadingStateContext) as T_loading_provider;

  // useEffect(() => {
  //   getCartData();
  // }, []);

  const getCartData = async () => {
    opt?.setIsloading && opt.setIsloading(true);
    try {
      const { data } = await axios.get(`/api/carts`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      dispatch(updateCartData(data.data));
      setCartData(data.data);
      // console.log(data.data);
    } catch (error) {
      const e = error as AxiosError<T_error_response>
      if (e.response?.data.message === "this cart is empty... add an item to begin"){
        dispatch(
        updateCartData({
          _id: "",
          userId: "",
          numberOfItems: 0,
          total: 0,
          items: [],
        })
      );
      }
      
      handleErrors(e);
    } finally {
      opt?.setIsloading && opt.setIsloading(false);
    }
  };
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
      // router.reload()
      // console.log(data.data);
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  };

  // remove one unit item cart
  const handleOneUnitFromCart = async (productId: string) => {
    try {
      const { data } = await axios.delete(`/api/carts/${productId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      getCartData();
      // router.reload()
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  };
  // remove all unit item(s) cart
  const handleAllUnitFromCart = async (productId: string) => {
    try {
      const { data } = await axios.delete(`/api/carts/${productId}/item`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(`new`, data);
      getCartData();
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  };

  const clearAllCartItems = async () => {
    try {
      const res = await axios.delete(`/api/carts`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const { data } = res;
      // localStorage.removeItem('cart')
      setCartData(null);
      getCartData();
      dispatch(clearCartData());
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        getCartData,
        handleAddToCart,
        handleOneUnitFromCart,
        handleAllUnitFromCart,
        clearAllCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// //  cart state
// const [cart, setCart] = useState<any>([]);
// // item quantity state
// const [itemQuantity, setItemQuantity] = useState(0);
// // total price state
// const [total, setTotal] = useState(0);

// // update item quantity with useEffect
// useEffect(() => {
//   if (cart) {
//     const quantity = cart.reduce((accumulator: any, currentItem: any) => {
//       return accumulator + currentItem.quantity;
//     }, 0);
//     setItemQuantity(quantity);
//   }
// }, [cart]);
// // update the total price with useEffect
// useEffect(() => {
//   const total = cart.reduce((accumulator: any, currentItem: any) => {
//     return accumulator + currentItem.price * currentItem.quantity;
//   }, 0);
//   setTotal(total);
// }, [cart]);

// // Cart functions
// // add to cart function
// const addToCart = (product: any, id: string) => {
//   const newItems: any = { ...product, quantity: 1 };
//   // check if the item is already in the cart
//   const cartItems: any = cart.find((item: any) => {
//     return item.id === id;
//   });
//   // if cart item is already in the cart
//   if (cartItems) {
//     const newCart = [...cart].map((item: any) => {
//       if (item.id === id) {
//         return {
//           ...item,
//           quantity: (cartItems?.quantity + 1) as number,
//         };
//       } else {
//         return item;
//       }
//     });
// setCart(newCart as SetStateAction<never[]>);
//   } else {
//     setCart([...cart, newItems]);
//   }
//   // console.log(cart);
// };

// // remove from cart function
// const removeFromCart = (id: string) => {
//   const newCart = cart.filter((item: any) => {
//     return item.id !== id;
//   });
//   setCart(newCart);
// };
// // clear all carts function
// const clearAllCart = () => {
//   setCart([]);
// };
// // increase quantity
// const increaseQuantity = (id: string) => {
//   const cartItem = cart.find((item: any) => item.id === id);
//   addToCart(cartItem, id);
// };
// // decrease quantity function
// const decreaseQuantity = (id: string) => {
//   const cartItem = cart.find((item: any) => item.id === id);
//   if (cartItem) {
//     const newCart = cart.map((item: any) => {
//       if (item.id === id) {
//         return { ...item, quantity: cartItem.quantity - 1 };
//       } else {
//         return item;
//       }
//     });
//     setCart(newCart);
//   }
//   if (cartItem.quantity < 2) {
//     removeFromCart(id);
//   }
// };

// <Head>
//               <meta
//                 name="viewport"
//                 content="width=device-width, initial-scale=1.0"
//               />
//             </Head>
//             <main className={"bg-afruna-base/10 relative text-afruna-blue"}>
//               <header
//                 className={
//                   "sticky z-20 top-0  flex-col flex bg-gradient-to-r from-orange-300 to-orange-100"
//                 }
//               >
//                 {/* side-nav */}
//                 <SideNav
//                   isOpen={sideNavOpen}
//                   onClose={() => setSideNavOpen(false)}
//                 />

//                 {/* top-mobile-nav */}
//                 <nav className="pt-8 flex md:hidden justify-between items-center max-w-[95%] sm:max-w-[90%] w-full mx-auto">
//                   <div className="flex gap-1 sm:gap-2 justify-between items-center">
//                     {!sideNavOpen ? (
//                       <IoMdMenu
//                         onClick={() => setSideNavOpen(true)}
//                         className="text-2xl sm:text-3xl cursor-pointer text-afruna-blue"
//                       />
//                     ) : (
//                       <RxCross2
//                         onClick={() => setSideNavOpen(false)}
//                         className="text-2xl sm:text-3xl cursor-pointer text-afruna-blue"
//                       />
//                     )}
//                     <Link href={"/"}>
//                       <Image
//                         src={svgs.logo}
//                         alt="Logo_Icon"
//                         // width={250}
//                         priority
//                         className="w-[9rem] sm:w-[10rem] object-contain"
//                       />
//                     </Link>
//                   </div>

//                   {/* mobile-links */}
//                   <div className="flex justify-center items-center gap-2">
//                     {isAuthenticated && currentActiveUsersData ? (
//                       <ItemPicker
//                         triggerClassName="flex space-x-2 items-center"
//                         contentClassName={
//                           "bg-white p-4 text-afruna-blue w-40 text-xs z-20 rounded-md"
//                         }
//                         getSelected={(val) => // console.log(val)}
//                         leftTriggerIcon={
//                           <div
//                             className={
//                               "transition-all hover:scale-90 ease-in-out duration-300 w-[1.6rem] object-contain rounded-full"
//                             }
//                           >
//                             <Image
//                               src={images.avatar}
//                               alt={`profile`}
//                               priority
//                               className="w-full"
//                             />
//                           </div>
//                         }
//                         mobileView={true}
//                         profileLinks={[
//                           {
//                             name: "Profule",
//                             href: "/profile",
//                             icon: <FaUser />,
//                           },
//                           {
//                             name: "My Wish list",
//                             href: "/wishlist",
//                             icon: <BsFillHeartFill />,
//                           },
//                           {
//                             name: "My Order",
//                             href: "/order",
//                             icon: <HiShoppingBag />,
//                           },
//                         ]}
//                         extraComponent={
//                           <button
//                             onClick={handleLogOut}
//                             className="bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 my-2 w-full text-white p-2 rounded-md flex items-center justify-center space-x-2"
//                           >
//                             <MdOutlineLogout className="text-xl" />
//                             <span className="text-md">Log out</span>
//                           </button>
//                         }
//                       />
//                     ) : (
//                       <div className={"flex gap-6 text-sm font-extrabold"}>
//                         {/* <button onClick={() => router.push("auth/register")}>
//                     Register
//                   </button> */}
//                         <button onClick={() => router.push("auth/login")}>
//                           Sign in
//                         </button>
//                       </div>
//                     )}

//                     <Link
//                       href={"/wishlist"}
//                       className={
//                         "transition-all hover:scale-90 ease-in-out duration-300"
//                       }
//                     >
//                       <HiHeart className="text-2xl sm:text-[1.6rem]" />
//                     </Link>
//                     <Link
//                       href={"/cart"}
//                       className={
//                         "transition-all hover:scale-90 ease-in-out duration-300 relative"
//                       }
//                     >
//                       <MdShoppingCart className="text-2xl sm:text-[1.6rem]" />
//                       {/* bg-red-500 */}
//                       <span className="absolute -top-1 -right-1 w-[14px] h-[14px] rounded-full font-thin text-white text-[0.55rem] bg-orange-400 flex justify-center items-center ">
//                         {itemsQuantity}
//                       </span>
//                     </Link>
//                   </div>
//                 </nav>

//                 <div className="relative">
//                   {/* wallart */}
//                   <Image
//                     src={images.wallart}
//                     alt="Wall_Art"
//                     width={50}
//                     className={
//                       "absolute right-0 top-0 h-[10rem] hidden md:flex"
//                     }
//                   />

//                   {/* top-desktop-nav */}
//                   <nav className="hidden md:flex justify-end items-center gap-4 right-28 relative h-[4rem]">
//                     <button className={"flex gap-2 font-bold"}>
//                       <HiTag size={24} /> <span>Sell on Afruna</span>{" "}
//                     </button>
//                     <ItemPicker
//                       leftTriggerIcon={<MdHelp className="text-xl" />}
//                       contentClassName={
//                         "bg-white p-4 text-afruna-blue w-40 text-xs z-20 rounded-md"
//                       }
//                       triggerClassName={"flex space-x-2 items-center"}
//                       getSelected={handleHelpSelection}
//                       items={HELP}
//                       placeholder="Help!"
//                       extraComponent={
//                         <button className="bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 my-2 w-full text-white p-2 rounded-md flex items-center justify-center space-x-2">
//                           <MdSupportAgent className="text-xl" />
//                           <span className="text-md">Live Chat</span>
//                         </button>
//                       }
//                     />

//                     {isAuthenticated && currentActiveUsersData ? (
//                       <ItemPicker
//                         triggerClassName="flex space-x-2 items-center"
//                         contentClassName={
//                           "bg-white p-4 text-afruna-blue w-40 text-xs z-20 rounded-md"
//                         }
//                         getSelected={(val) => // console.log(val)}
//                         leftTriggerIcon={
//                           <Image
//                             className="rounded-full w-10 h-10"
//                             src={images.avatar}
//                             alt="Avatar_Img"
//                           />
//                         }
//                         placeholder={`${currentActiveUsersData.firstName} ${currentActiveUsersData.lastName}`}
//                         profileLinks={[
//                           {
//                             name: "Profule",
//                             href: "/profile",
//                             icon: <FaUser />,
//                           },
//                           {
//                             name: "My Wish list",
//                             href: "/wishlist",
//                             icon: <BsFillHeartFill />,
//                           },
//                           {
//                             name: "My Order",
//                             href: "/order",
//                             icon: <HiShoppingBag />,
//                           },
//                         ]}
//                         extraComponent={
//                           <button
//                             onClick={handleLogOut}
//                             className="bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 my-2 w-full text-white p-2 rounded-md flex items-center justify-center space-x-2"
//                           >
//                             <MdOutlineLogout className="text-xl" />
//                             <span className="text-md">Log out</span>
//                           </button>
//                         }
//                       />
//                     ) : (
//                       <div className={"flex gap-6 font-extrabold"}>
//                         <button onClick={() => router.push("auth/register")}>
//                           Register
//                         </button>
//                         <button onClick={() => router.push("auth/login")}>
//                           Login
//                         </button>
//                       </div>
//                     )}
//                   </nav>

//                   {/* middle-desktop-nav */}
//                   <nav
//                     className={
//                       "w-full relative md:border-t border-t-afruna-gray/50 shadow-gray-50"
//                     }
//                   >
//                     <div className="flex justify-between items-center gap-0 p-3 md:max-w-[85%] mx-auto md:h-24">
//                       <Link href={"/"} className="hidden md:block">
//                         <Image
//                           src={svgs.logo}
//                           alt="Logo_Icon"
//                           // width={250}
//                           priority
//                           className="w-[11rem] lg:w-[13rem] object-contain"
//                         />
//                       </Link>

//                       {/* middle section */}
//                       <div
//                         className={
//                           "flex rounded-md focus-within:border focus-within:border-afruna-blue justify-between w-full sm:max-w-[90%] mx-auto md:w-[40vw]"
//                         }
//                       >
//                         <input
//                           className={
//                             "transition-all hover:scale-105 ease-in-out lg:placeholder:text-sm lg:text-[0.8rem] duration-200 w-full outline-none text-xs rounded-l-md p-2 lg:p-3 px-5 border border-afruna-gray/40"
//                           }
//                           type={"search"}
//                           placeholder="Search by products, brands, categories"
//                         />
//                         <button
//                           className={
//                             "transition-all hover:scale-105 ease-in-out duration-200 flex items-center p-2 lg:p-3 bg-afruna-blue rounded-r-md space-x-2 text-white"
//                           }
//                         >
//                           <span className="hidden md:inline">Search</span>{" "}
//                           <MdSearch size={24} />{" "}
//                         </button>
//                       </div>

//                       {/* right section */}
//                       <div
//                         className={
//                           "hidden md:flex text-[0.68rem] lg:text-sm font-bold justify-center items-center gap-4 lg:gap-5"
//                         }
//                       >
//                         <button
//                           onClick={() => router.push("/compare")}
//                           className={
//                             "transition-all hover:scale-90 ease-in-out duration-200 flex flex-col space-y-1 place-items-center"
//                           }
//                         >
//                           <FaRotate className="text-lg lg:text-2xl" />
//                           <span>Compare</span>
//                         </button>
//                         <button
//                           onClick={() => router.push("/wishlist")}
//                           className={
//                             "transition-all hover:scale-90 ease-in-out duration-200 flex flex-col space-y-1 place-items-center"
//                           }
//                         >
//                           <HiHeart className="text-lg lg:text-2xl" />
//                           <span>Favorite</span>
//                         </button>
//                         <button
//                           onClick={() => router.push("/cart")}
//                           className={
//                             "transition-all hover:scale-90 ease-in-out duration-200 relative flex flex-col space-y-1 place-items-center"
//                           }
//                         >
//                           <MdShoppingCart className="text-lg lg:text-2xl" />
//                           <span>My Cart</span>
//                           {/* bg-red-500 */}
//                           <span className="absolute -top-3 lg:-top-2 lg:right-[0.83rem] right-2 w-[14px] h-[14px] rounded-full font-thin text-white text-[0.55rem] bg-orange-400 flex justify-center items-center">
//                             {itemsQuantity}
//                           </span>
//                         </button>
//                       </div>
//                     </div>
//                   </nav>
//                 </div>

//                 {/* bottom-nav */}
//                 <nav
//                   className={
//                     "bg-white text-afruna-blue font-semibold text-sm lg:text-base w-full"
//                   }
//                 >
//                   <div className="max-w-[95%] sm:max-w-[90%] md:max-w-[85%] w-full mx-auto h-10 flex justify-between items-center gap-4 md:gap-8">
//                     <div className={"hidden md:flex items-center space-x-6"}>
//                       <button
//                         className={"flex text-md items-center space-x-1"}
//                         onClick={toggleCategoryMenu}
//                       >
//                         <MdMenu size={28} />
//                         <span>All Categories</span>
//                       </button>
//                       {["Fashion", "Furnitures", "Electronics", "Services"].map(
//                         (item, idx) => (
//                           <button
//                             className={`hidden md:flex ${
//                               selectedcategory === item &&
//                               "text-afruna-gold/90 border-b border-afruna-gold scale-110"
//                             } transition-all ease-out duration-200 px-1`}
//                             onClick={() => setselectedCategory(item)}
//                             key={idx}
//                           >
//                             {item}
//                           </button>
//                         )
//                       )}
//                     </div>

//                     {/* bottom-mobile-link */}
//                     <Link
//                       href={"/"}
//                       className="md:hidden text-sm sm:text-base flex justify-start"
//                     >
//                       Services
//                     </Link>

//                     <ItemPicker
//                       getSelected={(val) => // console.log(val)}
//                       items={[
//                         "American - USD",
//                         "Nigerian - Naira",
//                         "Ghanian - Cedi",
//                       ]}
//                       placeholder="Currency,"
//                       contentClassName={"p-2 bg-white text-xs"}
//                       triggerClassName="flex text-xs space-x-2 place-items-center"
//                     />
//                   </div>
//                 </nav>
//               </header>
//               {children}

//               <FooterLayout />
//             </main>
