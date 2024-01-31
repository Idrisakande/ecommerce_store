import { ReactElement } from "react";

export interface ISelectPicker {
	getSelected?: (selected: any) => void;
	items?: string[];
	placeholder?: string;
	triggerLeftIcon?: ReactElement;
}
