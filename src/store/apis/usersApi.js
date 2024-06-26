import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: (credential) => ({
        url: '/api/users/auth/google',
        method: 'POST',
        body: credential,
      }),
    }),
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
  useGoogleLoginMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useDeletUserMutation,
  useUpdateUserMutation,
} = usersApi;
