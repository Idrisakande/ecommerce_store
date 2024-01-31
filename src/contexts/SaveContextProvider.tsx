import {
  FC,
  ReactNode,
  createContext,
  useCallback,
} from "react";
import { T_save_item_context } from "@/types/products";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { updateSaveItemsData } from "@/redux/features/product.slice";
import { toast } from "react-toastify";

interface SaveItemContextProvideProps {
  children: ReactNode;
}
// export create save itme context
export const SaveItemContext = createContext<T_save_item_context | null>(null);

export const SaveItemContextProvider: FC<SaveItemContextProvideProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const {saveItemsData, allProducts} = useSelector((state: RootState) => state.products)

  const handleSaveItem = useCallback(
    (_id: string) => {
      // check if the item is in the save item data
      const item = saveItemsData?.find((item) => item._id === _id);
      if (item) {
        // Filter out the item from the save item data
        const newSaveItemdata = saveItemsData && saveItemsData.filter((item) => item._id !== _id);
        dispatch(updateSaveItemsData(newSaveItemdata));
        toast.info(`Item removed successfully`);
      } else {
        // get the item and push it to the array of saveItemsdata
        const item = allProducts?.find((item) => item._id === _id)
        const otherItem = saveItemsData || []; // Default to an empty array if saveItemsData is undefined
        if (item) {
          dispatch(updateSaveItemsData([item, ...otherItem]));
          toast.success(`Item saved successfully`);
        }
      }
    },
    [allProducts, saveItemsData]
  );


  return (
    <SaveItemContext.Provider
      value={{
        handleSaveItem,
      }}
    >
      {children}
    </SaveItemContext.Provider>
  );
};


/**
 * home page
 * serch home page
 * notification end point
 * protected route
 */

