import { FC, Ref, forwardRef } from "react";
import * as Select from "@radix-ui/react-select";
import { MdCheck } from "react-icons/md";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";

import { ISelectPicker } from "@/interfaces/select-picker.interface";

// tailwind style to move div to the right end of the screen
export const SelectPicker: FC<ISelectPicker> = ({
	items,
	placeholder,
	triggerLeftIcon,
	getSelected,
}) => (
	<Select.Root onValueChange={getSelected}>
		<Select.Trigger className="text-xs text-afruna-blue font-bold md:absolute md:right-20 flex justify-between items-center">
			{triggerLeftIcon && (
				<Select.Icon className="text-lg">{triggerLeftIcon}</Select.Icon>
			)}
			<Select.Value placeholder={placeholder ?? "list items"} />
			<Select.Icon className="text-lg">
				<RxChevronDown />
			</Select.Icon>
		</Select.Trigger>
		<Select.Portal className="bg-white rounded">
			<Select.Content
				className="text-xs text-afruna-blue"
				position="popper"
			>
				<Select.ScrollUpButton className="">
					<RxChevronUp />
				</Select.ScrollUpButton>
				<Select.Viewport>
					{items?.length ? (
						items.map((item, idx) => (
							<SelectItem key={idx + item} value={item}>
								{item}
							</SelectItem>
						))
					) : (
						<></>
					)}
				</Select.Viewport>
				<Select.ScrollDownButton className="SelectScrollButton">
					<RxChevronDown />
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
);
const SelectItem = forwardRef(
	(props: Select.SelectItemProps, ref: Ref<HTMLDivElement>) => {
		const { className, children, ...otherProps } = props;
		return (
			<Select.Item
				className={
					"p-1 hover:bg-slate-500 hover:text-white flex justify-between items-center " +
					className
				}
				{...otherProps}
				ref={ref}
			>
				<Select.ItemText>{children}</Select.ItemText>
				<Select.ItemIndicator className="SelectItemIndicator">
					<MdCheck />
				</Select.ItemIndicator>
			</Select.Item>
		);
	}
);
