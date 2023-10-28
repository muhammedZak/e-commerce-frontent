import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/api/users',
    }),
    getUser: builder.query({
      query: (userId) => `/api/users/${userId}`,
    }),
    deletUser: builder.mutation({
      query: (userId) => ({
        url: `/api/users/${userId}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/api/users/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useDeletUserMutation,
  useUpdateUserMutation,
} = usersApi;
