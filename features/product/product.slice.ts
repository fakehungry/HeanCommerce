import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  GetAllCategoriesResponse,
  GetAllProductResponse,
  GetProductDetailsBody,
  GetProductDetailsResponse,
} from './product.type';

/** GET - Get all products
 * @endpoint https://fakestoreapi.com/products
 *
 * @returns {Product[]} List of products
 */
export const getAllProduct = createAsyncThunk('product/getAllProduct', async () => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_FAKE_STORE_API}/products`);

  return response.data;
});

const getAllProductSlice = createSlice({
  name: 'getAllProduct',
  initialState: {} as GetAllProductResponse,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = new Error();
        state.error.message = action.error.message || 'An error occurred';
      });
  },
});

export const getAllProductsSliceReducer = getAllProductSlice.reducer;
/** End of asyncThunk */

/** GET - Get product details
 * @endpoint https://fakestoreapi.com/products/:id
 *
 * @param {number} body.id - Product ID
 *
 * @returns {Product} Product details
 */
export const getProductDetails = createAsyncThunk(
  'product/getProductDetails',
  async (body: GetProductDetailsBody) => {
    const { id } = body;
    const response = await axios.get(`${process.env.EXPO_PUBLIC_FAKE_STORE_API}/products/${id}`);

    return response.data;
  }
);

const getProductDetailsSlice = createSlice({
  name: 'getProductDetails',
  initialState: {} as GetProductDetailsResponse,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = new Error();
        state.error.message = action.error.message || 'An error occurred';
      });
  },
});

export const getProductDetailsSliceReducer = getProductDetailsSlice.reducer;
/** End of asyncThunk */

/** GET - Get all product categories
 *
 * @endpoint https://fakestoreapi.com/products/categories
 *
 * @returns {string[]} List of product categories
 */
export const getAllCategories = createAsyncThunk('product/getAllCategories', async () => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_FAKE_STORE_API}/products/categories`);

  return response.data;
});

const getAllCategoriesSlice = createSlice({
  name: 'getAllCategories',
  initialState: {} as GetAllCategoriesResponse,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = new Error();
        state.error.message = action.error.message || 'An error occurred';
      });
  },
});

export const getAllCategoriesSliceReducer = getAllCategoriesSlice.reducer;
/** End of asyncThunk */
