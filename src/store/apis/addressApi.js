import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const addressApi = createApi({
  reducerPath: 'address',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (data) => ({
        url: '/api/users/address',
        method: 'POST',
        body: data,
      }),
    }),
    getAddress: builder.query({
      query: () => '/api/users/address',
    }),
    getAddressByid: builder.query({
      query: (addressId) => `/api/users/address/${addressId}`,
    }),
    updateAddress: builder.mutation({
      query: (address) => ({
        url: `/api/users/address/${address.id}`,
        method: 'PUT',
        body: address,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `/api/users/address/${addressId}`,
        method: 'DELETE',
      }),
    }),
    setDefault: builder.mutation({
      query: (addressId) => ({
        url: `/api/users/address/set-defaul/${addressId}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useAddAddressMutation,
  useGetAddressQuery,
  useGetAddressByidQuery,
  useUpdateAddressMutation,
  useSetDefaultMutation,
  useDeleteAddressMutation,
} = addressApi;
