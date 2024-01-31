import { FC, ReactElement } from "react";

export const StoreBtn: FC<{
	iconComponent: ReactElement;
	title: string;
	subtitle: string;
}> = ({ iconComponent, subtitle, title }) => (
	<button className="flex items-center bg-afruna-blue p-1 rounded-md text-white">
		{iconComponent}
		<div className="flex items-start flex-col p-1">
			<p className="text-[8px] font-thin">{subtitle}</p>
			<p className="text-[12px] font-semibold">{title}</p>
		</div>
	</button>
);
