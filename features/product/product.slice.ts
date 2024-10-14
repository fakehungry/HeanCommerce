import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetAllProductResponse } from './product.type';

const getAllProductInitialState: GetAllProductResponse = {
  data: [],
  loading: false,
  error: null,
};

export const getAllProduct = createAsyncThunk('product/getAll', async () => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_FAKE_STORE_API}/products`);
  return response.data;
});

const getAllProductSlice = createSlice({
  name: 'getAllProduct',
  initialState: getAllProductInitialState,
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
