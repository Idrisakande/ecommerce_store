export type T_initial_reviews_state = {
    reviewsOfSingleProduct: T_review_of_single_product[]
}

export type T_review_of_single_product = {
    _id: string,
    productId: string,
    userId: {
        _id: string,
        firstName: string,
        lastName: string,
        avatar: string
    },
    comment: string,
    createdAt: string,
    rating: number,
    updatedAt: string,
}