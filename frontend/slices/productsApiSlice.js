import { PRODUCT_URL } from "../constants/Urls";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({ 
    endpoints:(builder) => ({
        getProducts:builder.query({
            query:({ keyword, pageNumber}) => ({
                url: PRODUCT_URL,
                params:{ keyword, pageNumber }
            }),
            keepUnusedDataFor:5,
            providesTags:['Products'],
        }),
        getProductDetails:builder.query({
            query:(productID) => ({
                url:`${PRODUCT_URL}/${productID}`
            }),
            keepUnusedDataFor:5,
            providesTags:['Products'],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductsDetailsQuery } = 
productsApiSlice;