import { useStripePayMutation } from '../../store/apis/ordersApi';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearCartItems } from '../../store/slices/cartSlice';

const StripeButton = ({ cart }) => {
  const [stripePay, { isLoading, error }] = useStripePayMutation();

  console.log('hello');

  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const res = await stripePay({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      window.location.href = res.url;

      dispatch(clearCartItems());
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-3 p-2 w-full text-lg lg:text-sm uppercase text-white bg-gray-900 tracking-wider"
      type="submit"
      disabled={cart.cartItems.length === 0}
    >
      Place Order
    </button>
  );
};

export default StripeButton;
