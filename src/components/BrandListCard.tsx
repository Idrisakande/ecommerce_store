import { FC, useContext } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { ProductsContext } from "@/contexts/ProductsContextProvider";
import { T_products_sorting_context } from "@/types/products";

interface BrandListCardProps {
  name: string;
}

export const BrandListCard: FC<BrandListCardProps> = ({ name }) => {
  const { handleBrandsFiltering, selectedBrands } = useContext(
    ProductsContext
  ) as T_products_sorting_context;
  const isSelected = selectedBrands.includes(name);

  return (
    <div className="flex items-center gap-2">
      <Checkbox.Root
        onClick={() => handleBrandsFiltering(name)}
        className={`flex h-[16px] w-[16px] border border-afruna-blue appearance-none items-center justify-center rounded-[4px]  outline-none `}
        id="c1"
      >
        <Checkbox.Indicator
          className={`${
            isSelected
              ? "text-white bg-afruna-blue/90 focus:bg-afruna-blue"
              : "bg-transparent"
          }`}
        >
          <CheckIcon
            className={`${isSelected ? "text-white" : 'text-transparent'}`}
          />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label
        className="text-[#0C0E3B] text-[0.77rem] leading-none"
        htmlFor="c1"
      >
        {name}
      </label>
    </div>
  );
};
