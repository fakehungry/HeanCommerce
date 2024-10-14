import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetAllProductsResponse } from './product.type';

const getAllProductInitialState: GetAllProductsResponse = {
  data: [],
  loading: false,
  error: null,
};

export const getAllProducts = createAsyncThunk('product/getAll', async () => {
  const response = await axios.get(`${process.env.FAKE_STORE}/products`);
  return response.data;
});

export const getAllProductsSlice = createSlice({
  name: 'getAllProducts',
  initialState: getAllProductInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = new Error();
        state.error.message = action.error.message || 'An error occurred';
      });
  },
});
