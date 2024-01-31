import axios, { AxiosError } from "axios";
import { handleErrors } from "@/utils/errors.util";
import store from "@/redux/store";
import Cookies from "js-cookie";
import {
  setAllProductData,
  setFrequentProductData,
  setLoadingOneProduct,
  updateOneProduct,
} from "@/redux/features/product.slice";
import { T_error_response } from "@/types/auth.type";
import { T_loading_provider } from "@/types/loading";

class ProductsActions {
  protected store = store.store;
  // private router: NextRouter;
  // constructor() {
  // 	this.getAllProduct(); // Initiating fetching all products
  // 	this.getAllFrequentProduct(); // Initiating fetching frequent products
  // }
  //   constructor(opt?: T_app_provider) {
  // 	opt?.setIsloading && opt.setIsloading(true);
  // 	this.getCategories().then(
  // 		() => opt?.setIsloading && opt.setIsloading(false),
  // 	);
  // 	this.getProducts().then(
  // 		() => opt?.setIsloading && opt.setIsloading(false),
  // 	);
  // }
  fetchProducts(opt: T_loading_provider) {
    this.getAllProduct(opt); // Fetch all products and update Redux
    this.getAllFrequentProduct(); // Fetch frequent products and update Redux
  }
  async getAllProduct(opt?: T_loading_provider) {
    // const {setIsloading} = opt
    opt?.setIsloading && opt.setIsloading(true);
    try {
      const { data } = await axios.get(`/api/products`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      // console.log(data.data);

      this.store.dispatch(setAllProductData(data.data));
      return data.data;
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    } finally {
      opt?.setIsloading && opt.setIsloading(false);
    }
  }
  async getAllFrequentProduct() {
    try {
      const { data } = await axios.get(`/api/products/frequent`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      // console.log(data.data);
      this.store.dispatch(setFrequentProductData(data.data));
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    }
  }
  async getOneProduct(id: string) {
    // this.store.dispatch(setLoadingOneProduct(true));
    try {
      const { data } = await axios.get(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      // this.store.dispatch(updateOneProduct(data.data));
      return data.data;
    } catch (error) {
      handleErrors(error as AxiosError<T_error_response>);
    } finally {
      // this.store.dispatch(setLoadingOneProduct(false));
    }
  }
}

export default ProductsActions;
