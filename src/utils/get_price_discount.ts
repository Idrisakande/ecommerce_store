export function priceDiscount(originalPrice:number, discountPercentage:number) {
	// Ensure discount percentage is within a valid range (0 to 100)
	if (discountPercentage < 0 || discountPercentage > 100) {
		throw new Error("Discount percentage must be between 0 and 100.");
	}

	// Calculate the discounted price
	const discountAmount = (originalPrice * discountPercentage) / 100;
	const discountedPrice = originalPrice - discountAmount;

	return discountedPrice;
}
