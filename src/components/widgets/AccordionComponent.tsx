import { ElementType, FC, ReactElement, ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { StaticImageData } from "next/image";
import { IconType } from "react-icons";
import * as RadioGroup from "@radix-ui/react-radio-group";

interface AccordionComponentProps {
  triggerClassName?: string;
  triggerText?: string;
  triggerExtraComponent?: ReactNode | ReactElement;
  items?:
    | {
        name: string;
        href: string;
        img: IconType | any;
      }[]
    | null;
  linkClassName: string;
  helps?:
    | {
        name: string;
        href: string;
        icon?: IconType | any;
      }[]
    | null;
  languages?: { id: string; value: string; language: string }[];
  currencys?: { currency: string }[];
}

export const AccordionComponent: FC<AccordionComponentProps> = ({
  triggerClassName,
  triggerText,
  items,
  linkClassName,
  triggerExtraComponent,
  helps,
  languages,
  currencys,
}) => {
  return (
    <Accordion.Root
      className="w-full"
      type="single"
      defaultValue="item-1"
      collapsible
    >
      <Accordion.Item
        className="mt-px overflow-hidden first:mt-0 focus-within:relative focus-within:z-10"
        value="item-1"
      >
        <Accordion.Header className="flex">
          <Accordion.Trigger
            className={` ${triggerClassName} group flex flex-1 cursor-pointer items-center justify-between bg-white leading-none outline-none`}
          >
            {triggerText && <h2 className="">{triggerText}</h2>}
            {triggerExtraComponent && triggerExtraComponent}
            <ChevronDownIcon
              className="
                    w-5 h-5 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-500 group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp duration-500 transition-all overflow-hidden text-[15px]">
          {items && (
            <div className="flex flex-col gap-2 pb-5">
              {items.map((Item, idx) => (
                <Link
                  key={Item.name}
                  href={Item.href}
                  className={`${linkClassName} flex gap-1 justify-start items-center`}
                >
                  <Item.img
                    className={`text-black/90 text-lg ${
                      idx === items.length - 2 && "[&>path]:fill-black/90"
                    }`}
                  />
                  <span>{Item.name}</span>
                </Link>
              ))}
            </div>
          )}

          {helps && (
            <div className="flex flex-col gap-2 pb-5">
              {helps.map(({ name, href, icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`${linkClassName} ${
                    href === "/chat"
                      ? "justify-center text-white text-sm bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500"
                      : ""
                  } flex gap-1 justify-start items-center`}
                >
                  <span className="text-white text-2xl">{icon}</span>
                  <span>{name}</span>
                </Link>
              ))}
            </div>
          )}

          {languages && (
            // {/* value="comfortable"
            //           id="r2" */}
            <RadioGroup.Root
              className="flex flex-col gap-1 pb-5"
              defaultValue="default"
              aria-label="View density"
            >
              {languages.map(({ id, value, language }) => (
                <div
                  key={value}
                  className={`${linkClassName} flex gap-2 justify-start items-center`}
                >
                  <RadioGroup.Item
                    className="bg-white w-[16px] h-[16px] rounded-full ring-2 ring-afruna-blue focus:shadow-black outline-none cursor-pointer"
                    value={value}
                    id={id}
                  >
                    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%] after:bg-afruna-blue" />
                  </RadioGroup.Item>
                  <label className="" htmlFor={id}>
                    {language}
                  </label>
                </div>
              ))}
            </RadioGroup.Root>
          )}

          {currencys && (
            <div className="flex flex-col gap-0 pb-5">
              {currencys.map(({ currency }) => (
                <button
                  key={currency}
                  className={`${linkClassName} flex gap-1 justify-start items-center`}
                >
                  {/* <span className="text-white text-2xl">{icon}</span> */}
                  <span>{currency}</span>
                </button>
              ))}
            </div>
          )}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
