import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;

export const addressApi = createApi({
  reducerPath: 'address',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/api/users/address`,
        method: 'POST',
        body: data,
      }),
    }),
    getAddress: builder.query({
      query: () => `${API_URL}/api/users/address`,
    }),
    getAddressByid: builder.query({
      query: (addressId) => `${API_URL}/api/users/address/${addressId}`,
    }),
    updateAddress: builder.mutation({
      query: (address) => ({
        url: `${API_URL}/api/users/address/${address.id}`,
        method: 'PUT',
        body: address,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `${API_URL}/api/users/address/${addressId}`,
        method: 'DELETE',
      }),
    }),
    setDefault: builder.mutation({
      query: (addressId) => ({
        url: `${API_URL}/api/users/address/set-defaul/${addressId}`,
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
