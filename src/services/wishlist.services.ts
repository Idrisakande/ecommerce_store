import { updateWishlistData } from "@/redux/features/wishlist.slice";
import store from "@/redux/store";
import { T_error_response } from "@/types/auth.type";
import { handleErrors } from "@/utils/errors.util";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";


class WishlistActions {
    protected store = store.store
    // get all wishlist data function
    async getAllWishList() {
        try {
            const { data } = await axios.get(`/api/wishlists`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            // // console.log(data.data);
            this.store.dispatch(updateWishlistData(data.data))
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }
    // add to wishlist data function
    async addToWishList(payload: { productId: string }) {
        try {
            const { data } = await axios.post(`/api/wishlists`, payload, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            this.getAllWishList()
            // console.log(data.data);
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }
    // remove from wishlist data function
    async removeFromWishlist(productId: string) {
        try {
            const { data } = await axios.delete(`/api/wishlists/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            this.getAllWishList()
            // console.log(data.data);
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }

}

export default WishlistActions