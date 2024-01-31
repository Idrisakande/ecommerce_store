/* eslint-disable react/display-name */
import { Ref, forwardRef } from "react";
import * as Select from "@radix-ui/react-select";

export const SelectItem = forwardRef(
  (props: Select.SelectItemProps, ref: Ref<HTMLDivElement>) => (
    <Select.Item
      className={
        "hover:bg-slate-100 rounded-md font-semibold hover:cursor-pointer hover:scale-105 transition ease-in duration-300 my-1 p-2"
      }
      value={props.value}
    >
      <Select.ItemText ref={ref}>{props.value}</Select.ItemText>
    </Select.Item>
  )
);
