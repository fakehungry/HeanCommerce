import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
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
