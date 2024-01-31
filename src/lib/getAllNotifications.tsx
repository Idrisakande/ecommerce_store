import { T_error_response } from "@/types/auth.type";
import { T_loading_provider } from "@/types/loading";
import { handleErrors } from "@/utils/errors.util";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export const getAllNotifications = async (userId: string, opt: T_loading_provider) => {
  opt?.setIsloading && opt.setIsloading(true);
  try {
    const { data } = await axios.get(`/api/notifications/${userId}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return data.data;
  } catch (error) {
    handleErrors(error as AxiosError<T_error_response>);
  } finally{
    opt.setIsloading && opt.setIsloading(false)
  }
};
