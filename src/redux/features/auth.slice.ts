import { T_initial_auth_state } from "@/types/auth.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const Auth = createSlice({
	initialState: { isAuthenticated: false, token: '' } as T_initial_auth_state,
	name: "AUTH",
	reducers: {
		setAuth10(state, action: PayloadAction<boolean>) {
			state.isAuthenticated = action.payload;
		},
		setToken(_, action: PayloadAction<string>) {
			Cookies.set("token", action.payload,{expires: 3})
		},
	},
});

export const { setAuth10, setToken } = Auth.actions;
export default Auth.reducer;
