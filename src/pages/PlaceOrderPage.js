import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearCartItems } from '../store/slices/cartSlice';
import CheckoutSteps from '../components/Order/CheckOutSteps';
import { useCreateOrderMutation } from '../store/apis/ordersApi';

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress._id) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.shippingAddress, cart.paymentMethod, navigate]);

  const dispatch = useDispatch();

  const onPlaceOrderClick = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">
            Order Summary
          </h2>

          {/* Order Summary */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Items in Cart</h3>
            <ul className="divide-y divide-gray-300">
              {cart.cartItems.length === 0 ? (
                <p className="text-l">No items in cart</p>
              ) : (
                cart.cartItems.map((product, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-2"
                  >
                    <span className="text-lg">
                      {product.name} ({product.qty}x)
                    </span>
                    <span className="text-lg">
                      ${(product.price * product.qty).toFixed(2)}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Shipping Address */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
            <p className="text-lg">{cart.shippingAddress.address}</p>
            <p className="text-lg">
              {cart.shippingAddress.city}, {cart.shippingAddress.zip}
            </p>
            <p className="text-lg">{cart.shippingAddress.country}</p>
          </div>

          {/* Payment Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            <p className="text-lg">Payment Method: {cart.paymentMethod}</p>
          </div>

          {/* Shipping Price, Tax Price, Subtotal, and Total */}
          <div className="border-t border-b border-gray-300 py-4">
            <div className="flex justify-between items-center text-lg">
              <span>Subtotal:</span>
              <span>${cart.cartItems.length === 0 ? 0 : cart.itemsPrice}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span>Shipping Price:</span>
              <span>
                ${cart.cartItems.length === 0 ? 0 : cart.shippingPrice}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span>Tax Price:</span>
              <span>${cart.cartItems.length === 0 ? 0 : cart.taxPrice}</span>
            </div>
            <div className="flex justify-between items-center text-xl">
              <span className="font-semibold">Total:</span>
              <span className="text-blue-600 font-semibold">
                ${cart.cartItems.length === 0 ? 0 : cart.totalPrice}
              </span>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={onPlaceOrderClick}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-3 px-6 rounded-md mt-6"
            type="submit"
            disabled={isLoading === true || cart.cartItems.length === 0}
          >
            Place Your Order
          </button>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
