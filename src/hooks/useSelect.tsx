/* eslint-disable react/display-name */
import { Ref, forwardRef, useState } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { MdCheck } from "react-icons/md";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";

const useSelect = (
  data: string[] | number[],
  placeholder: string,
  headerTitle?: string | undefined,
  contentClassName?: string | undefined,
  triggerClassName?: string | undefined
): { selected: string; ItemPicker: () => JSX.Element } => {
  const [selected, setSelected] = useState("");
  const ItemPicker = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        {headerTitle ? <h2 className="my-2">{headerTitle}</h2> : null}

        <Select.Root
          onOpenChange={setIsOpen}
          onValueChange={(val) => setSelected(val)}
        >
          <Select.Trigger
            className={classnames(
              "w-full bg-white focus:bg-white text-sm text-slate-900 border border-slate-300 flex justify-between items-center ",
              triggerClassName
            )}
          >
            <Select.Value placeholder={selected ? selected : placeholder} />
            <Select.Icon className="">
              <RxChevronDown
                className={`${
                  isOpen && "rotate-180"
                } transition ease-in duration-200 w-5 h-5`}
              />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal
            className={classnames(
              " bg-slate-50 rounded-md shadow-md text-afruna-blue w-full overflow-y-auto border border-slate-300 transition-all ease-out duration-200 delay-700",
              contentClassName
            )}
          >
            <Select.Content position="popper" className="SelectContent ">
              <Select.ScrollUpButton className="">
                <RxChevronUp />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-2 gap-2 placeholder:text-slate-400 flex flex-col rounded-md bg-white">
                {data?.length ? (
                  data.map((datum) => (
                    <SelectItem
                      key={datum}
                      value={datum}
                      className="text-xs md:text-sm cursor-pointer"
                    >
                      {datum}
                    </SelectItem>
                  ))
                ) : (
                  <></>
                )}
              </Select.Viewport>
              <Select.ScrollDownButton className="SelectScrollButton">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    );
  };
  return {
    selected,
    ItemPicker,
  };
};

const SelectItem = forwardRef(
  (
    {
      children,
      className,
      value,
      ...props
    }: {
      children: React.ReactNode;
      className: string;
      value: string | number;
    },
    forwarded: Ref<HTMLDivElement>
  ) => {
    return (
      <Select.Item
        value={value as string}
        className={classnames("relative select-none", className)}
        {...props}
        ref={forwarded}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <MdCheck />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default useSelect;
