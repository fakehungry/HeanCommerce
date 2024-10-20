import {
  getAllCategoriesSliceReducer,
  getAllProductsSliceReducer,
  getProductDetailsSliceReducer,
  getProductsByCategorySliceReducer,
} from '@/features/product/product.slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeSliceReducer from '../features/theme/theme.slice';

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    product: combineReducers({
      getAllProducts: getAllProductsSliceReducer,
      getProductDetails: getProductDetailsSliceReducer,
      getAllCategories: getAllCategoriesSliceReducer,
      getProductsByCategory: getProductsByCategorySliceReducer,
    }),
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
