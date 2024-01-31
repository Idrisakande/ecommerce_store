import {
  ChangeEvent,
  DragEvent,
  FC,
  FormEvent,
  useContext,
  useRef,
  useState,
} from "react";
import { ProductsContext } from "@/contexts/ProductsContextProvider";
import { T_products_sorting_context } from "@/types/products";
import * as Slider from "@radix-ui/react-slider";

interface PriceFilteringProps {
  //   name: string;
}

export const PriceFilteringCard: FC<PriceFilteringProps> = () => {
  const { maximumPrice, handlePriceFiltering } = useContext(
    ProductsContext
  ) as T_products_sorting_context;
  const [lowPrice, setLowPrice] = useState<number>(80);
  const [highPrice, setHighPrice] = useState<number>(600);
  const [error, setError] = useState<string | null>(null);
  // Function to handle slider value change
  const handleSliderDrag = (values: number[]) => {
    // console.log(values[0]);
    // console.log(values[1]);
    setLowPrice(values[0]);
    setHighPrice(values[1]);
  };
  // Function to handle slider value change
  // const handleSliderDragWrapper = (
  //   event: DragEvent<HTMLDivElement>
  // ) => {
  //   // Cast event as any to access the values property (not recommended, but works)
  //   const sliderEvent = event as any;
  //   const values = sliderEvent.target.values as number[];
  //   handleSliderDrag(values);
  // };

  const lowPriceRef = useRef<HTMLInputElement | null>(null);
  const handleLowPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setLowPrice(value);
      setError(null); // Clear error
    } else {
      // setError("Min price is required");
      if (lowPriceRef.current) {
        lowPriceRef.current.textContent = "Min price required";
      }
    }
  };
  // Function to handle input change for maximum price
  const highPriceRef = useRef<HTMLInputElement | null>(null);
  const handleHighPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setHighPrice(value);
      setError(null); // Clear error
    } else {
      if (highPriceRef.current) {
        highPriceRef.current.textContent = "Max price required";
      }
    }
  };
  // Function to handle apply button click
  const handleApplyClick = () => {
    // Access lowPrice and highPrice for further processing
    // console.log("Minimum Price:", lowPrice);
    // console.log("Maximum Price:", highPrice);
    //  filter the products base on the lowprice and highPrice
  };

  return (
    <form className="flex flex-col gap-4 pt-3 pr-2 pb-4">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        defaultValue={[lowPrice, highPrice]}
        max={maximumPrice}
        step={5}
        minStepsBetweenThumbs={2000}
        onValueChange={handleSliderDrag}
      >
        <Slider.Track className=" bg-blue-400 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-rose-400 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border border-afruna-blue rounded-[10px] focus:outline-none focus:shadow-[0_0_0_1px] focus:shadow-slate-700"
          aria-label="Volume"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white border border-afruna-blue rounded-[10px] focus:outline-none focus:shadow-[0_0_0_1px] focus:shadow-slate-700"
          aria-label="Volume"
        />
      </Slider.Root>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex gap-2 justify-between items-center">
          <fieldset className="w-full">
            <label
              htmlFor={"min"}
              className="text-xs font-semibold text-[#232F3E] leading-6"
            >
              Min
            </label>
            <div
              className={`flex mt-[0.2rem] items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-xs
                  font-medium rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                  transition duration-300 
                  `}
            >
              <input
                id={"min"}
                type={"number"}
                placeholder={"0"}
                autoComplete={"min"}
                value={lowPrice}
                ref={lowPriceRef}
                onChange={handleLowPriceChange}
                // disabled={disabled}
                className="w-full bg-white p-[0.4rem]"
              />
            </div>
            {lowPrice < 0 && (
              <span
                ref={lowPriceRef}
                className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1"
              ></span>
            )}
            {/* {error && (
              <span className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1">
                {error}
              </span>
            )} */}
          </fieldset>
          <fieldset className="w-full">
            <label
              htmlFor={"max"}
              className="text-xs font-semibold text-[#232F3E] leading-6"
            >
              Max
            </label>
            <div
              className={`flex mt-[0.2rem] items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-xs
                  font-medium rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                  transition duration-300
                  `}
            >
              <input
                id={"max"}
                type={"number"}
                placeholder={"9999"}
                autoComplete={"max"}
                value={highPrice}
                ref={highPriceRef}
                // disabled={disabled}
                onChange={handleHighPriceChange}
                className="w-full bg-white p-[0.4rem]"
              />
            </div>
            {highPrice < 0 && (
              <span
                ref={highPriceRef}
                className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1"
              ></span>
            )}
            {error && (
              <span className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1">
                {error}
              </span>
            )}
          </fieldset>
        </div>
        <button
          type="button"
          onClick={() => handlePriceFiltering(lowPrice, highPrice)}
          className={`flex px-4 py-[0.4rem] mt-[0.2rem] border-[2px] hover:text-[#FFDBB6] text-xs
                  font-medium bg-white rounded-md focus-visible:shadow-md transition duration-300
                  `}
        >
          Apply
        </button>
      </div>
    </form>
  );
};
