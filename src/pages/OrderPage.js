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
      <div className="px-4 mb-6">
        <div className="p-2 my-2 border">
          <h1 className="text-lg lg:text-2xl font-medium tracking-wide">
            Order details
          </h1>
        </div>
        <div className="md:flex justify-between gap-3">
          <div className="md:w-2/3">
            <div className="p-2 my-1 bg-gray-100">
              <h5 className="font-medium">Cart items</h5>
            </div>
            <div className=" border">
              <div className="p-2 my-1 flex justify-between">
                {order.orderItems?.map((item) => (
                  <>
                    <img
                      className="w-40 lg:w-36 h-48 lg:h-44 object-contain"
                      src={item.images[0].path}
                      alt="Image"
                    />
                    <div>
                      <p className=" text-xl tracking-wider font-semibold font-serif text-ellipsis overflow-hidden text-neutral-600">
                        {item.name}
                      </p>
                      <p className=" text-lg tracking-wider font-serif text-ellipsis overflow-hidden text-neutral-600">
                        {item.description}
                      </p>
                      <p className="text-lg font-serif font-semibold leading-10 tracking-wider">
                        Quantity: {item.qty}
                      </p>
                      <p className="text-lg font-serif font-semibold leading-10 tracking-wider">
                        Price: ₹{item.price}
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>

            <div className="p-2 my-1 bg-gray-100">
              <h5 className="font-medium">Shipping address</h5>
            </div>
            <div className=" border">
              <div className="p-2 my-1">
                <h5 className=" text-xl tracking-wider font-semibold font-serif text-ellipsis overflow-hidden text-neutral-600">
                  {order.shippingAddress.contact.name}
                </h5>
                <p className=" text-xl tracking-wider font-semibold  text-ellipsis overflow-hidden text-neutral-600">
                  {order.shippingAddress.contact.mobile}
                </p>
                <p className=" text-lg tracking-wider font-serif text-ellipsis overflow-hidden text-neutral-600">
                  {order.shippingAddress.addressDetails.address}
                </p>
                <p className=" text-lg tracking-wider font-serif text-ellipsis overflow-hidden text-neutral-600">
                  {order.shippingAddress.addressDetails.town},
                  {order.shippingAddress.addressDetails.district}
                </p>
                <p className=" text-lg tracking-wider font-serif text-ellipsis overflow-hidden text-neutral-600">
                  {order.shippingAddress.addressDetails.state},
                  {order.shippingAddress.addressDetails.country}
                </p>
              </div>
            </div>
            <div className="p-2 my-1 bg-gray-100">
              <h5 className="font-medium">Payment method</h5>
            </div>
            <div className=" border">
              <div className="p-2 my-1">
                <p className=" text-xl tracking-wider font-semibold font-serif text-ellipsis overflow-hidden text-neutral-600">
                  {order.paymentMethod}
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 my-1">
            <div className="p-3 border">
              <h2 className="text-2xl lg:text-xl font-semibold tracking-wider">
                Order Summary
              </h2>
              <div className=" mt-3 flex justify-between">
                <h4 className="text-xl lg:text-lg font-medium text-orange-950">
                  Bag Total
                </h4>
                <h4 className="font-serif text-xl lg:text-lg font-medium text-orange-950">
                  ₹{order.itemsPrice}
                </h4>
              </div>
              <hr className="mt-3" />
              <div className="mt-3 flex justify-between">
                <h4 className="text-xl lg:text-lg font-medium text-orange-950">
                  Tax
                </h4>
                <h4 className="font-serif text-xl lg:text-lg font-medium text-orange-950">
                  ₹{order.taxPrice}
                </h4>
              </div>
              <hr className="mt-3" />
              <div className="mt-3 flex justify-between">
                <h4 className="text-xl lg:text-lg font-medium text-orange-950">
                  Delivery
                </h4>
                <h4 className="font-serif text-xl lg:text-lg font-medium text-orange-950">
                  ₹{order.shippingPrice}
                </h4>
              </div>
              <hr className="mt-3" />
              <div className="mt-3 flex justify-between">
                <h4 className="text-xl lg:text-lg font-bold text-orange-950">
                  Total Amount
                </h4>
                <h4 className="font-serif text-xl  lg:text-lg font-bold text-orange-950">
                  ₹{order.totalPrice}
                </h4>
              </div>
              <div>
                {isPending ? (
                  <Skeleton times={1} className="h-10 w-full" />
                ) : !order.isPaid && order.paymentMethod === 'payPal' ? (
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
        </div>
      </div>
    </>
  );
};

export default OrderPage;
