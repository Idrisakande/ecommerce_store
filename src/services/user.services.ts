import { updateAllOrderData, updateAllUsersData, updateCurrentActiveUserData, updateMyData, updateOneUserByIdData } from "@/redux/features/user.slice";
import store from "@/redux/store";
import { T_error_response, T_update_password } from "@/types/auth.type";
import { handleErrors } from "@/utils/errors.util";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { T_loading_provider } from "@/types/loading";


class UsersActions {
    protected store = store.store

    // get all users function
    async getAllOrders() {
        try {
            const { data } = await axios.get(`/api/orders?role=user`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            const orders = data.data.slice().reverse()
            this.store.dispatch(updateAllOrderData(orders))
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }
    async getAllUsers() {
        try {
            const { data } = await axios.get(`/api/users`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            this.store.dispatch(updateAllUsersData(data.data))
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }
    async getAllVendors() {
        try {
            const { data } = await axios.get(`/api/users`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            this.store.dispatch(updateAllUsersData(data.data))
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }
    // get current active user function
    async getCurrentActiveUser() {
        try {
            const { data } = await axios.get(`/api/users/me`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            this.store.dispatch(updateCurrentActiveUserData(data.data))
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }
    // get user by id function
    async getUserById(_id: string) {
        try {
            const { data } = await axios.get(`/api/users/${_id}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            this.store.dispatch(updateOneUserByIdData(data.data))
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }
    // get my data function
    async getMyData(opt: T_loading_provider) {
        const { setIsloading } = opt;
		setIsloading && setIsloading(true);
        try {
            const { data } = await axios.get(`/api/users/me`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            this.store.dispatch(updateMyData(data.data))
            return data.data
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        } finally {
			setIsloading && setIsloading(false);
		}
    }
    async updateMe(payload: any, opt: T_loading_provider) {
		const { setIsloading } = opt;
		setIsloading && setIsloading(true);
		try {
			const { data } = await axios.put("/api/users/me", payload, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});

			this.store.dispatch(updateCurrentActiveUserData(data.data));
            return data
		} catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        } finally {
			setIsloading && setIsloading(false);
		}
	}
    async updatePassword(payload: T_update_password, opt: T_loading_provider) {
		const { setIsloading } = opt;
		setIsloading && setIsloading(true);
        try {
			const { data } = await axios.put("/api/password/", payload, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
            toast.success("Password updated successfully!");
            return data
		} catch (error) {
            handleErrors(error as AxiosError<T_error_response>)
            // const errorMessage = error.response.data as unknown as T_error_response
			// if (errorMessage.error.statusCode === 401) {
			// 	toast.error(`${errorMessage.error.message}`)
			// }
        } finally {
			setIsloading && setIsloading(false);
		}
	}
    // async createProduct(product: IProduct, opt: T_app_provider) {
	
}

export default UsersActions

