import { updateReviewsOfSingleProduct } from "@/redux/features/reviews.slice";
import store from "@/redux/store";
import { T_error_response } from "@/types/auth.type";
import { handleErrors } from "@/utils/errors.util";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";


class ReviewsActions {
    protected store = store.store

    // get review of single product function
    async getReviewsByProduct(productId: string) {
        try {
            const { data } = await axios.get(`/api/reviews/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            });
            this.store.dispatch(updateReviewsOfSingleProduct(data.data))
            return data.data
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }
}

export default ReviewsActions 