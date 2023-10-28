import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import productsReducer from './slices/productsSlice';
import usersReducer from './slices/usersSlice';
import cartsReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import { ordersApi } from './apis/ordersApi';
import { usersApi } from './apis/usersApi';
import { productsApi } from './apis/productsApi';
import { addressApi } from './apis/addressApi';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    cart: cartsReducer,
    auth: authReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(ordersApi.middleware)
      .concat(usersApi.middleware)
      .concat(productsApi.middleware)
      .concat(addressApi.middleware);
  },
});
