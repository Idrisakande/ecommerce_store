import { ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";

export interface IItemPicker {
  items?: string[];
  contentClassName?: string;
  getSelected: (value: string) => void;
  leftTriggerIcon?: ReactElement;
  placeholder?: string;
  triggerClassName?: string;
  extraComponent?: ReactNode | ReactElement;
  mobileView?: boolean;
  profileLinks?:
    | {
        name: string;
        href: string;
        icon?: IconType | any;
      }[]
    | null;
}
