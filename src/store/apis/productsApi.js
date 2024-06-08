import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;

export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/api/products`,
        method: 'POST',
        body: data,
      }),
    }),
    getProducts: builder.query({
      query: ({ keyword, pageNumber, filter, attr, minPrice, maxPrice }) => ({
        url: '/api/products',
        params: { keyword, pageNumber, filter, attr, minPrice, maxPrice },
      }),
    }),
    getProduct: builder.query({
      query: (productId) => `/api/products/${productId}`,
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/api/products/${product.productId}`,
        method: 'PUT',
        body: product,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/products/${productId}`,
        method: 'DELETE',
      }),
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProductImage: builder.mutation({
      query: (imageName) => ({
        url: `/api/upload`,
        method: 'DELETE',
        body: imageName,
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `/api/products/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
    }),
    getTopProducts: builder.query({
      query: () => `/api/products/top`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useCreateProductMutation,
  useDeleteProductImageMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = productsApi;
