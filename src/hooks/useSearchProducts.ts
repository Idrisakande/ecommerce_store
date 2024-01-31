import { useState, useEffect } from "react";
import { ETimePeriod } from "@/constants/enums";
import { T_product_data } from "@/types/products";

type TData = T_product_data;

export default function useSearchProducts<T extends TData>({
	data = [],
	period,
}: {
	data: T[];
	period?: string;
}) {
	const [searchInput, setSearchInput] = useState<string>("");
	const [timePeriod, setTimePeriod] = useState<string | undefined>(period);
	const [sortingType, setSortingType] = useState<"ascending" | "descending">(
		"ascending"
	);
	const [searchResult, setSearchResult] = useState<T[]>([]);

	useEffect(() => {
		// Your main filtering logic
		const filterData = () => {
			// Filter by search input
			const filterRecursive = (
				item: any,
				searchInput: string
			): boolean => {
				for (const key in item) {
					if (typeof item[key] === "object") {
						if (filterRecursive(item[key], searchInput))
							return true;
					} else if (
						typeof item[key] === "string" &&
						item[key]
							.toLowerCase()
							.includes(searchInput.toLowerCase())
					) {
						return true;
					}
				}
				return false;
			};

			const filterBySearchTextResult = data.filter((item) =>
				filterRecursive(item, searchInput)
			);

			// Apply time period filtering if timePeriod is provided
			let filteredData = filterBySearchTextResult;
			if (timePeriod?.toLowerCase()) {
				filteredData = filterDataByTimePeriod(
					filterBySearchTextResult,
					timePeriod
				);
			}

			if (sortingType.toLowerCase()) {
				// Sorting logic
				const sortedData = sorting(filteredData, sortingType);
				setSearchResult(sortedData);
			} else {
				setSearchResult(filteredData);
			}
		};

		// Call filterData when searchInput, timePeriod, or sortingType changes
		filterData();
	}, [searchInput, timePeriod, period, sortingType, data]);

	return {
		searchInput,
		setSearchInput,
		setTimePeriod,
		sortingType,
		setSortingType,
		searchResult,
	};
}

function filterDataByTimePeriod<T extends TData>(
	data: T[],
	timePeriod: string
) {
	const currentTime = new Date();

	// Calculate the start date based on the selected time period
	let startDate = new Date().getTime();
	switch (timePeriod.toLowerCase()) {
		case ETimePeriod.THREE_DAYS:
			startDate = new Date(
				currentTime.getTime() - 3 * 24 * 60 * 60 * 1000
			).getTime();
			break;
		case ETimePeriod.ONE_WEEK:
			startDate = new Date(
				currentTime.getTime() - 8 * 24 * 60 * 60 * 1000
			).getTime();
			break;
		case ETimePeriod.TWO_MONTH:
			// Calculate the start date as three months ago from the current date
			startDate = new Date(
				currentTime.getFullYear(),
				currentTime.getMonth() - 1, // Subtract 1 to go back 2 months
				1
			).getTime();
			break;
		case ETimePeriod.SIX_MONTH:
			// Calculate the start date as six months ago from the current date
			startDate = new Date(
				currentTime.getFullYear(),
				currentTime.getMonth() - 6,
				1
			).getTime();
			break;
		case ETimePeriod.THIS_MONTH:
			// Calucate the start date from current month
			startDate = new Date(
				currentTime.getFullYear(),
				currentTime.getMonth(),
				1
			).getTime();
			break;
		default:
			// Handle unsupported time periods or custom logic here
			startDate = startDate = new Date(
				currentTime.getFullYear()
			).getTime();
			break;
	}

	// Filter data based on the createdAt field
	const filteredData = data.filter((item) => {
		const itemCreatedAt = new Date(item.createdAt as string).getTime();

		// Compare the item's createdAt date with the selected time period
		return (
			itemCreatedAt >= startDate && itemCreatedAt <= currentTime.getTime()
		);
	});

	return filteredData;
}

function sorting<T extends TData>(
	items: T[],
	sortingType: "ascending" | "descending"
) {
	return items.slice().sort((a, b) => {
		// Create a copy using slice()
		const multiplier = sortingType.toLowerCase() === "ascending" ? 1 : -1;
		return (
			multiplier *
			(new Date(a.createdAt as string).getTime() -
				new Date(b.createdAt as string).getTime())
		);
	});
}
