import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { decodeJWT } from "./decode_jwt";
import store from "@/redux/store";
import { setAuth10 } from "@/redux/features/auth.slice";

export const isAuthenticated = () => {
	// Check valid sessions and tokens
	setTimeout(() => {}, 3000); //3s delay
	const token = Cookies.get("token");
	if (token) {
		const decodedToken = decodeJWT(token);
		if (decodedToken) {
			const expiryTime = decodedToken.exp * 1000; //converted from milliseconds;
			const hasExpired = expiryTime < Date.now();
			if (hasExpired) {
				toast.warn("Session reset. Please login!");
				console.warn("Session reset. Please login!");
				return false;
			} else {
				store.store.dispatch(setAuth10(true));
				return true;
			}
		} else {
			toast.warn("Invalid or tampered Session");
			console.warn("Invalid or tampered Session");
		}
	} else {
		// Token not found in cookies, user is not authenticated
		toast.warn("User is not authenticated");
		console.warn("User is not authenticated");
	}
	return false;
};
