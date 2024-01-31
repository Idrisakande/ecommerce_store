import { T_categories_data, T_initial_categories_state } from "@/types/categories";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const Categories = createSlice({
    initialState: {
        categories: [
            {
                _id: '',
                name: '',
                children: [],
            }
        ]
    } as T_initial_categories_state,
    name: "Categories",
    reducers: {
        setCategories(state, action: PayloadAction<T_categories_data[]>) {
            state.categories = action.payload
        }
    }
})


export const { setCategories } = Categories.actions
export default Categories.reducer