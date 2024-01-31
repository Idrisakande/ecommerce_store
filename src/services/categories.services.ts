import axios, { AxiosError } from "axios";
import { handleErrors } from "@/utils/errors.util";
import store from "@/redux/store";
import Cookies from 'js-cookie';
import { setCategories } from "@/redux/features/categories.slice";
import { T_error_response } from "@/types/auth.type";
import { T_loading_provider } from "@/types/loading";

class CategoriesActions {
    private store = store.store
    // private router: NextRouter;
    // constructor() {
    //     // this.router = router;
    //     this.getCategories()
    // }
    // constructor(opt?: T_loading_provider) {
	// 	opt?.setIsloading && opt.setIsloading(true);
	// 	this.getCategories().then(
	// 		() => opt?.setIsloading && opt.setIsloading(false),
	// 	);
	// }
    async getCategories() {
        try {
            const { data } = await axios.get(`/api/categories`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                },
            })
            // console.log(data.data);
            this.store.dispatch(setCategories(data.data))
            return data.data
        } catch (error) {
            handleErrors(error as AxiosError<T_error_response>);
        }
    }

}

export default CategoriesActions;
