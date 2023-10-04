import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  paypalId: '',
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (order) => {
    const response = await axios.post('/api/orders', order);
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  'orders/getOrderDetails',
  async (orderId) => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`);
      //await pause(5000);
      return response.data;
    } catch (error) {
      console.error('Error in getOrderDetails:', error);
      throw error;
    }
  }
);

export const payOrder = createAsyncThunk(
  'orders/payOrder',
  async (orderId, details) => {
    const res = await axios.put(`/api/orders/${orderId}/pay`, details);
    return res.data;
  }
);

export const getPayPalClientId = createAsyncThunk(
  'orders/getPayPalClientId',
  async () => {
    const res = await axios.get('/api/config/paypal');
    return res.data;
  }
);

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const oredersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getOrderDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

    builder
      .addCase(payOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getPayPalClientId.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPayPalClientId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paypalId = action.payload;
      })
      .addCase(getPayPalClientId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default oredersSlice.reducer;
