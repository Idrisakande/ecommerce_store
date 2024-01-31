import { updateCartData } from "@/redux/features/cart.slice";
import store from "@/redux/store";
import { T_error_response } from "@/types/auth.type";
import { handleErrors } from "@/utils/errors.util";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";


class CartActions {
    protected store = store.store

    fetchCart() {
        this.getCart()
        // this.addToCart(productId)
        // this.decreaseQuantityItem()

    }

    async getCart() {
        try {
            const { data } = await axios.get(`/api/carts`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            this.store.dispatch(updateCartData(data.data))
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }

    // add to cart function
    async addToCart(payload: { productId: string }) {
        try {
            const { data } = await axios.post(`/api/carts`, payload, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            this.getCart();
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }

    // remove from cart function
    async decreaseQuantityItem(productId: string) {
        try {
            const { data } = await axios.delete(`/api/carts/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            // store.store.dispatch(updateCartData(data.data))
            this.getCart()
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }

    // remove from cart function
    async removeFromCart(productId: string) {
        try {
            const { data } = await axios.delete(`/api/carts/${productId}/item`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            this.getCart();
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }

    // clear all cartItems function
    async clearAllCartItems() {
        try {
            const res = await axios.delete(`/api/carts`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            const { data } = res;
            store.store.dispatch(updateCartData(data))
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }
}

export default CartActions

