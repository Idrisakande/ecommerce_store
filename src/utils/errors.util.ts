import { T_error_response } from "@/types/auth.type";
import { AxiosError, isAxiosError } from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

export function handleErrors(error: AxiosError<T_error_response>, ) {
	if (isAxiosError(error)) {
		if (error.response) {
			if (error.response.data.message === "jwt expired") {
				let router = Router;
				router.push("/auth/login")
			}else
			//successful request with server response.
			// toast.error(error.response.data.message as string, {
			// 	position: "top-center",
			// 	autoClose: 5000,
			// 	hideProgressBar: true,
			// 	closeOnClick: true,
			// 	pauseOnHover: true,
			// 	draggable: true,
			// 	progress: undefined,
			// 	theme: "colored",
			// });
			console.warn(error.response.data);
			return error.response.data;
		} else if (error.request) {
			// request made but no server response
			toast.warn("Sorry! Something happened with us", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			console.warn(error.request);
			return error.request;
		} else {
			console.error("Erorr:", JSON.stringify(error));
			return error;
		}
	} else {
		/* toast.error("Make sure you have an active internet connection!", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		}); */
		console.warn({
			code: 500,
			description:
				"Something went wrong! \n Please make sure your internet connection is stable.",
			error: JSON.stringify(error),
		});
		return error;
	}
}



// export function handleAuthErrors(
// 	error: AxiosError<T_error_response>, 
// ) {
// 	if (isAxiosError(error)) {
// 		if (error.response) {
// 			if (error.response.data.message === "jwt expired") {
// 				let router = Router;
// 				router.push("/auth/login")
// 			}else
// 			//successful request with server response.
// 			toast.error(error.response.data.message as string, {
// 				position: "top-center",
// 				autoClose: 5000,
// 				hideProgressBar: true,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				progress: undefined,
// 				theme: "colored",
// 			});
// 			return error.response.data;
// 		} else if (error.request) {
// 			// request made but no server response
// 			toast.warn("Sorry! Something happened with us", {
// 				position: "top-center",
// 				autoClose: 5000,
// 				hideProgressBar: true,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				progress: undefined,
// 				theme: "colored",
// 			});
// 			return error.request;
// 		} else {
// 			return error;
// 		}
// 	} else {
// 		/* toast.error("Make sure you have an active internet connection!", {
// 			position: "top-center",
// 			autoClose: 5000,
// 			hideProgressBar: true,
// 			closeOnClick: true,
// 			pauseOnHover: true,
// 			draggable: true,
// 			progress: undefined,
// 			theme: "colored",
// 		}); */
// 		return error;
// 	}
// }
