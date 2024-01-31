import store from "@/redux/store";
import { T_error_response } from "@/types/auth.type";
import { T_wishlist_context, T_wishlist_data } from "@/types/wishlist";
import { handleErrors } from "@/utils/errors.util";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoadingStateContext } from "./LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { updateWishlistData } from "@/redux/features/wishlist.slice";

interface WishlistContextProviderProps {
  children: ReactNode;
}

// export create wishlist context
export const WishlistContext = createContext<T_wishlist_context | null>(null);

export const WishlistContextProvider: FC<WishlistContextProviderProps> = ({
  children,
}) => {
  const [wishlistData, setWishlistData] = useState<T_wishlist_data | null>(
    null
  );
  const opt = useContext(LoadingStateContext) as T_loading_provider;

  useEffect(() => {
    const fetchData = async () => {
      opt?.setIsloading && opt.setIsloading(true);
      try {
        const { data } = await axios.get(`/api/wishlists`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        setWishlistData(data.data);
        store.store.dispatch(updateWishlistData(data.data));
        return data.data;
      } catch (error) {
        handleErrors(error as AxiosError<T_error_response>);
      } finally {
        opt?.setIsloading && opt.setIsloading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToWishList = async (_id: string) => {
    try {
      const { data } = await axios.post(
        `/api/wishlists`,
        { productId: _id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      // console.log(data.data);
      setWishlistData(data.data);
      store.store.dispatch(updateWishlistData(data.data));
      return data.data;
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  };

  const handleRemoveFromWishList = async (_id: string) => {
    opt?.setIsloading && opt.setIsloading(true);
    try {
      const { data } = await axios.delete(`/api/wishlists/${_id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      // console.log(data.data);
      setWishlistData(data.data);
      store.store.dispatch(updateWishlistData(data.data));
      return data.data;
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    } finally {
      opt?.setIsloading && opt.setIsloading(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistData,
        handleAddToWishList,
        handleRemoveFromWishList,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
