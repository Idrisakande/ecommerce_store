import { T_initial_reviews_state, T_review_of_single_product } from "@/types/review";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const Reviews = createSlice({
    initialState: {
        reviewsOfSingleProduct: [
            {
                _id: "",
                productId: "",
                userId: {
                    _id: "",
                    firstName: "",
                    lastName: "",
                    avatar: ""
                },
                comment: "",
                createdAt: "",
                rating: 0,
                updatedAt: ""
            },
        ],

    } as T_initial_reviews_state,
    name: "REVIEWS",
    reducers: {
        updateReviewsOfSingleProduct(state, action: PayloadAction<T_review_of_single_product[]>) {
            state.reviewsOfSingleProduct = action.payload
        },
    },
});

export const { updateReviewsOfSingleProduct } = Reviews.actions;
export default Reviews.reducer;