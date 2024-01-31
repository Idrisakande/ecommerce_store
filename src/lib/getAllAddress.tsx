import { T_error_response } from "@/types/auth.type";
import { handleErrors } from "@/utils/errors.util";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export default async function getAllAddress() {
  //
  try {
    const { data } = await axios.get(`/api/orders/addresses`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return data.data
  } catch (error) {
    handleErrors(error as AxiosError<T_error_response>);
  }
}
