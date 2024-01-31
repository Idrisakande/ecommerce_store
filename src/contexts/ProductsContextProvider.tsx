import { T_error_response } from "@/types/auth.type";
import { handleErrors } from "@/utils/errors.util";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { LoadingStateContext } from "./LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { T_categories_data } from "@/types/categories";
import { T_product_data, T_products_sorting_context } from "@/types/products";
import { toast } from "react-toastify";
import { Item } from "@radix-ui/react-radio-group";

interface ProductsContextProviderProps {
  children: ReactNode;
}

// export create wishlist context
export const ProductsContext = createContext<T_products_sorting_context | null>(
  null
);

export const ProductsContextProvider: FC<ProductsContextProviderProps> = ({
  children,
}) => {
  const [allProducts, setAllProducts] = useState<T_product_data[]>([]);
  //   const { allProducts } = useSelector((state: RootState) => state.products);
  const [sortedProducts, setSortedProducts] = useState<T_product_data[]>([]);
  // const [categories, setCategories] = useState<T_categories_data[]>([]);
  const { setIsloading } = useContext(
    LoadingStateContext
  ) as T_loading_provider;
  const {} =
    //   useMemo(async () => {
    //     try {
    //       const { data } = await axios.get(`/api/categories`, {
    //         headers: {
    //           Authorization: `Bearer ${Cookies.get("token")}`,
    //         },
    //       });
    //       // console.log(data.data);
    //       setCategories(data.data);
    //       return data.data;
    //     } catch (error) {
    //       handleErrors(error as AxiosError<T_error_response>);
    //     }
    //   }, []);

    //   const [allProducts, setAllProducts] = useState<T_product_data[]>([]);
    useMemo(async () => {
      setIsloading && setIsloading(true);
      try {
        const { data } = await axios.get(`/api/products`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        // console.log(data.data);
        setSortedProducts(data.data);
        setAllProducts(data.data);
        return data.data;
      } catch (error) {
        handleErrors(error as AxiosError<T_error_response>);
      } finally {
        setIsloading && setIsloading(false);
      }
    }, []);

  const handleAllCategory = useCallback(() => {
    // Filter products based on categoryId
    const allCategory = allProducts.filter((product) => product);
    setCategoryName("All Categories");
    // check if there is no such category id
    // if (filteredProductsByCategory.length < 1) {
    //   toast.info("Sorry, no such category in the stock");
    //   return;
    // }
    //   // Concatenate the two arrays, placing products of the selected category first
    //   const combinedProducts = [
    //     ...filteredProductsByCategory,
    //     ...otherProducts,
    //   ];
    // Update the filteredProducts state with the combined array
    setSortedProducts(allCategory);
  }, [allProducts]);
  const { categories } = useSelector((state: RootState) => state.categories);
  const [categoryName, setCategoryName] = useState<string>("");
  const handleCategoryFiltering = useCallback(
    (categoryId: string) => {
      // Filter products based on categoryId
      const filteredProductsByCategory = allProducts.filter(
        (product) => product.categoryId !== null && product.categoryId._id === categoryId
      );
      // check if there is no such category id
      if (filteredProductsByCategory.length < 1) {
        toast.info("Sorry, no such category in the stock");
        return;
      }
      if (filteredProductsByCategory.length && categories) {
        const category = categories.find((item) => item._id === categoryId);
        if (category) {
          const name = category.name;
          setCategoryName(name || "");
        }
      }
      //   // Filter products that do not belong to the selected category
      //   const otherProducts = sortedProducts.filter(
      //     (product) => product.categoryId !== categoryId
      //   );
      //   // Concatenate the two arrays, placing products of the selected category first
      //   const combinedProducts = [
      //     ...filteredProductsByCategory,
      //     ...otherProducts,
      //   ];
      // Update the filteredProducts state with the combined array
      setSortedProducts(filteredProductsByCategory);
    },
    [allProducts]
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const hndOrdering = useCallback(
    (selectedBrand: string) => {
      // Check if the selectedBrand is already in the selectedBrands array
      const isSelected = selectedBrands.includes(selectedBrand);
      if (isSelected) {
        //       // If it's already selected, remove it from the selectedBrands array
        const updatedSelectedBrands = selectedBrands.filter(
          (brand) => brand !== selectedBrand
        );
        //       // Update the selected brands array
        setSelectedBrands(updatedSelectedBrands);
        // //       // Filter products based on the remaining selected brands
        // const filteredProducts = sortedProducts.filter((product) =>
        //   updatedSelectedBrands.includes(product.brand)
        // );
      } else {
      }
    },
    [selectedBrands, sortedProducts]
  );
  const handleBrandsFiltering = useCallback(
    (selectedBrand: string) => {
      // Check if the selectedBrand is already in the selectedBrands array
      const isBrandSelected = selectedBrands.includes(selectedBrand);
      // Filter products based on selectedBrand
      const filteredProductsByBrand = sortedProducts.filter(
        (product) => product.brand === selectedBrand
      );
      // check if there is no such brand
      if (filteredProductsByBrand.length === 0) {
        // Display a notification here
        toast.info(`Sorry, ${selectedBrand} is no more in the stock`);
        return;
      }
      // Filter products that do not belong to the selected selectedbrand
      const otherProducts = sortedProducts.filter(
        (product) => product.brand !== selectedBrand
      );
      if (isBrandSelected) {
        // If it's already selected, remove it from the selectedBrands array
        const updatedSelectedBrands = selectedBrands.filter(
          (brand) => brand !== selectedBrand
        );
        // // console.log(updatedSelectedBrands);
        // Update the selected brands array
        setSelectedBrands(updatedSelectedBrands);

        // Filter products based on the remaining selected brands
        // const filteredProducts = sortedProducts.filter((product) =>
        //   updatedSelectedBrands.includes(product.brand)
        // );

        // Concatenate the two arrays, placing products of the selected brand last
        const combinedProducts = [...otherProducts, ...filteredProductsByBrand];
        // Update the sortedProducts state
        setSortedProducts(combinedProducts);
      } else {
        // If it's not selected, add it to the selectedBrands array
        const updatedSelectedBrands = [...selectedBrands, selectedBrand];
        // Update the selected brands array
        setSelectedBrands(updatedSelectedBrands);
        // // Filter products based on the selected brands
        // const filteredProducts = sortedProducts.filter((product) =>
        //  updatedSelectedBrands.includes(product.brand)
        //  );

        // Concatenate the two arrays, placing products of the selected brand first
        const combinedProducts = [...filteredProductsByBrand, ...otherProducts];
        // Update the sortedProducts state
        setSortedProducts(combinedProducts);
      }
    },
    [selectedBrands, sortedProducts, setSortedProducts]
  );
  // find the highest price
  const maximumPrice = sortedProducts.reduce((maxPrice, product) => {
    // Compare the current product's price with the maximum price found so far
    return product.price > maxPrice ? product.price : maxPrice;
  }, 0); // Initialize maxPrice with 0
  // console.log("The highest price is:", maximumPrice);

  const [priceRangeSelected, setPriceRangeSelected] = useState<boolean>(false);
  const [lowprice, setlowprice] = useState<number | null>(null);
  const [highprice, sethighprice] = useState<number | null>(null);
  
  const handlePriceFiltering = useCallback(
    (lowPrice: number, highPrice: number) => {
      // Filter products based on the price range
      const filteredProductsByPriceRange = sortedProducts.filter(
        (product) => product.price >= lowPrice && product.price <= highPrice
      );
      // Check if there are products in the specified price range
      if (filteredProductsByPriceRange.length === 0) {
        toast.info(
          `Sorry, no products in the price range ${lowPrice} - ${highPrice}`
        );
        return;
      }
      // Filter products that do not belong to the price range
      const otherProducts = sortedProducts.filter(
        (product) => product.price < lowPrice || product.price > highPrice
      );
        setlowprice(lowPrice)
        sethighprice(highPrice)
        setPriceRangeSelected(true);
        const combinedProducts = [
          ...filteredProductsByPriceRange,
          ...otherProducts,
        ];
        setSortedProducts(combinedProducts);
    },
    [sortedProducts]
  );
  const closePricebox = () => {
    setPriceRangeSelected(false)
  }
  // const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  // const handleConditionOrdering = useCallback(
  //   (selectedCondition: string) => {
  //     const filteredProductsByCondition = sortedProducts.filter(
  //       (product) => product.condition === selectedCondition
  //     );

  //     if (filteredProductsByCondition.length < 1) {
  //       toast.info(`Sorry, ${selectedCondition} is no more in the stock`);
  //       return;
  //     }
  //     //   const otherProducts = sortedProducts.filter(
  //     //     (product) => product.brand !== selectedCondition
  //     //   );
  //     //   const combinedProducts = [
  //     //     ...filteredProductsByCondition,
  //     //     ...otherProducts,
  //     //   ];
  //     setSortedProducts(filteredProductsByCondition);
  //   },
  //   [sortedProducts]
  // );
  // const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [condition, setCondition] = useState<string>("");
  const handleConditionsFiltering = useCallback(
    (selectedCondition: string) => {
      // Check if the selectedCondition is equal to the condition state
      const isConditionSelected =
        condition === selectedCondition ? true : false;
      // Filter products based on selectedCondition
      const filteredProductsByCondition = sortedProducts.filter(
        (product) => product.condition === selectedCondition
      );
      // check if there is no such brand
      if (filteredProductsByCondition.length === 0) {
        // Display a notification here
        toast.info(`Sorry, ${selectedCondition} is no more in the stock`);
        return;
      }
      // Filter products that do not belong to the selected condition
      const otherProducts = sortedProducts.filter(
        (product) => product.condition !== selectedCondition
      );
      // check the condition
      if (isConditionSelected) {
        setCondition("");
        const combinedProducts = [
          ...otherProducts,
          ...filteredProductsByCondition,
        ];
        setSortedProducts(combinedProducts);
      } else {
        setCondition(selectedCondition);
        const combinedProducts = [
          ...filteredProductsByCondition,
          ...otherProducts,
        ];
        setSortedProducts(combinedProducts);
      }
    },
    [sortedProducts, condition]
  );
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [isRating, setIsRating] = useState<boolean>(false);
  const handleRatingsFiltering = useCallback(
    (selectedRating: number) => {
      const isRatingsSelected = ratingValue === selectedRating ? true : false;
      const filtered_by_the_rating = sortedProducts.filter(
        (product) => product.ratings <= selectedRating
      );
      // console.log(filtered_by_the_rating);
      const otherProducts = sortedProducts.filter(
        (product) => product.ratings > selectedRating
      );
      // console.log(otherProducts);
      if (
        filtered_by_the_rating.length === 0
        // &&
        // filtered_by_the_less_rating.length === 0
      ) {
        toast.info(
          `Sorry, ${selectedRating} range rating is no more in the stock`
        );
        return;
      }
      if (isRatingsSelected) {
        setIsRating(true);
        setRatingValue(0);
        const combinedProducts = [
          ...filtered_by_the_rating,
          ...otherProducts,
          // ...filtered_by_the_less_rating,
        ];
        setSortedProducts(combinedProducts);
      } else {
        setIsRating(false);
        setRatingValue(selectedRating);
        const combinedProducts = [
          ...otherProducts,
          ...filtered_by_the_rating,
          // ...filtered_by_the_less_rating,
        ];
        setSortedProducts(combinedProducts);
      }
    },
    [sortedProducts, ratingValue]
  );

  return (
    <ProductsContext.Provider
      value={{
        categoryName,
        sortedProducts,
        setCategoryName,
        setSortedProducts,
        setAllProducts,
        handleAllCategory,
        handleCategoryFiltering,
        closePricebox,
        selectedBrands,
        priceRangeSelected,
        handleBrandsFiltering,
        handlePriceFiltering,
        lowprice,
        highprice,
        maximumPrice,
        condition,
        handleConditionsFiltering,
        isRating,
        ratingValue,
        handleRatingsFiltering,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
