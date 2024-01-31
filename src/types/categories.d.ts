export type T_initial_categories_state = {
    categories: T_categories_data[]
}

export type T_categories_data = {
    _id: string,
    name: string,
    children: [],
}