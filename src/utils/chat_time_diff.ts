export function getChatTimeDiff(createdAt: Date): string {
	const now = new Date();
	const timeDifference = now.getTime() - createdAt.getTime();
	const seconds = Math.floor(timeDifference / 1000);

	if (seconds < 60) {
		return `${seconds} s`;
	}

	const minutes = Math.floor(seconds / 60);

	if (minutes < 60) {
		return `${minutes}m`;
	}

	const hours = Math.floor(minutes / 60);

	if (hours < 24) {
		return `${hours}h`;
	}

	const days = Math.floor(hours / 24);

	if (days < 7) {
		return `${days}d`;
	}

	return createdAt.toDateString();
}
