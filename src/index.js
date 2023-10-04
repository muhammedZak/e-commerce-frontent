import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/index';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/Home';
import ProductsList from './pages/ProductsList';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ShippingPage from './pages/ShippingPage';
import PaymentMethod from './pages/PaymentPage';
import PlaceOrder from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/men" element={<ProductsList />} />
      <Route path="/women" element={<ProductsList />} />
      <Route path="/watches" element={<ProductsList />} />
      <Route
        index={true}
        path="/products/:id"
        element={<ProductDetailsPage />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/cart" element={<CartPage />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders/:id" element={<OrderPage />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
