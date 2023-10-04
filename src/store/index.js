import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './slices/productsSlice';
import usersReducer from './slices/usersSlice';
import cartsReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import ordersReducer from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    cart: cartsReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
});

//console.log(store.getState());
