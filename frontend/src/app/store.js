import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/products/productSlice';
import allProductsReducer from '../features/allProducts/allProductsSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    allProducts: allProductsReducer
  },
});
