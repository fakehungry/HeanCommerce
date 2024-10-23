import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  GetAllCategoriesResponse,
  GetAllProductResponse,
  GetMultipleProductsDetailsBody,
  GetMultipleProductsDetailsResponse,
  GetProductDetailsBody,
  GetProductDetailsResponse,
  GetProductsByCategoryBody,
  GetProductsByCategoryResponse,
  Product,
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

/** GET - Get products by category
 *
 * @endpoint https://fakestoreapi.com/products/category/:category
 *
 * @param {string} body.category - Product category
 *
 * @returns {Product[]} List of products
 */
export const getProductsByCategory = createAsyncThunk(
  'product/getProductsByCategory',
  async (body: GetProductsByCategoryBody) => {
    const { category } = body;
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_FAKE_STORE_API}/products/category/${category}`
    );

    return response.data;
  }
);

const getProductsByCategorySlice = createSlice({
  name: 'getProductsByCategory',
  initialState: {} as GetProductsByCategoryResponse,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = new Error();
        state.error.message = action.error.message || 'An error occurred';
      });
  },
});

export const getProductsByCategorySliceReducer = getProductsByCategorySlice.reducer;
/** End of asyncThunk */

/** GET - Get multiple products details by product id
 *
 * @endpoint https://fakestoreapi.com/products/:id
 *
 * @param {number[]} body.ids - List of
 *
 * @returns {Product[]} List of products
 */
export const getMultipleProductsDetails = createAsyncThunk(
  'product/getMultipleProductsDetails',
  async (body: GetMultipleProductsDetailsBody) => {
    const { carts } = body;
    const promises = carts.map((cart) =>
      axios.get(`${process.env.EXPO_PUBLIC_FAKE_STORE_API}/products/${cart.productId}`)
    );
    const responses = await Promise.all(promises);
    const data = responses.map((response, i) => ({
      ...response.data,
      amount: carts[i].amount,
    }));
    return data;
  }
);

const getMultipleProductsDetailsSlice = createSlice({
  name: 'getMultipleProductsDetails',
  initialState: {} as GetMultipleProductsDetailsResponse,
  reducers: {
    updateItemAmount: (state, action) => {
      const { productId, amount } = action.payload;
      state.data = state.data.map((product) => {
        if (product.id === productId) {
          product.amount = amount;
        }

        return product;
      });
    },
    deleteItem: (state, action) => {
      const { productId } = action.payload;
      state.data = state.data.filter((product) => product.id !== productId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMultipleProductsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMultipleProductsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getMultipleProductsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = new Error();
        state.error.message = action.error.message || 'An error occurred';
      });
  },
});

export const { updateItemAmount, deleteItem } = getMultipleProductsDetailsSlice.actions;
export const getMultipleProductsDetailsSliceReducer = getMultipleProductsDetailsSlice.reducer;
/** End of asyncThunk */
