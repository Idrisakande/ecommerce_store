import { T_compare_context, T_freq_product_data, T_product_data } from "@/types/products";
import { FC, ReactNode, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "@/types/store.type";
import { updateCompareProductsData } from "@/redux/features/product.slice";
import { useRouter } from "next/navigation";

interface CompareContextProviderProps {
  children: ReactNode;
}

// export create compare context
export const CompareContext = createContext<T_compare_context | null>(null);

export const CompareContextProvider: FC<CompareContextProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { compareProducts, allProducts } = useSelector(
    (state: RootState) => state.products
  );
  // toast.info("Products can only be compared if they are the same category", {
  //   position: "top-center",
  //   autoClose: 3000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "colored",
  // });

  // toast.success("Item added successfully", {
  //   position: "top-center",
  //   autoClose: 3000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "colored",
  // });

  function handleCompareProducts(props: T_product_data) {
    // const withCategoryString = typeof compareProducts[0].categoryId == "string";
    //max compare product is two
    if (compareProducts.length === 0) {
      dispatch(updateCompareProductsData([props]));
      toast.success("Item added successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (compareProducts.find((i) => i._id === props._id)) {
      dispatch(
        updateCompareProductsData(
          compareProducts.filter((i) => i._id !== props._id)
        )
      );
      toast.info("Item removed successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      //  && withCategoryString && 
      compareProducts.length === 2 &&
      compareProducts.find((i) => i.categoryId._id === props.categoryId._id)
    ) {
      dispatch(updateCompareProductsData([...compareProducts, props]));
      toast.success("Item added successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      push("/compare");
      return;
    } else {
      toast.info("Can only add products within similar category!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (compareProducts.length === 2) {
      toast.info("Maximum compared products are limited to two!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
  }

  return (
    <CompareContext.Provider
      value={{
        compareProducts,
        handleCompareProducts,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
