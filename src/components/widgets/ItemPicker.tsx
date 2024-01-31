import { FC, useState } from "react";
import classnames from "classnames";
import * as Select from "@radix-ui/react-select";
import { FiChevronDown } from "react-icons/fi";
import { IItemPicker } from "@/interfaces/item-picker.interface";
import { SelectItem } from "./SelectItem";
import Link from "next/link";

export const ItemPicker: FC<IItemPicker> = ({
  extraComponent,
  contentClassName,
  getSelected,
  items,
  placeholder,
  triggerClassName,
  leftTriggerIcon,
  mobileView,
  profileLinks,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Select.Root onValueChange={getSelected} onOpenChange={setIsOpen}>
      <Select.Trigger
        className={classnames(
          "p-1 font-bold border-none placeholder:text-gray-400",
          triggerClassName && triggerClassName
        )}
      >
        {leftTriggerIcon ? <Select.Icon>{leftTriggerIcon}</Select.Icon> : null}
        {mobileView ? null : (
          <>
            <Select.Value className="text-gray-400 placeholder:text-gray-400" placeholder={placeholder ?? "Select"} />
            <Select.Icon>
              <FiChevronDown
                className={`${
                  isOpen && "rotate-180"
                } text-lg transition ease-linear duration-300`}
              />
            </Select.Icon>
          </>
        )}
        {/* <div className="hidden md:flex justify-center items-center gap-1">
          
        </div> */}
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          className={classnames(contentClassName && contentClassName)}
        >
          {items &&
            items.map((item, id) => <SelectItem value={item} key={id} />)}

          {profileLinks && (
            <div className="flex flex-col gap-1">
              {profileLinks.map(({ name, href, icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex gap-1 justify-start items-center hover:bg-orange-200 text-afruna-blue text-xs font-semibold rounded-md hover:cursor-pointer hover:scale-105 transition ease-in duration-300 w-full mx-auto py-[0.4rem] px-2 max-w-[90%]`}
                >
                  <span className="text-base">{icon}</span>
                  <span>{name}</span>
                </Link>
              ))}
            </div>
          )}
          {extraComponent}
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
