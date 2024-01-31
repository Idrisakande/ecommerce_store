export type T_initial_cart_state = {
    cart: T_cart_data
}

export type T_cart_data = {
    _id: string,
    userId: string,
    numberOfItems: number,
    total: number,
    items: T_cart_item_data[]
}

export type T_cart_item_data = {
    _id: string,
    sessionId: string,
    quantity: number,
    total: number,
    options: [],
    productId: {
        _id: string,
        name: string,
        images: [
            string
        ],
        vendorId: {
            _id: string
            firstName: string
            lastName: string
        }
    },
}

export type T_cart_context = {
    cartData: T_cart_data | null
    handleAddToCart: (payload: { productId: string, quantity?: number }) => void
    handleOneUnitFromCart: (_id: string) => void
    handleAllUnitFromCart: (_id: string) => void
    clearAllCartItems: () => void
    getCartData: () => void
}

    

// {
//     "success": false,
//     "message": "this cart is empty... add an item to begin",
//     "error": {
//         "statusCode": 500,
//         "data": null,
//         "message": "this cart is empty... add an item to begin"
//     }
// }