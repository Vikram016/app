import { PRODUCTS_URL } from '../constants/apiConstants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword = '', pageNumber = '' }) => ({
        url: `${PRODUCTS_URL}`,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductDetailsQuery 
} = productsApiSlice;