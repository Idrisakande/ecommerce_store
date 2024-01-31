import { useRouter } from "next/router";
import { FC, Ref, forwardRef, useCallback, useContext, useEffect, useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Accordion from "@radix-ui/react-accordion";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { IoCheckmark } from "react-icons/io5";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { ProductsContext } from "@/contexts/ProductsContextProvider";
import { T_products_sorting_context } from "@/types/products";
import { BrandListCard } from "./BrandListCard";
import { PriceFilteringCard } from "./PriceFiltering";
import CategoriesActions from "@/services/categories.services";

interface ProductSidebarProps {}

export const ProductSidebar: FC<ProductSidebarProps> = ({}) => {
  useEffect(() => {
    const categoriesService = new CategoriesActions()
    categoriesService.getCategories()
  }, [])
  
  const { categories } = useSelector((state: RootState) => state.categories);
  const [seeAllCategories, setSeeAllCategories] = useState<boolean>(false);
  const lesscategories = categories.filter((item, index) => {
    return index <= 4;
  });

  const brands = [
    { name: "Brand X" },
    { name: "Brand Y" },
    { name: "Brand Z" },
    { name: "Brand X-Y" },
    { name: "Samsung" },
    { name: "Huawei" },
    { name: "Oppo" },
    { name: "Tecno" },
    { name: "Infinix" },
    { name: "Lnovo" },
  ];
  const [seeAllBrands, setSeeAllBrands] = useState<boolean>(false);
  const lessBrands = brands.filter((item, index) => {
    return index <= 4;
  });

  const features = [
    { name: "Metallic" },
    { name: "Pastic cover" },
    { name: "8GM" },
    { name: "Super power" },
    { name: "Larger Memory" },
  ];
  const conditions = [
    { name: "New", value: "r1" },
    { name: ">90% New", value: "r2" },
    { name: "Used", value: "r3" },
    { name: "Refurblished", value: "r4" },
    { name: "Brand New", value: "r5" },
    { name: "Old Items", value: "r6" },
  ];
  const [seeAllConditions, setSeeAllConditions] = useState<boolean>(false);
  const lessConditions = conditions.filter((item, index) => {
    return index <= 4;
  });
  const ratingSpec = [
    { value: 5 },
    { value: 4 },
    { value: 3 },
    { value: 2 },
    { value: 1 },
  ];

  const {
    handleCategoryFiltering,
    condition,
    handleConditionsFiltering,
    isRating,
    ratingValue,
    handleRatingsFiltering,
  } = useContext(ProductsContext) as T_products_sorting_context;

  return (
    <>
      <div className="w-full h-[0.5px] border border-slate-200" />
      <ScrollArea.Root className="ScrollAreaRoot w-full max-h-full md:max-h-[60vh]  overflow-auto">
        <ScrollArea.Viewport className="ScrollAreaViewport h-full ">
          <Accordion.Root
            className="w-full flex flex-col"
            type="single"
            defaultValue="item-1"
            collapsible
          >
            <AccordionItem value="item-1" className="flex flex-col gap-2">
              <AccordionTrigger
                className={
                  "flex text-afruna-blue font-semibold pt-3 justify-between items-center w-full pr-2 text-sm"
                }
              >
                Category
              </AccordionTrigger>

              <AccordionContent className={"w-full flex flex-col"}>
                <div className="flex flex-col gap-2 justify-start items-start">
                  {seeAllCategories
                    ? categories.map((item) => (
                        <button
                          key={item._id}
                          onClick={() => handleCategoryFiltering(item._id)}
                          className="text-[0.7rem] capitalize cursor-pointer hover:underline hover:text-orange-300 duration-300 transition-all"
                        >
                          <span>{item.name}</span>
                        </button>
                      ))
                    : lesscategories.map((item) => (
                        <button
                          key={item._id}
                          onClick={() => handleCategoryFiltering(item._id)}
                          className="text-[0.7rem] capitalize cursor-pointer hover:underline hover:text-orange-300 duration-300 transition-all"
                        >
                          <span>{item.name}</span>
                        </button>
                      ))}
                </div>
                <button
                  onClick={() => setSeeAllCategories((prev) => !prev)}
                  className="text-blue-400 hover:text-orange-400 hover:underline transition-all duration-300 text-sm capitalize cursor-pointer"
                >
                  {seeAllCategories ? "See less" : "See All"}
                </button>
              </AccordionContent>
            </AccordionItem>
            <div className="w-full h-[0.5px] lg:flex border mt-1 border-slate-200" />
            <AccordionItem value="item-2" className="flex flex-col gap-2">
              <AccordionTrigger
                className={
                  "flex text-afruna-blue font-semibold pt-3 justify-between items-center w-full pr-2 text-sm"
                }
              >
                Brand
              </AccordionTrigger>

              <AccordionContent className={"w-full flex flex-col"}>
                <div className="flex flex-col gap-2 mb-2 mt-1">
                  {seeAllBrands
                    ? brands.map(({ name }) => {
                        return <BrandListCard key={name} name={name} />;
                      })
                    : lessBrands.map(({ name }) => {
                        return <BrandListCard key={name} name={name} />;
                      })}
                </div>

                <button
                  onClick={() => setSeeAllBrands((prev) => !prev)}
                  className="text-blue-400 hover:text-orange-400 hover:underline transition-all duration-300 text-sm capitalize cursor-pointer"
                >
                  {seeAllBrands ? "See less" : "See All"}
                </button>
              </AccordionContent>
            </AccordionItem>
            <div className="w-full h-[0.5px] lg:flex border mt-1 border-slate-200" />
            <AccordionItem value="item-3" className="flex flex-col gap-2">
              <AccordionTrigger
                className={
                  "flex text-afruna-blue font-semibold pt-3 justify-between items-center w-full pr-2 text-sm"
                }
              >
                Features
              </AccordionTrigger>

              <AccordionContent className={"w-full flex flex-col"}>
                <div className="flex flex-col gap-2 mb-2 mt-1">
                  {features.map((item, index) => {
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox.Root
                          // onClick={() => handle}
                          className="hover:bg-transparent flex h-[16px] w-[16px] appearance-none items-center justify-center rounded-[4px] bg-afruna-blue/90 outline-none focus:bg-afruna-blue"
                          id="c1"
                        >
                          <Checkbox.Indicator className="text-white">
                            <CheckIcon />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label
                          className="text-[#0C0E3B] text-[0.77rem] leading-none"
                          htmlFor="c1"
                        >
                          {item.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <span className="text-blue-400 text-[0.7rem] capitalize cursor-pointer">
                  See All
                </span>
              </AccordionContent>
            </AccordionItem>
            <div className="w-full h-[0.5px] lg:flex border mt-1 border-slate-200" />
            <AccordionItem value="item-4" className="flex flex-col gap-2">
              <AccordionTrigger
                className={
                  "flex text-afruna-blue font-semibold pt-3 justify-between items-center w-full pr-2 text-sm"
                }
              >
                Price range
              </AccordionTrigger>

              <AccordionContent className={"w-full flex flex-col"}>
                <RadioGroup.Root
                  defaultValue="Any"
                  aria-label="View density"
                  // value={selectedPayOptRadio || undefined}
                  // onValueChange={handlePayOptChange}
                  className="flex flex-col justify-start items-start"
                >
                  <PriceFilteringCard/>
                </RadioGroup.Root>
              </AccordionContent>
            </AccordionItem>
            <div className="w-full h-[0.5px] lg:flex border mt-1 border-slate-200" />
            <AccordionItem value="item-5" className="flex flex-col gap-2">
              <AccordionTrigger
                className={
                  "flex text-afruna-blue font-semibold pt-3 justify-between items-center w-full pr-2 text-sm"
                }
              >
                Conditions
              </AccordionTrigger>

              <AccordionContent className={"w-full flex flex-col"}>
                <RadioGroup.Root
                  defaultValue="Any"
                  aria-label="View density"
                  // value={selectedPayOptRadio || undefined}
                  // onValueChange={handlePayOptChange}
                  className="flex flex-col justify-start items-start"
                >
                  {seeAllConditions
                    ? conditions.map(({ value, name }) => (
                        <div className="flex items-center gap-2 mb-2 mt-2">
                          <RadioGroup.Item
                            className="bg-white cursor-pointer w-[16px] h-[16px] rounded-full border border-afruna-blue hover:bg- focus: outline-none"
                            value={name}
                            id={value}
                            onClick={() => handleConditionsFiltering(name)}
                          >
                            <RadioGroup.Indicator
                              className={`${
                                condition === name
                                  ? "after:bg-afruna-blue"
                                  : null
                              } flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%]`}
                            />
                          </RadioGroup.Item>
                          <label
                            className=" text-[#0C0E3B] text-[0.77rem] leading-none"
                            htmlFor={value}
                          >
                            {name}
                          </label>
                        </div>
                      ))
                    : lessConditions.map(({ value, name }) => (
                        <div
                          onClick={() => handleConditionsFiltering(name)}
                          className="flex items-center gap-2 mb-2 mt-2"
                        >
                          <RadioGroup.Item
                            className="bg-white w-[16px] h-[16px] rounded-full border border-afruna-blue hover:bg- focus: outline-none cursor-default"
                            value={name}
                            id={value}
                          >
                            <RadioGroup.Indicator
                              className={`${
                                condition === name
                                  ? "after:bg-afruna-blue"
                                  : null
                              } flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%]`}
                            />
                          </RadioGroup.Item>
                          <label
                            className=" text-[#0C0E3B] text-[0.77rem] leading-none"
                            htmlFor={value}
                          >
                            {name}
                          </label>
                        </div>
                      ))}
                  <button
                    onClick={() => setSeeAllConditions((prev) => !prev)}
                    className="text-blue-400 hover:text-orange-400 hover:underline transition-all duration-300 text-sm capitalize cursor-pointer"
                  >
                    {seeAllConditions ? "See less" : "See All"}
                  </button>
                </RadioGroup.Root>
              </AccordionContent>
            </AccordionItem>
            <div className="w-full h-[0.5px] lg:flex border mt-1 border-slate-200" />
            <AccordionItem value="item-6" className="flex flex-col gap-2">
              <AccordionTrigger
                className={
                  "flex text-afruna-blue font-semibold pt-3 justify-between items-center w-full pr-2 text-sm"
                }
              >
                Ratings
              </AccordionTrigger>

              <AccordionContent className={"w-full flex flex-col"}>
                <div className="flex flex-col gap-2 mb-2 mt-1">
                  {ratingSpec.map(({ value }, index) => {
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox.Root
                          onClick={() => handleRatingsFiltering(value)}
                          className={`flex h-[16px] w-[16px] border border-afruna-blue appearance-none items-center justify-center rounded-[4px]  outline-none `}
                          id="c1"
                        >
                          <Checkbox.Indicator
                            className={`${
                              isRating
                                ? "text-white bg-afruna-blue/90 focus:bg-afruna-blue cursor-pointer"
                                : "bg-transparent"
                            }`}
                          >
                            <CheckIcon
                              className={`${
                                ratingValue > 0 ? "text-white" : "text-transparent"
                              }`}
                            />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <div className="flex justify-center items-center gap-1 ">
                          {Array(5)
                            .fill("_")
                            .map((star, index) => (
                              <div
                                className={`${
                                  index < value
                                    ? "text-[#FF9E3A]"
                                    : "text-slate-400"
                                }  text-sm md:text-xs`}
                                key={index}
                              >
                                {index < value ? (
                                  index === Math.floor(value) &&
                                  value % 1 !== 0 ? (
                                    <BsStarHalf />
                                  ) : (
                                    <BsStarFill />
                                  )
                                ) : (
                                  <BsStar />
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
            <div className="w-full h-[0.5px] lg:flex border mt-1 border-slate-200" />
            <AccordionItem value="item-7" className="flex flex-col gap-2">
              <AccordionTrigger
                className={
                  "flex text-afruna-blue font-semibold pt-3 justify-between items-center w-full pr-2 text-sm"
                }
              >
                Manufacturer
              </AccordionTrigger>

              <AccordionContent className={"w-full flex flex-col"}>
                <div className="flex flex-col gap-2 mb-2 mt-1"></div>
              </AccordionContent>
            </AccordionItem>
          </Accordion.Root>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar p-[2px] rounded-xl mb-4 flex bg-slate-100 hover:bg-slate-200"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="" />
      </ScrollArea.Root>

      {/* </div> */}
    </>
  );
};

const AccordionItem = forwardRef(
  (props: Accordion.AccordionItemProps, forwardedRef: Ref<HTMLDivElement>) => (
    //  focus-within:shadow-[0_0_0_2px]
    <Accordion.Item
      className={classNames(
        "overflow-hidden first:mt-0 focus-within:relative focus-within:z-10",
        props.className
      )}
      {...props}
      ref={forwardedRef}
    >
      {props.children}
    </Accordion.Item>
  )
);

const AccordionTrigger = forwardRef(
  (
    props: Accordion.AccordionTriggerProps,
    forwardedRef: Ref<HTMLButtonElement>
  ) => (
    <Accordion.Header className="w-full">
      <Accordion.Trigger
        className={classNames(
          "group cursor-pointer flex  leading-none outline-none grow",
          props.className
        )}
        {...props}
        ref={forwardedRef}
      >
        {props.children}
        <ChevronDownIcon
          className=" w-5 h-5 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = forwardRef(
  (
    props: Accordion.AccordionContentProps,
    forwardedRef: Ref<HTMLDivElement>
  ) => (
    <Accordion.Content
      className={classNames(
        "data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden",
        props.className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="">{props.children}</div>
    </Accordion.Content>
  )
);
