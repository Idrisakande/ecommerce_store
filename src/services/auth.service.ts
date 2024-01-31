import axios, { AxiosError } from "axios";
import { setAuth10, setToken } from "@/redux/features/auth.slice";
import store from "@/redux/store";
import {
  T_error_response,
  T_login_data,
  T_register_data,
} from "@/types/auth.type";
import { handleErrors } from "@/utils/errors.util";
import { NextRouter } from "next/router";
import {
  updateCurrentActiveUserData,
  updateUserActiveness,
} from "@/redux/features/user.slice";
import { T_user_data } from "@/types/user";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

class Auth10 {
  private store = store.store;
  private router?: NextRouter;
  constructor(router?: NextRouter) {
    this.router = router;
  }

  async handleLogin(user_data: T_login_data) {
    try {
      const { dispatch } = this.store;
      const { rememberMe, ...credentials } = user_data;
      const { data } = await axios.post(`/api/signin`, credentials);
      // console.log(data);
      const {
        data: { user },
      } = data;
      // console.log(user);
      dispatch(setAuth10(true));
      dispatch(setToken(data.data.token));
      dispatch(updateUserActiveness(true));
      dispatch(updateCurrentActiveUserData(user as T_user_data));
      this.router && this.router.replace("/");
      toast.success("You have login successfuliy", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return data;
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  }
  async handleLogout() {
    // Cookies.remove("token");
    this.store.dispatch(setAuth10(false));
    this.store.dispatch(updateUserActiveness(false));
    this.store.dispatch(updateCurrentActiveUserData(undefined));
    this.router && this.router.replace("/");
  }
  async handleSignup(user_data: T_register_data) {
    try {
      const { dispatch } = this.store;
      const { data } = await axios.post("/api/signup", user_data);
      // console.log(data);
      const {
        data: { user },
      } = data;
      // console.log(user);
      // console.log(data.data.token);
      // dispatch(setAuth10(true));
      Cookies.set("token", data.data.token);
      this.router && this.router.replace("/auth/login");
      toast.success("You have sign up successfuliy", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  }
  async googlesignin() {
    try {
      const res = await axios.get("/api/oAuthUrls");
      return res.data;
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  }
}

export default Auth10;
