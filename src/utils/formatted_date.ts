export const formattedDate = (date: string) => {
	const currentDate = new Date(date);
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	}).format(currentDate);
};
