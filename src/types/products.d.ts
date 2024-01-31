export type T_initial_product_state = {
  allProducts: T_product_data[];
  frequentProducts: T_product_data[];
  compareProducts: T_product_data[];
  saveItemsData: T_product_data[];
  oneProduct: T_product_data;
  loadingOneProduct: boolean
};

export type T_product_data = {
  // [x: string]: boolean;
  _id: string;
  name: string;
  desc: string;
  quantity: number;
  categoryId: {
    _id: string;
    name: string;
    parent: string
    children: [];
    options?: string[];
  }
  price: number;
  discount: number;
  images: string[];
  coverPhoto: string[];
  ratings: number;
  vendorId: {
    _id: string,
    firstName: string,
    lastName: string
},
  color: string[];
  size: string;
  condition: string;
  brand: string;
  metaData: string[];
  deliveryLocations: string[];
  isOutOfStock: boolean;
  ratedBy: number;
  createdAt: string;
  updatedAt: string;
  customId: string;
  frequency: number;
  hype?: boolean;
  blocked?: boolean;
};
export type T_freq_product_data = {
  // [x: string]: boolean;
  _id: string;
  name: string;
  desc: string;
  quantity: number;
  categoryId: string;
  price: number;
  discount: number;
  images: string[];
  coverPhoto: string[];
  ratings: number;
  vendorId: {
    _id: string,
    firstName: string,
    lastName: string
},
  color: string[];
  size: string;
  condition: string;
  brand: string;
  metaData: string[];
  deliveryLocations: string[];
  isOutOfStock: boolean;
  ratedBy: number;
  createdAt: string;
  updatedAt: string;
  customId: string;
  frequency: number;
  hype?: boolean;
  blocked?: boolean;
};
export type T_compare_context = {
  compareProducts: T_product_data[];
  handleCompareProducts:(props:T_product_data) => void;
  // handleclick : (_id: string) => void
};
export type T_save_item_context = {
  handleSaveItem: (_id: string) => void;
};
export type T_products_sorting_context = {
  categoryName: string;
  setCategoryName: SetStateAction<string>;
  sortedProducts: T_product_data[];
  setSortedProducts: SetStateAction<T_product_data[]>;
  setAllProducts: SetStateAction<T_product_data[]>;
  handleAllCategory: () => void;
  handleCategoryFiltering: (categoryId: string) => void;
  selectedBrands: string[];
  handleBrandsFiltering: (selectedBrand: string) => void;
  lowprice: number | null;
  highprice: number | null;
  maximumPrice: number;
  priceRangeSelected: boolean;
  closePricebox: () => void;
  handlePriceFiltering: (lowPrice: number, highPrice: number) => void;
  condition: string;
  handleConditionsFiltering: (selectedCondition: string) => void;
  isRating: boolean;
  ratingValue: number;
  handleRatingsFiltering: (selectedRating: number) => void;
};
