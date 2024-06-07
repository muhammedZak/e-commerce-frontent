import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/index';
import PrivateRoute from './components/Routes/PrivateRoute';
import AdminRoutes from './components/Routes/AdminRoutes';
import HomePage from './pages/Home';
// import ProductsList from './pages/ProductsList';
// import ProductDetailsPage from './pages/ProductDetailsPage';
// import CartPage from './pages/CartPage';
// import LoginPage from './pages/LoginPage';
// import SignUpPage from './pages/SignUpPage';
// import ShippingPage from './pages/ShippingPage';
import PaymentMethod from './pages/PaymentPage';
import PlaceOrder from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
// import ProfilePage from './pages/ProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderListPage from './pages/Admin/OrderListPage';
// import UsersListPage from './pages/Admin/UsersListPage';
import UserEditPage from './pages/Admin/UserEditPage';
// import ProductsListPage from './pages/Admin/ProductsListPage';
import ProductCreate from './pages/Admin/ProductCreate';
import ProductEditPage from './pages/Admin/ProductEditPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

const ProductsList = lazy(() => import('./pages/ProductsList'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const ShippingPage = lazy(() => import('./pages/ShippingPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const UsersListPage = lazy(() => import('./pages/Admin/UsersListPage'));
const ProductsListPage = lazy(() => import('./pages/Admin/ProductsListPage'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="/search/:keyword" element={<HomePage />} />
      <Route
        path="/watches"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <ProductsList />
          </Suspense>
        }
      />
      <Route
        path="/watches/:filter"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <ProductsList />
          </Suspense>
        }
      />
      <Route
        path="/watches/:filter/page/:pageNumber"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <ProductsList />
          </Suspense>
        }
      />
      <Route
        path="/watches/search/:keyword"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <ProductsList />
          </Suspense>
        }
      />
      <Route
        path="/watches/search/:keyword/page/:pageNumber"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <ProductsList />
          </Suspense>
        }
      />
      <Route
        index={true}
        path="/products/:id"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <ProductDetailsPage />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <SignUpPage />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <CartPage />
          </Suspense>
        }
      />
      {/* logged in users */}
      <Route path="" element={<PrivateRoute />}>
        <Route
          path="/shipping"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <ShippingPage />
            </Suspense>
          }
        />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders/:id" element={<OrderPage />} />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <ProfilePage />
            </Suspense>
          }
        />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/orders/success/:id" element={<OrderSuccessPage />} />
      </Route>
      {/* Admin routes */}
      <Route path="" element={<AdminRoutes />}>
        <Route path="/admin/orderslist" element={<OrderListPage />} />
        <Route
          path="/admin/userslist"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <UsersListPage />
            </Suspense>
          }
        />
        <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
        <Route
          path="/admin/productslist"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <ProductsListPage />
            </Suspense>
          }
        />
        <Route
          path="/admin/productslist/:pageNumber"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <ProductsListPage />
            </Suspense>
          }
        />
        <Route path="/admin/products/" element={<ProductCreate />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <GoogleOAuthProvider clientId="358515502724-jro672t495odjb9dce8iio5nps5m9219.apps.googleusercontent.com">
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
