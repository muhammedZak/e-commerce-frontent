import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import {
  useGetOrderByIdQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from '../store/apis/ordersApi';
import Skeleton from '../components/Skeleton';

const OrderPage = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetOrderByIdQuery(orderId);

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
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
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        console.log(details);
        refetch();
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
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

  return isLoading ? (
    <Skeleton times={10} className="h-20 w-full" />
  ) : isError ? (
    <p>error fething data..{error.toString()}</p>
  ) : (
    <>
      <div className=" bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300  min-h-screen">
        <div className="container mx-auto flex  py-12">
          <div className="bg-white w-full  rounded-lg shadow-lg p-8 text-gray-800">
            <h1 className="text-4xl font-semibold mb-8 text-center">
              Order Details
            </h1>

            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h2 className="text-3xl font-semibold mb-4">Order Summary</h2>

              {/* Product Card */}

              {order.orderItems &&
                order.orderItems?.map((item) => (
                  <div
                    key={item._id}
                    className="border-b border-gray-300 pb-2 mb-2 grid grid-cols-2 items-center gap-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item?.images[0].path}
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
              <p className="text-gray-600">
                Name: {order.shippingAddress?.contact.name}
              </p>
              <p className="text-gray-600">
                Address: {order.shippingAddress?.addressDetails.address},{' '}
                {order.shippingAddress?.addressDetails.town},{' '}
                {order.shippingAddress?.addressDetails.pin},{' '}
                {order.shippingAddress?.addressDetails.country}
              </p>
              <p className="text-gray-600">
                Paid: {order?.isPaid ? 'Paid' : 'Not paid'}
              </p>
              <p className="text-gray-600">Name: {order.user?.name}</p>
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
            ) : !order.isPaid ? (
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              ></PayPalButtons>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
