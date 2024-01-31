import { T_initial_product_state, T_product_data } from "@/types/products";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const Products = createSlice({
  initialState: {
    allProducts: [],
    frequentProducts: [ ],
    oneProduct: {
      _id: "",
      name: "",
      desc: "",
      quantity: 0,
      categoryId: {
        _id: "",
        name: "",
        children: [],
      },
      price: 0,
      discount: 0,
      images: [""],
      coverPhoto: [""],
      ratings: 0,
      vendorId: "",
      color: [""],
      size: "",
      condition: "",
      brand: "",
      metaData: [""],
      deliveryLocations: [""],
      isOutOfStock: false,
      ratedBy: 0,
      createdAt: "",
      updatedAt: "",
      customId: "",
    },
    compareProducts: [],
    saveItemsData: [],
    loadingOneProduct: false
  } as unknown as unknown as T_initial_product_state,
  name: "Products",
  reducers: {
    setLoadingOneProduct(state, action: PayloadAction<boolean>) {
      state.loadingOneProduct = action.payload;
    },
    setAllProductData(state, action: PayloadAction<T_product_data[]>) {
      state.allProducts = action.payload;
    },
    setFrequentProductData(state, action: PayloadAction<T_product_data[]>) {
      state.frequentProducts = action.payload;
      
    },
    updateCompareProductsData(
      state,
      action: PayloadAction<T_product_data[] | []>
    ) {
      state.compareProducts = action.payload;
    },
    updateSaveItemsData(state, action: PayloadAction<T_product_data[]>) {
      state.saveItemsData = action.payload;
    },
    updateOneProduct(state, action: PayloadAction<T_product_data>) {
      state.oneProduct = action.payload;
    },
  },
});
// [...state.compareProducts, action.payload];
export const {
  setLoadingOneProduct,
  setAllProductData,
  setFrequentProductData,
  updateOneProduct,
  updateCompareProductsData,
  updateSaveItemsData,
} = Products.actions;
export default Products.reducer;
