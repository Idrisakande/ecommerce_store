// import withAuthLogin from "@/hocs/withAuthLogin.hoc";
import {
  booksItems,
  booksNav,
  brand,
  categoryLink,
  countryIfo,
  moviesItems,
  moviesNav,
  startItems,
} from "@/constants/data";
import Link from "next/link";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination, Scrollbar } from "swiper/modules";
import HomeBannar from "@/components/HomeBannar";
import { Button } from "@/components/widgets/Button";
import { AfrunaHypeItems } from "@/components/AfrunaHypeItems";
import { ProductCard } from "@/components/ProductCard";
import { CustomCard } from "@/components/CustomCard";
import Image from "next/image";
import images from "@/constants/images";
import Main, { IMainLayoutContext, MainLayoutContext } from "@/layouts/main";
import { useSelector } from "react-redux";
import ProductsActions from "@/services/products.services";
import CategoriesActions from "@/services/categories.services";
import withAuth10 from "@/hooks/withAuth";
import { RootState } from "@/types/store.type";
import { LoadingStateContext } from "@/contexts/LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { LoadingPage } from "@/components/LoadingPage";
import imags from "@/constants/images";
import UsersActions from "@/services/user.services";
import { verifyImageUrl } from "@/utils/verify_image_url";
import { T_product_data } from "@/types/products";

export default withAuth10(function Index() {
  const { isCategoryMenuOpen } = useContext(
    MainLayoutContext
  ) as IMainLayoutContext;
  const [trendNav, setTrendNav] = useState({ name: "all" });
  const [selectedNav, setSelectedNav] = useState(0);

  // Create an instance of ProductsActions
  const vendorActions = new UsersActions();
  // Fetch the products data using the instance
  useEffect(() => {
    vendorActions.getAllUsers();
  }, []);
  const { allUsersData } = useSelector((state: RootState) => state.users);
  const memoizedVendor = useMemo(
    () => allUsersData.filter((user) => user?.role === "vendor").slice(0, 4),
    [allUsersData]
  );

  const opt = useContext(LoadingStateContext) as T_loading_provider;
  // Create an instance of ProductsActions
  const productsActions = new ProductsActions();
  // Fetch the products data using the instance
  useEffect(() => {
    productsActions.fetchProducts(opt);
  }, []);
  // Create an instance of category
  const categoriesService = new CategoriesActions();
  // Fetch the categories data using the instance
  useEffect(() => {
    categoriesService.getCategories();
  }, []);
  // Access the categories data from the Redux store
  const { categories } = useSelector((state: RootState) => state.categories);
  // console.log(categories);

  // Access the products data from the Redux store
  const { allProducts, frequentProducts } = useSelector(
    (state: RootState) => state.products
  );

  const memoizedAllProducts = useMemo(() => allProducts, [allProducts]);
  // // console.log(frequentProducts);
  const memoizedHypeProducts = useMemo(
    () =>
      allProducts?.filter(
        (item) =>
          item.hype === true && item._id !== null && item.categoryId !== null
      ),
    [allProducts]
  );

  const memoizedTrendProducts = useMemo(
    () => memoizedHypeProducts?.filter((product) => product.frequency === 0),
    [memoizedHypeProducts]
  );
  const trendNavInfo = useMemo(() => {
    const nav = [{ name: "all", _id: "" }];
    categories
      .filter(
        (item, index) =>
          index < 5
      )
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
      .map((item) => {
        nav.push({ name: item.name.trim().split(" ")[0], _id: item._id });
      });
    return nav;
  }, [categories]);
  const [activeTrendNav, setActiveTrendNav] = useState(trendNavInfo[0]);
  const filteredTrendProducts = useMemo(
    () =>
      memoizedTrendProducts?.filter(
        (item) => item?.categoryId?._id === activeTrendNav._id
      ),
    [activeTrendNav, memoizedTrendProducts]
  );

  const navInfo = useMemo(() => {
    const nav = [{ name: "all", _id: "" }];
    categories
      ?.filter(
        (item, index) =>
          index < 5
      )
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
      .map((item) => {
        nav.push({ name: item.name.trim().split(" ")[0], _id: item._id });
      });
    return nav;
  }, [categories]);
  const [activeFreqNav, setActiveFreqNav] = useState(navInfo[0]);
  const filteredFreqProducts = useMemo(() => {
    return frequentProducts?.filter((item) => {
      if (typeof item.categoryId == "string" && item.categoryId !== null) {
        return item?.categoryId === activeFreqNav._id;
      }
      if (typeof item.categoryId == "object" && item.categoryId !== null) {
        return item?.categoryId._id === activeFreqNav._id;
      }
    });
  }, [activeFreqNav, frequentProducts]);

  const memoizedbooksProducts = useMemo(
    () =>
      allProducts?.filter(
        (product) => product.categoryId?.name.toLowerCase() === "books"
      ),
    [allProducts]
  );
  // console.log(memoizedbooksProducts);
  // console.log(allProducts);
  const memoizedMoviesProducts = useMemo(
    () =>
      allProducts?.filter(
        (product) => product.categoryId?.name.toLowerCase() === "movies"
      ),
    [allProducts]
  );

  const handleProjectsClicked = (
    e: ChangeEvent<HTMLButtonElement>,
    index: number
  ) => {
    const name = e.target.textContent?.toLowerCase() ?? "";
    setTrendNav({ name });
    setSelectedNav(index);
  };

  return (
    <Main>
      <main className="w-screen pb-28">
        <section className="px-4 mt-3 md:px-6 lg:px-16">
          <div className="bg-white shadow-sm w-full h-full p-3 md:p-4 flex gap-3 rounded-lg">
            <div className="hidden w-full lg:flex flex-col justify-between min-h-[22rem] h-full items-start px-1 py-4 rounded-lg lg:max-w-[20%] bg-[#FEFDFD]">
              {categoryLink.map((Item, idx) => (
                <Link
                  key={Item.name}
                  href={Item.href}
                  className="flex gap-1 justify-center items-center text-[0.8rem] font-semibold hover:bg-afruna-gold/5 hover:shadow-md w-full p-2"
                >
                  <Item.img
                    className={`text-afruna-blue text-xl ${
                      idx === categoryLink.length - 2 &&
                      "[&>path]:fill-afruna-blue"
                    }`}
                  />
                  <span>{Item.name}</span>
                  {/* <p className="">{name}</p> */}
                </Link>
              ))}
            </div>

            {/* bannar section */}
            <div className="flex flex-col gap-3 md:flex-row lg:max-w-[80%] w-full">
              <HomeBannar />

              <div className="flex md:flex-col min-h-full h-full w-full gap-3 ">
                <div className="h-[10.69rem] p-3 w-full sidebannar1 rounded-lg flex justify-start items-center">
                  <h1 className="text-white max-w-[6rem] text-center text-sm font-medium tracking-tight leading-5">
                    Best of African Art & Craft{" "}
                    <span className="block">on</span>
                    <span className="font-extrabold underline">AFRUNA</span>
                  </h1>
                </div>
                <div className="h-[10.69rem] pt-5 px-4 w-full sidebannar rounded-lg flex justify-start items-start">
                  <h1 className="max-w-[8rem] leading-5 text-sm tracking-tight font-semibold ">
                    Light up your bedroom
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* hype section */}
        <section className="px-4 lg:px-16 mt-6 md:mt-8">
          <div className="flex flex-col gap-6 justify-center items-start">
            <Button yellowGray className="px-8 cursor-default font-extrabold">
              Afruna Hype
            </Button>
            <div className="bg-white px-4 py-2 rounded-md overflow-hidden w-full">
              {/* max of 7 hype products */}
              {/* memoizedHypeProducts.slice(0,7).map() */}
              {/* <AfrunaHypeItems memoizedHypeProducts={memoizedHypeProducts} /> */}

              <>
                {" "}
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  freeMode={true}
                  breakpoints={{
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 40,
                    },
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  scrollbar={{ draggable: true }}
                  modules={[FreeMode, Pagination, Scrollbar]}
                  className="w-full"
                  // animate={animateCard}
                  // transition={{ duration: 0.5, delayChildren: 0.5 }}
                  // className="flex flex-wrap justify-center pb-8  md:pb-0 lg:justify-start items-center gap-4 sm:gap-8"
                >
                  {memoizedHypeProducts.length > 0 ? (
                    memoizedHypeProducts.slice(0, 10).map((product) => {
                      // Project component
                      return (
                        <SwiperSlide key={product._id}>
                          <ProductCard {...product} />
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    <div className="flex justify-center items-center flex-col pt-12 pb-4 grow w-full">
                      <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                        <Image
                          src={imags.noResult}
                          alt={`Not found image`}
                          fill
                        />
                      </div>
                      <h4 className="font-extrabold text-xs">
                        Sorry!.., the products isn't available
                      </h4>
                    </div>
                  )}
                </Swiper>
              </>
            </div>
          </div>
        </section>

        {/* trending items section */}
        <section className="flex flex-col gap-4 md:gap-6 mt-6 md:mt-10 px-4 sm:px-9 lg:px-[4.2rem] md:py-8 lg:pb-20 bg-[#FFFBF14F] ">
          <div className="flex flex-col md:border-b border-[#EFEEED] md:flex-row gap-4 md:gap-6 justify-between items-start md:items-end ">
            <div className="flex md:justify-start w-full items-center">
              <Button
                yellowGray
                className="cursor-default md:px-7 font-extrabold"
              >
                Afruna Trending Items
              </Button>
            </div>

            <nav className="flex md:justify-end md:items-end w-full">
              <ul className="flex flex-wrap justify-start gap-3 sm:gap-4 items-center md:items-end md:justify-end">
                {trendNavInfo.map((nav) => (
                  <li
                    key={nav._id}
                    className={`text-sm font-semibold capitalize relative cursor-pointer hover:text-orange-500 transition duration-500 w-fit ${
                      activeTrendNav._id === nav._id ? "text-orange-500 " : ""
                    }`}
                    onClick={() => setActiveTrendNav(nav)}
                  >
                    {nav.name}
                    <div
                      className={`w-full h-[2px] ${
                        activeTrendNav._id === nav._id ? "bg-orange-500 " : ""
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="px-4 py-2 rounded-md overflow-hidden w-full">
            <>
              {" "}
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                  },
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination, Scrollbar]}
                className="w-full"
                // animate={animateCard}
                // transition={{ duration: 0.5, delayChildren: 0.5 }}
                // className="flex flex-wrap justify-center pb-8  md:pb-0 lg:justify-start items-center gap-4 sm:gap-8"
              >
                {activeTrendNav.name === "all" ? (
                  memoizedTrendProducts?.slice(0, 10)?.map((product) => {
                    // Project component
                    return (
                      <SwiperSlide key={product._id}>
                        <ProductCard {...product} />
                      </SwiperSlide>
                    );
                  })
                ) : filteredTrendProducts.length > 0 ? (
                  filteredTrendProducts.slice(0, 10).map((product) => {
                    // Project component
                    return (
                      <SwiperSlide key={product._id}>
                        <ProductCard {...product} />
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <div className="flex justify-center items-center flex-col pt-12 pb-4 grow w-full">
                    <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                      <Image
                        src={imags.noResult}
                        alt={`Not found image`}
                        fill
                      />
                    </div>
                    <h4 className="font-extrabold text-xs">
                      Sorry!.., category of the products isn't available
                    </h4>
                  </div>
                )}
              </Swiper>
            </>
          </div>
        </section>

        {/* discount section */}
        <section className="py-6 md:py-10 md:pt-20 px-4 sm:px-20 lg:px-28 flex flex-col gap-6 md:flex-row w-full">
          <div className="relative shadow-sm overflow-hidden flex h-[16rem] lg:h-[18.5rem] rounded-lg w-full lg:w-[55%]">
            <div className="w-[57%] lg:w-[60%] h-full home-bg3" />
            <div className="w-[43%] lg:w-[40%] bg-[#EDEBE9] h-full pt-8 px-4 text-center">
              <Image
                src={images.starDiscount}
                alt="image"
                priority
                className="w-[35%]"
              />
              <h2 className="text-lg font-bold italic mt-1 leading-5">
                Afruna Hand made
              </h2>
              <p className="text-xs mt-2 font-semibold">
                Giving you the best of Africa{" "}
              </p>
            </div>
            <Button className="absolute bottom-0 right-0 text-white lg:px-8 lg:py-3 bg-afruna-blue rounded-md">
              Shop Now!
            </Button>
          </div>
          <div className="relative shadow-sm overflow-hidden home-bg4 h-[16rem] lg:h-[18.5rem] rounded-lg w-full lg:w-[45%]">
            <Button className="absolute bottom-0 right-0 text-white lg:px-8 lg:py-3 bg-[#FA3434] rounded-md">
              Shop Now!
            </Button>
          </div>
        </section>

        {/* frequent items section */}
        <section className="flex flex-col gap-4 md:gap-6 mt-6 px-4 sm:px-9 lg:px-[4.2rem] md:py-10 lg:pb-20">
          <div className="flex flex-col md:border-b border-[#EFEEED] md:flex-row gap-4 md:gap-6 justify-between items-start md:items-end ">
            <div className="flex md:justify-start w-full items-center ">
              <Button
                yellowGray
                className="md:px-7 cursor-default font-extrabold"
              >
                Afruna Frequently Bought
              </Button>
            </div>

            <nav className="flex md:justify-end md:items-end w-full">
              <ul className="flex flex-wrap justify-start gap-4 items-center md:items-end md:justify-end">
                {navInfo.map((nav) => (
                  <li
                    key={nav._id}
                    className={`text-sm font-semibold capitalize relative cursor-pointer hover:text-orange-500 transition duration-500 w-fit ${
                      activeFreqNav._id === nav._id ? "text-orange-500 " : ""
                    }`}
                    onClick={() => setActiveFreqNav(nav)}
                  >
                    {nav.name}
                    <div
                      className={`w-full h-[2px] ${
                        activeFreqNav._id === nav._id ? "bg-orange-500 " : ""
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-8">
            {activeFreqNav.name === "all" ? (
              frequentProducts.slice(0, 10).map((product) => {
                // Project component
                return <ProductCard key={product._id} {...product} />;
              })
            ) : filteredFreqProducts.length > 0 ? (
              filteredFreqProducts.slice(0, 10).map((product) => {
                // Project component
                return <ProductCard key={product._id} {...product} />;
              })
            ) : (
              <div className="flex justify-center items-center flex-col pt-12 pb-4 grow w-full">
                <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                  <Image src={imags.noResult} alt={`Not found image`} fill />
                </div>
                <h4 className="font-extrabold text-xs">
                  Sorry!.., category of the products isn't available
                </h4>
              </div>
            )}
          </div>
        </section>

        {/* Brand */}
        <section className="w-fit mx-auto mt-8 md:mt-0 px-4">
          <div className="flex flex-wrap p-3 rounded-md bg-white justify-start items-center gap-4 md:gap-8">
            {brand.map(({ img }, index) => {
              return (
                <div
                  key={index}
                  className="w-[5.5rem] h-[5.5rem] sm:w-[8rem] sm:h-[7rem] lg:w-[10rem] lg:h-[10rem] shadow-md rounded-md overflow-hidden"
                >
                  <Image priority src={img} alt="brand-img" className="" />
                </div>
              );
            })}
          </div>
        </section>

        {/* earning section */}
        <section className="flex flex-col md:flex-row w-full gap-6 md:gap-3 lg:gap-8 mt-8 px-4 sm:px-12 lg:px-[6.8rem] md:py-10 lg:pb-20">
          <div className="bg-gradient-yellowGrayToBottom md:w-[40%] lg:w-[35%] pt-10 md:pt-20 px-6 h-72 md:h-[37rem] rounded-lg relative">
            <h2 className="text-xl italic leading-6 font-extrabold max-w-[8rem]">
              Oh yes ! Start Earning on Afruna
            </h2>
            <p className="font-semibold text-sm italic">
              easy.quick & relaible
            </p>
            <Image
              src={images.homeStart}
              alt="image"
              priority
              className="absolute right-0 bottom-0 w-[60%] h-[18rem] sm:h-[21rem] sm:w-[50%] md:h-[25rem] lg:h-[32rem] md:w-[100%]"
            />
            <button className="bg-afruna-blue text-sm py-3 pl-2 pr-4 text-white rounded-e-full absolute left-0 bottom-0">
              Let Get you Started
            </button>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-8 md:gap-5 lg:gap-8 md:w-[60%] lg:w-[65%]">
            {startItems.map((product) => {
              return <CustomCard items={product} key={product.id} />;
            })}
          </div>
        </section>

        {/* Movies secetion */}
        <section className="flex flex-col gap-4 md:gap-6 mt-6 px-4 sm:px-9 lg:px-[4.2rem] md:py-10 lg:pb-20">
          <div className="flex flex-col md:border-b border-[#EFEEED] md:flex-row gap-4 md:gap-6 justify-between items-start md:items-end ">
            <div className="flex md:justify-start w-full items-center ">
              <Button
                yellowGray
                className="md:px-7 cursor-default font-extrabold"
              >
                Afruna Movies
              </Button>
            </div>

            <nav className="flex md:justify-end md:items-end w-full">
              <ul className="flex flex-wrap justify-start gap-3 md:gap-4 items-center md:items-end md:justify-end">
                {moviesNav.map((nav, index) => (
                  <li
                    key={index}
                    className={`text-[0.8rem] md:text-sm font-semibold relative cursor-pointer hover:text-orange-500 transition duration-500 w-fit ${
                      selectedNav === index ? "text-orange-500 " : ""
                    }`}
                    onClick={(e: any) => handleProjectsClicked(e, index)}
                  >
                    {nav.name}
                    <div
                      className={`w-full h-[2px] ${
                        selectedNav === index ? "bg-orange-500 " : ""
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            {memoizedMoviesProducts && memoizedMoviesProducts.length > 0 ? (
              memoizedMoviesProducts.map((item) => {
                return (
                  <div className="flex justify-center items-center">
                    <div className="w-[5rem] overflow-hidden h-[13rem] lg:h-[17rem] max-w-[9.5rem] lg:max-w-[13rem] rounded-md cursor-pointer hover:scale-105 transition duration-300 relative p-2 ">
                      <Image
                        src={item.images[0]}
                        alt="movies-img"
                        priority
                        fill
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center flex-col pt-4 grow w-full">
                <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                  <Image src={imags.noResult} alt={`Not found image`} fill />
                </div>
                <h4 className="font-extrabold text-xs">
                  Sorry!.., comming soon
                </h4>
              </div>
            )}
          </div>
        </section>

        {/* books section */}
        <section className="flex flex-col gap-4 md:gap-6 mt-6 px-4 sm:px-9 lg:px-[4.2rem] md:py-10 lg:pb-20">
          <div className="flex flex-col md:border-b border-[#EFEEED] md:flex-row gap-4 md:gap-6 justify-between items-start md:items-end ">
            <div className="flex md:justify-start w-full items-center ">
              <Button
                yellowGray
                className="md:px-7 cursor-default font-extrabold"
              >
                Afruna Books
              </Button>
            </div>

            <nav className="flex md:justify-end md:items-end w-full">
              <ul className="flex flex-wrap justify-start gap-[0.6rem] sm:gap-4 items-center md:items-end md:justify-end">
                {booksNav.map((nav, index) => (
                  <li
                    key={index}
                    className={`text-[0.8rem] md:text-sm font-semibold relative cursor-pointer hover:text-orange-500 transition duration-500 w-fit ${
                      selectedNav === index ? "text-orange-500 " : ""
                    }`}
                    onClick={(e: any) => handleProjectsClicked(e, index)}
                  >
                    {nav.name}
                    <div
                      className={`w-full h-[2px] ${
                        selectedNav === index ? "bg-orange-500 " : ""
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="w-full justify-center items-center gap-4 md:gap-8">
            {/* {booksItems.map((product) => {
              // Project component
              return <CustomCard items={product} key={product.id} />;
            })}
            {activeFreqNav.name === "all" ? (
              memoizedbooksProducts.slice(0, 10).map((product) => {
                // Project component
                return <ProductCard key={product._id} {...product} />;
              })
            ) : filteredFreqProducts.length > 0 ? (
              filteredFreqProducts.slice(0, 10).map((product) => {
                // Project component
                return <ProductCard key={product._id} {...product} />;
              })
            ) : (
              <div className="flex justify-center items-center flex-col pt-12 pb-4 grow w-full">
                <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                  <Image src={imags.noResult} alt={`Not found image`} fill />
                </div>
                <h4 className="font-extrabold text-xs">
                  Sorry!.., category of the products isn't available
                </h4>
              </div>
            )} */}

            {memoizedbooksProducts && memoizedbooksProducts.length > 0 ? (
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                  },
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination, Scrollbar]}
                className="p-2"
              >
                {memoizedbooksProducts.map((item) => {
                  return (
                    <SwiperSlide
                      onClick={() => {
                        window.location.href = "/product/" + item._id;
                      }}
                      key={item._id}
                    >
                      <div className="flex justify-center items-center">
                        <div className="w-[5rem] overflow-hidden h-[13rem] lg:h-[17rem] max-w-[9.5rem] lg:max-w-[13rem] rounded-md cursor-pointer hover:scale-105 transition duration-300 relative p-2 ">
                          <Image
                            src={item.images[0]}
                            alt="movies-img"
                            priority
                            fill
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <div className="flex justify-center items-center flex-col pt-4 grow w-full">
                <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                  <Image src={imags.noResult} alt={`Not found image`} fill />
                </div>
                <h4 className="font-extrabold text-xs">
                  Sorry!.., comming soon
                </h4>
              </div>
            )}
          </div>
        </section>

        {/* vendor/seller section */}
        <section className="flex flex-col gap-6 mt-8 px-4 sm:px-9 lg:px-[4.2rem] py-10 lg:pb-20">
          <div className="flex flex-col md:border-b border-[#EFEEED] md:flex-row gap-6 justify-between items-start md:items-end ">
            <div className="flex md:justify-start w-full items-center ">
              <Button
                yellowGray
                className="md:px-7 cursor-default font-extrabold"
              >
                Afruna Vendors / Seller
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {memoizedVendor && memoizedVendor.length > 0
              ? memoizedVendor.map((user) => {
                  return (
                    <div
                      key={user?._id}
                      className="bg-[#FBF9EC] w-full max-w-[9.56rem] md:max-w-[13.3rem] lg:max-w-[17.2rem] text-center py-5 md:py-10 rounded-md hover:scale-105 transition duration-300 flex flex-col justify-center items-center"
                    >
                      {user?.avatar ? (
                        <div className="mx-auto w-[4rem] h-[4rem] lg:w-[8.5rem] lg:h-[8.5rem] rounded-full overflow-hidden md:w-[6rem] md:h-[6rem] relative flex justify-center items-center">
                          <Image
                            src={verifyImageUrl(user.avatar)}
                            alt={`${user.firstName} image`}
                            fill
                          />
                        </div>
                      ) : (
                        <div className="mx-auto w-[4rem] h-[4rem] lg:w-[8.5rem] lg:h-[8.5rem] rounded-full overflow-hidden md:w-[6rem] md:h-[6rem] relative flex justify-center items-center">
                          <Image
                            src={imags.seller1}
                            alt={`vendor image`}
                            fill
                          />
                        </div>
                      )}
                      <h2 className="text-[#232F3E] text-[0.9rem] lg:text-lg tracking-tight font-extrabold mt-3 lg:mt-4">
                        {`${user?.firstName} ${user?.lastName}`}
                      </h2>
                      <p className="text-[#232F3E] tracking-tight truncate w-full font-semibold italic text-xs lg:text-sm mt-1">
                        {user?.email}
                        {/* @MBJbuy */}
                      </p>
                      <Button
                        primary
                        className="rounded-md mt-2 md:mt-5 lg:px-7"
                      >
                        Shop with Me
                      </Button>
                    </div>
                  );
                }) //
              : null}
          </div>
        </section>

        {/* coverage country */}
        <section className="flex flex-col gap-6 md:gap-10 pb-8 md:py-16 px-4 sm:px-10 md:px-20 justify-start items-start">
          <h2 className="text-[#1C1C1C] text-xl font-extrabold md:text-2xl">
            Afruna is Now Available in this Countries
          </h2>
          <div className="flex flex-wrap gap-6 justify-start items-start">
            {countryIfo.map(({ img, country, link }) => (
              <div
                key={country}
                className="flex max-w-[8rem] md:max-w-[13rem] w-full justify-start items-start gap-2"
              >
                <Image
                  src={img}
                  alt={`${country} image`}
                  priority
                  className="w-[15%] mt-1"
                />
                <div className="flex flex-col justify-start items-start">
                  <h3 className="text-sm font-semibold text-[#1C1C1C]">
                    {country}
                  </h3>
                  <p className="text-xs font-normal text-gray-500">{link}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="text-center py-10 px-4 bg-gradient-lightGradient">
          <h1 className="text-[#1C1C1C] text-xl font-extrabold md:text-2xl">
            Subcribe on our newsletter
          </h1>
          <p className="text-[#606060] leading-5 font-normal text-sm mt-1">
            Get daily news on upcoming offers from many supplers all overthe
            world
          </p>
          <form className="max-w-[27rem] mx-auto mt-6 rounded-md border border-[#D3D3D3] overflow-hidden flex justify-center items-center">
            <input
              type="text"
              placeholder="Enter your email address..."
              className="w-full px-3 py-3 bg-white h-full placeholder:text-[#D3D3D3]"
            />
            <button className="px-6 py-3 text-white bg-afruna-blue">
              Subcribe
            </button>
          </form>
        </section>
      </main>
    </Main>
  );
});

// import Cookies from "js-cookie";
// import { getToken } from "next-auth/jwt";
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   async function middleware(req) {
//     const pathname = req.nextUrl.pathname;
//     // manage route protection
//     const isssAuth = await getToken({ req });
//     const isAuth =  Cookies.get('token')
//     // console.log(isssAuth);
//     // console.log(isAuth);

//     const isLoginPage = pathname.startsWith("/auth/login");

//     const sensitiveRoutes = ["/profile", "/order"];
//     const isAccessingsensitiveRoutes = sensitiveRoutes.some((route) =>
//       pathname.startsWith(route)
//     );

//     if (isLoginPage) {
//       if (isAuth) {
//         return NextResponse.redirect(new URL("/", req.url));
//       }
//       return NextResponse.next();
//     }

//     if (!isAuth && isAccessingsensitiveRoutes) {
//       return NextResponse.redirect(new URL("/auth/login", req.url));
//     } else {
//         return NextResponse.next()
//     }
//     // if (!isAuth && isAccessingsensitiveRoutes) {
//     //   return NextResponse.redirect(new URL("/auth/login", req.url));
//     // }
//   },
//   {
//     callbacks: {
//       async authorized() {
//         return true;
//       },
//     },
//   }
// );
// // {
// //     // pages: {
// //     //     signIn: '/',
// //     // },
// // }

// export const config = {
//   matcher: [
//     "/profile",
//     // "/order/:path*",
//   ],
// };
