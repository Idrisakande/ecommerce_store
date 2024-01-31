export type T_initial_wishlist_state = {
    wishlistData: T_wishlist_data
}

export type T_wishlist_data = {
    _id: string,
    userId: string,
    productsId: string[],
}

export type T_wishlist_context = {
    wishlistData: T_wishlist_data | null
    handleAddToWishList: (_id: string) => void
    handleRemoveFromWishList: (_id: string) => void
}