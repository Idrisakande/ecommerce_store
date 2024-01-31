import Image from "next/image";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { AccountLink } from "@/components/AccountLink";
import { NewsLetter } from "@/components/NewsLetter";
import Main from "@/layouts/main";
import { useSelector } from "react-redux";
import { useContext, useMemo } from "react";
import { RootState } from "@/types/store.type";
import {  WishlistCard } from "@/components/WishlistCard";
import imags from "@/constants/images";
import Link from "next/link";
import { LoadingStateContext } from "@/contexts/LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { LoadingPage } from "@/components/LoadingPage";

export default function Index() {
  const opt = useContext(LoadingStateContext) as T_loading_provider;
  // const { wishlistData } =
  //   (useContext(WishlistContext) as T_wishlist_context) || {};
  const {wishlistData} = useSelector((state: RootState) => state.wishlist)
  // console.log(wishlistData);

  // const [wishlistData, setWishlistData] = useState<T_wishlist_data | null>(
  //   null
  // );
  

  // Access the products data from the Redux store
  const { allProducts } = useSelector((state: RootState) => state.products);

  const wishlistProduct = useMemo(() => {
    if (allProducts && wishlistData) {
      // Use the filter function to get products with matching IDs
      const wishlistProducts = allProducts.filter((product) =>
        wishlistData.productsId.includes(product._id)
      );
      return wishlistProducts;
    }
    return [];
  }, [allProducts, wishlistData]);

  if (opt.isLoading) {
    return <LoadingPage/>
  }

  return (
    <Main>
      <main className="pt-5 bg-[#F2F5F7] h-full relative">
        <div className="w-full md:flex justify-center items-start gap-5 pb-10 md:pb-16 lg:pb-20 px-4 sm:px-10 md:px-12 lg:px-28">
          <AccountLink />
          <div className="flex flex-col gap-4 grow md:max-w-[73%] mx-auto">
            <h3 className="text-lg md:text-2xl font-semibold text-[#0C0E3B]">
              My Wish list
            </h3>
            {wishlistData &&
            wishlistData.productsId.length > 0 &&
            allProducts ? (
              <ScrollArea.Root className="ScrollAreaRoot w-full h-[50vh] px-2 pt-3 pb-3 bg-white overflow-auto rounded-xl">
                <ScrollArea.Viewport className="ScrollAreaViewport h-full">
                  <div className="flex w-full gap-4 rounded-xl flex-col py-8 px-4 bg-white">
                    {/* Render wishlistProduct here */}
                    {wishlistProduct.map((item) => {
                      return <WishlistCard key={item._id} item={item} />;
                    })}
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
            ) : (
              <ScrollArea.Root className="ScrollAreaRoot w-full h-[45vh] px-2 bg-white overflow-auto rounded-xl">
                <ScrollArea.Viewport className="ScrollAreaViewport h-full">
                  <div className="flex justify-center items-center flex-col pt-12 grow max-w-[50rem] lg:min-w-[55rem] w-full">
                    <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                      <Image
                        src={imags.noResult}
                        alt={`Not found image`}
                        fill
                      />
                    </div>
                    <h4 className="font-extrabold text-sm">
                      Sorry!.., No item Found
                    </h4>
                    <span className="text-gray-500 text-xs">
                      Add item(s) to your wishlist{"  "}
                      <Link
                        href={"/product"}
                        className="inline-block ml-2 font-semibold text-orange-600 hover:underline transition-all duration-300 text-[0.8rem]"
                      >
                        back to shop
                      </Link>
                    </span>
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
            )}
          </div>
        </div>
        {/* Newsletter */}
        <NewsLetter />
      </main>
    </Main>
  );
}
