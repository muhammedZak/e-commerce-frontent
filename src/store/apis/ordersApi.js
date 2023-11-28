import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
  reducerPath: 'orders',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getOrderById: builder.query({
      query: (orderId) => `/api/orders/${orderId}`,
    }),
    getPayPalClientId: builder.query({
      query: () => '/api/config/paypal',
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `/api/orders/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/api/orders',
        method: 'POST',
        body: order,
      }),
    }),
    getMyOrders: builder.query({
      query: () => '/api/orders/my-orders',
    }),
    getOrders: builder.query({
      query: () => '/api/orders',
    }),
    stripePay: builder.mutation({
      query: (order) => ({
        url: 'api/payments/create-checkout-session',
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useStripePayMutation,
} = ordersApi;
