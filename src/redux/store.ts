import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "@/redux/features/auth.slice";
import userReducer from '@/redux/features/user.slice';
import categoriesReducer from '@/redux/features/categories.slice'
import productsReducer from '@/redux/features/product.slice'
import cartReducer from '@/redux/features/cart.slice'
import wishlistReducer from '@/redux/features/wishlist.slice'
import reviewReducer from '@/redux/features/reviews.slice'

// local storage configuration
const config = {
	key: "root",
	storage,
};

//every reducers combined
const rootReducer = combineReducers({
	auth: authReducer,
	users: userReducer,
	categories: categoriesReducer,
	products: productsReducer,
	cart: cartReducer,
	wishlist: wishlistReducer,
	reviews: reviewReducer,
});
const persistedReducer = persistReducer(config, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
});

const persitor = persistStore(store);

export default {
	persitor,
	store,
};
