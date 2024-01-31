import Image from "next/image";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { AccountLink } from "@/components/AccountLink";
import Link from "next/link";
import { NewsLetter } from "@/components/NewsLetter";
import Main from "@/layouts/main";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { useContext, useMemo, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { handleErrors } from "@/utils/errors.util";
import { T_error_response } from "@/types/auth.type";
import { LoadingStateContext } from "@/contexts/LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { LoadingPage } from "@/components/LoadingPage";
import { T_product_data } from "@/types/products";
import imags from "@/constants/images";
import { getAllNotifications } from "@/lib/getAllNotifications";
import withAuth10 from "@/hooks/withAuth";

export default withAuth10( function Index() {
  const {currentActiveUsersData} = useSelector((state: RootState) => state.users)
  // currentActiveUsersData?._id
  const opt = useContext(
    LoadingStateContext
  ) as T_loading_provider;
  // const notifications: Promise<> = getAllNotifications(currentActiveUsersData?._id, opt)
  // const productService = new ProductsActions()
  // const { allProducts } = useSelector((state: RootState) => state.products);
  const [allProducts, setAllProducts] = useState<T_product_data[]>([]);
 
  useMemo(async () => {
    opt?.setIsloading && opt?.setIsloading(true);
    try {
      const { data } = await axios.get(`/api/products`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      // console.log(data.data);
      return data.data;
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    } finally {
      opt?.setIsloading && opt?.setIsloading(false);
    }
  }, []);

  const noti = [
    {
      title: "Package Ready for Collection again",
      message:
        '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium accusantium doloremque laudantium, ',
    },
    {
      title: "Package Ready for Collection",
      message:
        '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,',
    },
    {
      title: "Package Ready for Collection",
      message:
        '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,',
    },
  ];
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (opt?.isLoading) {
    return <LoadingPage />;
  }

  return (
    <Main>
      <main className="pt-5 bg-[#F2F5F7] h-full relative">
        <div className="w-full md:flex justify-center items-start gap-5 pb-10 md:pb-16 px-4 sm:px-10 md:px-12 lg:px-32">
          <AccountLink />
          <div className="flex flex-col gap-4 grow md:max-w-[70%] mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-[#0C0E3B]">
              Notification's
            </h3>
            <ScrollArea.Root className="ScrollAreaRoot w-full h-[55vh] md:h-[82vh] lg:h-[55vh] px-2 pt-3 pb-3 bg-white overflow-auto rounded-xl">
              <ScrollArea.Viewport className="ScrollAreaViewport h-full">
                <div className="flex w-full grow gap-4 rounded-xl flex-col py-4 lg:py-8 px-2 md:px-4 lg:px-8 bg-white">
                  {noti && noti.length > 0 ? (
                    noti.map(({ title, message }, index) => (
                      <div
                        key={index}
                        className="border w-full rounded-md border-[#D5D5E6] px-4 pr-8 sm:px-6 sm:pr-14 py-4 lg:py-8 lg:pr-28 flex flex-col justify-start items-start gap-2"
                      >
                        <h2 className="text-sm font-semibold">{title}</h2>
                        <p className="text-xs ">
                          {showFullDescription ? (
                            <>{message}</>
                          ) : (
                            <>{`${message.slice(0, 140)}...`}</>
                          )}
                          {message.length > 100 && (
                            <button
                              onClick={() =>
                                setShowFullDescription((prev) => !prev)
                              }
                              className=" text-xs ml-1 cursor-pointer text-orange-400"
                            >
                              {showFullDescription ? "Read less" : "Read more"}
                            </button>
                          )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center flex-col pt-12 grow max-w-[50rem] lg:min-w-[55rem] w-full">
                      <div className="h-[7rem] w-[10rem] lg:w-[12rem] lg:h-[8rem] overflow-hidden mx-auto relative">
                        <Image
                          src={imags.noResult}
                          alt={`Not found image`}
                          fill
                        />
                      </div>
                      <h4 className="font-extrabold text-sm">
                        Sorry!.., You have no notification(s) for now
                      </h4>
                      <span className="text-gray-500 text-xs">
                        Enjoy your shopping by going{"  "}
                        <Link
                          href={"/"}
                          className="inline-block ml-2 font-semibold text-orange-600 hover:underline transition-all duration-300 text-[0.8rem]"
                        >
                          back to shop
                        </Link>
                      </span>
                    </div>
                  )}
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
          </div>
        </div>
        {/* Newsletter */}
        <NewsLetter />
      </main>
    </Main>
  );
})
