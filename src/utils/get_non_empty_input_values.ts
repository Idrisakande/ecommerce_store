export const getNonEmptyInputValues = (values: {
	[key: string]: string[];
}): { [key: string]: string[] } => {
	const nonEmptyValues: { [key: string]: string[] } = {};

	for (const key in values) {
		const nonEmptyArray = values[key].filter((item) => item.trim() !== "");
		if (nonEmptyArray.length > 0) {
			nonEmptyValues[key] = nonEmptyArray;
		}
	}

	return nonEmptyValues;
};
