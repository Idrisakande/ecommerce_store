import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MdHelp,
  MdMenu,
  MdOutlineLogout,
  MdSearch,
  MdShoppingCart,
  MdSupportAgent,
} from "react-icons/md";
import { HiHeart, HiShoppingBag, HiTag } from "react-icons/hi";
import { FaRotate } from "react-icons/fa6";
import Link from "next/link";
import svgs from "@/constants/svgs";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import images from "@/constants/images";
import { ItemPicker } from "@/components/widgets/ItemPicker";
import Head from "next/head";
import FooterLayout from "./footer";
import { RxCross2 } from "react-icons/rx";
import { IoMdMenu } from "react-icons/io";
import { SideNav } from "@/components/SideNav";
import Auth10 from "@/services/auth.service";
import { FaUser } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { T_initial_cart_state } from "@/types/cart.type";
import CartActions from "@/services/cart.services";
import { RootState } from "@/types/store.type";
import UsersActions from "@/services/user.services";
import { ProductsContext } from "@/contexts/ProductsContextProvider";
import { T_products_sorting_context } from "@/types/products";
import useSearchProducts from "@/hooks/useSearchProducts";
import { verifyImageUrl } from "@/utils/verify_image_url";

interface IMainLayout {
  children: ReactNode;
}
export interface IMainLayoutContext {
  isCategoryMenuOpen: boolean;
  selectedcategory?: string;
  toggleCategoryMenu?: () => void;
}
export const MainLayoutContext = createContext<IMainLayoutContext | null>({
  isCategoryMenuOpen: true,
  selectedcategory: "",
});

const HELP = ["FAQs", "Contact Us"];
export default function ({ children }: IMainLayout) {
  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(true);
  const [selectedcategory, setselectedCategory] = useState("");

  const router = useRouter();

  const toggleCategoryMenu = useCallback(
    () => setIsCategoryMenuOpen(!isCategoryMenuOpen),
    [isCategoryMenuOpen]
  );

  // const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  // const [selectedcategory, setselectedCategory] = useState("");

  // const router = useRouter();

  const toggleCategoriesMenu = useCallback(
    () => setIsShow((prev) => !prev),
    [isShow]
  );
  const { categories } = useSelector((state: RootState) => state.categories);
  const { handleCategoryFiltering } = useContext(
    ProductsContext
  ) as T_products_sorting_context;

  const handleHelpSelection = useCallback((value: string) => {
    switch (value) {
      case HELP[0]:
        router.push("/faq");
        break;

      default:
        router.push("contact");
        break;
    }
  }, []);
  const searchInputRef = useRef<HTMLInputElement>(null);
  useMemo(async () => {
    const cartService = new CartActions();
    const cart = await cartService.getCart();
    return cart;
  }, []);

  const {
    cart: { items },
  } = useSelector((state: RootState) => state.cart as T_initial_cart_state);

  //products
  const { allProducts } = useSelector((state: RootState) => state.products);
  const { searchResult, setSearchInput, searchInput } = useSearchProducts({
    data: allProducts.filter(
      (product) =>
        product._id !== null && !product.blocked && product.categoryId !== null
    ),
    period: "all",
  });

  // // console.log(items.length)
  const itemsQuantity = useMemo(() => (items ? items.length : 0), [items]);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  useMemo(async () => {
    const userServices = new UsersActions();
    const user = await userServices.getCurrentActiveUser();
    return user;
  }, []);
  const { currentActiveUsersData } = useSelector(
    (state: RootState) => state.users
  );

  const handleLogOut = useCallback(() => {
    const authService = new Auth10(router);
    authService.handleLogout();
  }, []);

  return (
    <MainLayoutContext.Provider
      value={{ isCategoryMenuOpen, selectedcategory, toggleCategoryMenu }}
    >
      {/* flex flex-col justify-between h-screen */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className={"bg-afruna-base/10 relative  text-afruna-blue"}>
        <header
          className={
            "sticky z-30 top-0  flex-col flex bg-gradient-to-r from-orange-300 to-orange-100"
          }
        >
          {/* side-nav */}
          <SideNav isOpen={sideNavOpen} onClose={() => setSideNavOpen(false)} />

          {/* top-mobile-nav */}
          <nav className="pt-8 flex md:hidden justify-between items-center max-w-[95%] sm:max-w-[90%] w-full mx-auto">
            <div className="flex gap-1 sm:gap-2 justify-between items-center">
              {!sideNavOpen ? (
                <IoMdMenu
                  onClick={() => setSideNavOpen(true)}
                  className="text-2xl sm:text-3xl cursor-pointer text-afruna-blue"
                />
              ) : (
                <RxCross2
                  onClick={() => setSideNavOpen(false)}
                  className="text-2xl sm:text-3xl cursor-pointer text-afruna-blue"
                />
              )}
              <Link href={"/"}>
                <Image
                  src={svgs.logo}
                  alt="Logo_Icon"
                  // width={250}
                  priority
                  className="w-[9rem] sm:w-[10rem] object-contain"
                />
              </Link>
            </div>

            {/* mobile-links */}
            <div className="flex justify-center items-center gap-2">
              {isAuthenticated && currentActiveUsersData ? (
                <ItemPicker
                  triggerClassName="flex z-30 space-x-2 items-center"
                  contentClassName={
                    "bg-white z-30 p-4 text-afruna-blue w-40 text-xs z-20 rounded-md"
                  }
                  getSelected={(val) => {}}
                  leftTriggerIcon={
                    <div className="w-[1.6rem] bg-afruna-blue h-[1.6rem] rounded-full transition-all hover:scale-90 ease-in-out duration-300 overflow-hidden relative flex justify-center items-center">
                      {currentActiveUsersData?.avatar ? (
                        <Image
                          src={verifyImageUrl(currentActiveUsersData.avatar)}
                          alt="Logo_Icon"
                          // width={250}
                          priority
                          fill
                          // className="w-[9re object-contain"
                        />
                      ) : (
                        <div className="text-sm text-white font-light">
                          {currentActiveUsersData?.firstName
                            .charAt(0)
                            .toLocaleUpperCase()}
                        </div>
                      )}
                    </div>
                  }
                  mobileView={true}
                  profileLinks={[
                    {
                      name: "Profule",
                      href: "/profile",
                      icon: <FaUser />,
                    },
                    {
                      name: "My Wish list",
                      href: "/wishlist",
                      icon: <BsFillHeartFill />,
                    },
                    {
                      name: "My Order",
                      href: "/order",
                      icon: <HiShoppingBag />,
                    },
                  ]}
                  extraComponent={
                    <button
                      onClick={handleLogOut}
                      className="bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 my-2 w-full text-white p-2 rounded-md flex items-center justify-center space-x-2"
                    >
                      <MdOutlineLogout className="text-xl" />
                      <span className="text-md">Log out</span>
                    </button>
                  }
                />
              ) : (
                <div className={"flex gap-6 text-sm font-extrabold"}>
                  {/* <button onClick={() => router.push("auth/register")}>
                    Register
                  </button> */}
                  <button onClick={() => router.push("/auth/login")}>
                    Sign in
                  </button>
                </div>
              )}

              <Link
                href={"/wishlist"}
                className={
                  "transition-all hover:scale-90 ease-in-out duration-300"
                }
              >
                <HiHeart className="text-2xl sm:text-[1.6rem]" />
              </Link>
              <Link
                href={"/cart"}
                className={
                  "transition-all hover:scale-90 ease-in-out duration-300 relative"
                }
              >
                <MdShoppingCart className="text-2xl sm:text-[1.6rem]" />
                {/* bg-red-500 */}
                <span className="absolute -top-1 -right-1 w-[14px] h-[14px] rounded-full font-thin text-white text-[0.55rem] bg-orange-400 flex justify-center items-center ">
                  {itemsQuantity}
                </span>
              </Link>
            </div>
          </nav>

          <div className="relative">
            {/* wallart */}
            <Image
              src={images.wallart}
              alt="Wall_Art"
              width={50}
              className={"absolute right-0 top-0 h-[9rem] hidden md:flex"}
            />

            {/* top-desktop-nav */}
            <nav className="hidden md:flex justify-end items-center gap-4 right-28 relative h-[3.5rem]">
              <button className={"flex gap-2 font-bold"}>
                <HiTag size={24} /> <span>Sell on Afruna</span>{" "}
              </button>
              <ItemPicker
                leftTriggerIcon={<MdHelp className="text-xl" />}
                contentClassName={
                  "bg-white p-4 z-30 text-afruna-blue w-40 text-xs z-20 rounded-md"
                }
                triggerClassName={"flex z-30 space-x-2 items-center"}
                getSelected={handleHelpSelection}
                items={HELP}
                placeholder="Help!"
                // extraComponent={
                //   <button className="bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 my-2 w-full text-white p-2 rounded-md flex items-center justify-center space-x-2">
                //     <MdSupportAgent className="text-xl" />
                //     <span className="text-md">Live Chat</span>
                //   </button>
                // }
              />

              {isAuthenticated && currentActiveUsersData ? (
                <ItemPicker
                  triggerClassName="flex z-30 space-x-2 items-center"
                  contentClassName={
                    "bg-white p-4 z-30 text-afruna-blue w-40 text-xs z-20 rounded-md"
                  }
                  getSelected={(val) => {}}
                  leftTriggerIcon={
                    // <div className="w-10 h-10 rounded-full overflow-hidden relative flex justify-center items-center">
                    //   <Image
                    //     src={
                    //       verifyImageUrl(currentActiveUsersData.avatar) ??
                    //       images.seller1
                    //     }
                    //     alt="Your image"
                    //     fill
                    //   />
                    // </div>
                    <div className=" bg-blue-950 w-10 h-10  rounded-full transition-all hover:scale-90 ease-in-out duration-300 overflow-hidden relative flex justify-center items-center">
                    {currentActiveUsersData?.avatar ? (
                      <Image
                        src={verifyImageUrl(currentActiveUsersData.avatar)}
                        alt="your image"
                        // width={250}
                        priority
                        fill
                        // className="w-[9re object-contain"
                      />
                    ) : (
                      <div className="text-sm text-white font-light">
                        {currentActiveUsersData?.firstName
                          .charAt(0)
                          .toLocaleUpperCase()}
                      </div>
                    )}
                  </div>
                  }
                  placeholder={`${
                    currentActiveUsersData.firstName.charAt(0).toUpperCase() +
                    currentActiveUsersData.firstName.slice(1)
                  } ${
                    currentActiveUsersData.lastName.charAt(0).toUpperCase() +
                    currentActiveUsersData.lastName.slice(1)
                  }`}
                  profileLinks={[
                    {
                      name: "Profile",
                      href: "/profile",
                      icon: <FaUser />,
                    },
                    {
                      name: "My Wish list",
                      href: "/wishlist",
                      icon: <BsFillHeartFill />,
                    },
                    {
                      name: "My Order",
                      href: "/order",
                      icon: <HiShoppingBag />,
                    },
                  ]}
                  extraComponent={
                    <button
                      onClick={handleLogOut}
                      className="bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 my-2 w-full text-white p-2 rounded-md flex items-center justify-center space-x-2"
                    >
                      <MdOutlineLogout className="text-lg" />
                      <span className="text-md">Log out</span>
                    </button>
                  }
                />
              ) : (
                <div className={"flex gap-6 font-extrabold"}>
                  <button onClick={() => router.push("/auth/register")}>
                    Register
                  </button>
                  <button onClick={() => router.push("/auth/login")}>
                    Login
                  </button>
                </div>
              )}
            </nav>

            {/* middle-desktop-nav */}
            <nav
              className={
                "w-full relative md:border-t border-t-afruna-gray/50 shadow-gray-50"
              }
            >
              <div className="flex justify-between items-center gap-0 p-3 md:max-w-[85%] mx-auto md:h-[5.5rem]">
                <Link href={"/"} className="hidden md:block">
                  <Image
                    src={svgs.logo}
                    alt="Logo_Icon"
                    // width={250}
                    priority
                    className="w-[11rem] lg:w-[16rem] object-contain"
                  />
                </Link>

                {/* middle section */}
                <div className="relative w-full top-0 grid grid-cols-1">
                  <div
                    className={
                      "flex rounded-md focus-within:border focus-within:border-afruna-blue justify-between w-full sm:max-w-[90%] mx-auto md:w-[40vw]"
                    }
                  >
                    <input
                      ref={searchInputRef}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className={
                        "transition-all hover:scale-105 ease-in-out lg:placeholder:text-sm lg:text-[0.8rem] duration-200 w-full outline-none text-xs rounded-l-md p-2 lg:p-3 px-5 border border-afruna-gray/40"
                      }
                      type={"search"}
                      placeholder="Search by products, brands, categories"
                    />
                    <button
                      className={
                        "transition-all hover:scale-105 ease-in-out duration-200 flex items-center p-2 lg:p-3 bg-afruna-blue rounded-r-md space-x-2 text-white"
                      }
                    >
                      <span className="hidden md:inline">Search</span>{" "}
                      <MdSearch size={24} />{" "}
                    </button>
                  </div>
                  <div
                    className={`${
                      searchInput.length < 1 && "hidden"
                    } transistion absolute top-14 flex flex-col gap-2 bg-slate-50 rounded-lg p-4 max-h-[40vh] md:max-w-[50vw] w-full overflow-auto`}
                  >
                    {allProducts && searchResult.length > 0 ? (
                      searchResult.map((product) => (
                        <button
                          onClick={() => {
                            router.replace("/product/" + product._id);
                            if (searchInputRef.current) {
                              searchInputRef.current.value = "";
                            }
                            setSearchInput("");
                          }}
                          key={product._id}
                          className="flex  items-center p-2 gap-4 hover:bg-slate-300/30"
                        >
                          <Image
                            priority
                            // fill
                            height={30}
                            width={30}
                            className="rounded-lg"
                            src={verifyImageUrl(product.coverPhoto[0])}
                            alt={product.name.concat("_Image")}
                          />
                          <div className="flex flex-col items-start gap-1">
                            <p>{product.name}</p>
                            <p>&#x20A6;{product.price.toLocaleString()}</p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p>No matching products ...</p>
                    )}
                  </div>
                </div>

                {/* right section */}
                <div
                  className={
                    "hidden md:flex text-[0.68rem] lg:text-sm font-bold justify-end items-center gap-4 lg:gap-5 lg:min-w-[15rem]"
                  }
                >
                  <button
                    onClick={() => router.push("/compare")}
                    className={
                      "transition-all hover:scale-90 ease-in-out duration-200 flex flex-col space-y-1 place-items-center"
                    }
                  >
                    <FaRotate className="text-lg lg:text-2xl" />
                    <span>Compare</span>
                  </button>
                  <button
                    onClick={() => router.push("/wishlist")}
                    className={
                      "transition-all hover:scale-90 ease-in-out duration-200 flex flex-col space-y-1 place-items-center"
                    }
                  >
                    <HiHeart className="text-lg lg:text-2xl" />
                    <span>Favorite</span>
                  </button>
                  <button
                    onClick={() => router.push("/cart")}
                    className={
                      "transition-all hover:scale-90 ease-in-out duration-200 relative flex flex-col space-y-1 place-items-center"
                    }
                  >
                    <MdShoppingCart className="text-lg lg:text-2xl" />
                    <span>My Cart</span>
                    {/* bg-red-500 */}
                    <span className="absolute -top-3 lg:-top-2 lg:right-[0.83rem] right-2 w-[14px] h-[14px] rounded-full font-thin text-white text-[0.55rem] bg-orange-400 flex justify-center items-center">
                      {itemsQuantity}
                    </span>
                  </button>
                </div>
              </div>
            </nav>
          </div>

          {/* bottom-nav */}
          <nav
            className={
              "bg-white text-afruna-blue font-semibold text-sm lg:text-base w-full"
            }
          >
            <div className="max-w-[95%] sm:max-w-[90%] md:max-w-[85%] w-full mx-auto h-10 flex justify-between items-center gap-4 md:gap-8">
              <div className={"hidden md:flex items-center space-x-6"}>
                <button
                  className={"flex text-md items-center space-x-1 relative"}
                  onClick={toggleCategoriesMenu}
                >
                  <MdMenu size={28} />
                  <span>All Categories</span>
                  <div
                    className={`${
                      isShow
                        ? "block opacity-100 transition-opacity duration-500"
                        : " hidden opacity-0  transition-opacity"
                    } absolute top-8 bg-white z-30 transition rounded-md duration-500 `}
                  >
                    <div className="flex flex-col gap-1 grow min-w-[15rem] w-full justify-start items-start p-4">
                      {categories &&
                        categories.map((item) => {
                          return (
                            <button
                              key={item._id}
                              onClick={() => {
                                handleCategoryFiltering(item._id);
                                router.push("/product");
                              }}
                              className="p-2 text-xs hover:bg-orange-100 rounded-md w-full text-start text-afruna-blue "
                            >
                              {item.name}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </button>
                ;
                {["Fashion", "Furnitures", "Electronics", "Services"].map(
                  (item, idx) => (
                    <button
                      className={`hidden md:flex ${
                        selectedcategory === item &&
                        "text-afruna-gold/90 border-b border-afruna-gold scale-110"
                      } transition-all ease-out duration-200 px-1`}
                      onClick={() => {
                        router.push("/product");

                        setselectedCategory(item);
                      }}
                      key={idx}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              {/* bottom-mobile-link */}
              <Link
                href={"/"}
                className="md:hidden text-sm sm:text-base flex justify-start"
              >
                Services
              </Link>

              <ItemPicker
                getSelected={(val) => {}}
                items={["American - USD", "Nigerian - Naira", "Ghanian - Cedi"]}
                placeholder="Currency,"
                contentClassName={"p-2 bg-white text-xs"}
                triggerClassName="flex text-xs space-x-2 place-items-center"
              />
            </div>
          </nav>
        </header>
        {children}

        <FooterLayout />
      </main>
    </MainLayoutContext.Provider>
  );
}
