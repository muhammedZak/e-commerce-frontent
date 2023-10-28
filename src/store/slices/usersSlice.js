import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  message: '',
  error: null,
};

export const addNewUser = createAsyncThunk('users/addNewUser', async (user) => {
  const response = await axios.post('/api/users/signup', user);
  return response.data;
});

export const updateUser = createAsyncThunk('users/addNewUser', async (user) => {
  const response = await axios.put('/api/users/update-me', user);
  return response.data;
});

export const loginUser = createAsyncThunk('users/loginUser', async (user) => {
  const response = await axios.post('/api/users/login', user);
  return response.data;
});

export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
  const response = await axios.post('/api/users/logout');
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.message = 'User signed in';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.message = 'User logged in';
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.message = action.payload;
      });
  },
});

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users.data;

export const selectUserById = (state, userId) =>
  state.users.data.find((user) => user._id === userId);
