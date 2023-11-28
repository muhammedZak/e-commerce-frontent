import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearCartItems, resetCart } from '../store/slices/cartSlice';
import CheckoutSteps from '../components/Order/CheckOutSteps';
import { useCreateOrderMutation } from '../store/apis/ordersApi';
import StripeButton from '../components/Order/StripeButton';
import CartSummary from '../components/Cart/CartSummary';

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
      if (res.paymentMethod === 'payPal') {
        navigate(`/orders/${res._id}`);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="px-4 mb-6">
        <div className="p-2 my-2 border">
          <h1 className="text-lg lg:text-2xl font-medium tracking-wide">
            Order summary
          </h1>
        </div>
        <div className="md:flex justify-between gap-3">
          <div className="md:w-2/3">
            <div className="p-2 my-1 bg-gray-100">
              <h5 className="font-medium">Cart items</h5>
            </div>
            <div className=" border">
              <div className="p-2 my-1 flex justify-between">
                {cart.cartItems?.map((item) => (
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
                  {cart.shippingAddress.contact.name}
                </h5>
                <p className=" text-xl tracking-wider font-semibold  text-ellipsis overflow-hidden text-neutral-600">
                  {cart.shippingAddress.contact.mobile}
                </p>
                <p className=" text-lg tracking-wider font-serif text-ellipsis overflow-hidden text-neutral-600">
                  {cart.shippingAddress.addressDetails.address}
                </p>
                <p className=" text-lg tracking-wider font-serif text-ellipsis overflow-hidden text-neutral-600">
                  {cart.shippingAddress.addressDetails.town},
                  {cart.shippingAddress.addressDetails.district}
                </p>
                <p className=" text-lg tracking-wider font-serif text-ellipsis overflow-hidden text-neutral-600">
                  {cart.shippingAddress.addressDetails.state},
                  {cart.shippingAddress.addressDetails.country}
                </p>
              </div>
            </div>
            <div className="p-2 my-1 bg-gray-100">
              <h5 className="font-medium">Payment method</h5>
            </div>
            <div className=" border">
              <div className="p-2 my-1">
                <p className=" text-xl tracking-wider font-semibold font-serif text-ellipsis overflow-hidden text-neutral-600">
                  {cart.paymentMethod}
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 my-1">
            <CartSummary btnValue="PLACE ORDER" btnClick={onPlaceOrderClick} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
