import { T_cart_data, T_initial_cart_state } from "@/types/cart.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const Cart = createSlice({
  initialState: {
    cart: {
      _id: "",
      userId: "",
      numberOfItems: 0,
      total: 0,
      items: [
        
      ],
    },
  } as T_initial_cart_state,
  name: "Cart",
  reducers: {
    updateCartData(state, action: PayloadAction<T_cart_data>) {
      state.cart = action?.payload
      
    },
    clearCartData(state) {
      state.cart =  {
        _id: "",
        userId: "",
        numberOfItems: 0,
        total: 0,
        items: [
          
        ],
      }
    },
  },
});

export const { updateCartData, clearCartData } = Cart.actions;
export default Cart.reducer;
