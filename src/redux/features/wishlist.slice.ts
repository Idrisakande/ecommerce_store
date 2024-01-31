import { T_initial_wishlist_state, T_wishlist_data } from "@/types/wishlist";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const Wishlist = createSlice({
    initialState: {
        wishlistData: {
            _id: "",
            userId: "",
            productsId: [],
        }
    } as T_initial_wishlist_state,
    name: 'Wishlist',
    reducers: {
        updateWishlistData(state, action: PayloadAction<T_wishlist_data>) {
            state.wishlistData = action.payload
        }
    }
})

export const { updateWishlistData } = Wishlist.actions
export default Wishlist.reducer