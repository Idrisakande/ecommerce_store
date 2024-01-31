export default function (items: any[], days_recent: number) {
	const currentDate = new Date();

	const threeDaysAgo = new Date(currentDate);
	threeDaysAgo.setDate(currentDate.getDate() - days_recent);

	const recentItems = items.filter((item) => new Date(item.createdAt) >= threeDaysAgo);
	return recentItems;
}
