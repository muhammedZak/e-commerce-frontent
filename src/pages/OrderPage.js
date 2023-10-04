import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import {
  getOrderDetails,
  getPayPalClientId,
  payOrder,
} from '../store/slices/ordersSlice';
import Skeleton from '../components/Skeleton';
import { useThunk } from '../hooks/use-thunks';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const [doFetchOrder, isLoadingOrder, loadingOrderError] =
    useThunk(getOrderDetails);

  const [doPayOrder, isLoadingPayOrder, loadingPayOrderError] =
    useThunk(payOrder);

  const [doGetPayPalClientId, isLoadingPayPalId, loadingPayPalIdError] =
    useThunk(getPayPalClientId);

  useEffect(() => {
    doFetchOrder(orderId);
    doGetPayPalClientId();
  }, [doFetchOrder, doGetPayPalClientId, orderId]);

  const { data } = useSelector((state) => state.orders);
  const { orderItems, user, shippingAddress, ...order } = data;

  const { userInfo } = useSelector((state) => state.auth);

  const paypal = useSelector((state) => state.orders.paypalId);
  console.log(paypal.clientId);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!loadingPayPalIdError && !isLoadingPayPalId && paypal.clientId) {
      const loadPaypalScript = async () => {
        console.log('hiii');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [loadingPayPalIdError, isLoadingPayPalId, order, paypal, paypalDispatch]);

  const dispatch = useDispatch();

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await doPayOrder({ orderId, details });
        dispatch(getOrderDetails(orderId));
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }
  // console.log(order.totalPrice);
  function createOrder(data, actions) {
    console.log('hello');
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  return isLoadingOrder ? (
    <Skeleton times={10} className="h-20 w-full" />
  ) : loadingOrderError ? (
    <p>error fething data..</p>
  ) : (
    <>
      <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300  min-h-screen">
        <div className="container mx-auto flex  py-12">
          <div className="bg-white w-full  rounded-lg shadow-lg p-8 text-gray-800">
            <h1 className="text-4xl font-semibold mb-8 text-center">
              Order Details
            </h1>
            Product Items
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h2 className="text-3xl font-semibold mb-4">Order Summary</h2>

              {/* Product Card */}

              {orderItems &&
                orderItems?.map((item) => (
                  <div
                    key={item._id}
                    className="border-b border-gray-300 pb-2 mb-2 grid grid-cols-2 items-center gap-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item?.images}
                        alt={item?.name}
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-xl font-semibold">{item?.name}</p>
                        <p className="text-gray-600">Quantity: {item?.qty}</p>
                      </div>
                    </div>
                    <p className="text-xl font-semibold">
                      ${(item?.qty * item?.price).toFixed(2)}
                    </p>
                  </div>
                ))}
            </div>
            {/* Shipping Details */}
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h2 className="text-3xl font-semibold mb-4">Shipping Details</h2>
              <p className="text-gray-600">Name: {user?.name}</p>
              <p className="text-gray-600">
                Address: {shippingAddress?.address}, {shippingAddress?.city},{' '}
                {shippingAddress?.zip}, {shippingAddress?.country}
              </p>
              <p className="text-gray-600">
                Paid: {order?.isPaid ? 'Paid' : 'Not paid'}
              </p>
              <p className="text-gray-600">Name: {user?.name}</p>
            </div>
            {/* Order Total */}
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h2 className="text-3xl font-semibold mb-4">Order Total</h2>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Subtotal:</p>
                <p className="text-xl font-semibold">{order?.itemsPrice}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Shipping:</p>
                <p className="text-xl font-semibold">{order?.shippingPrice}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Tax:</p>
                <p className="text-xl font-semibold">{order?.taxPrice}</p>
              </div>
              <div className="flex justify-between items-center border-t border-gray-300 pt-4">
                <p className="text-2xl font-semibold">Total:</p>
                <p className="text-4xl font-semibold text-indigo-600">
                  {order?.totalPrice}
                </p>
              </div>
            </div>
            {isPending ? (
              <Skeleton times={1} className="h-10 w-full" />
            ) : (
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              ></PayPalButtons>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
