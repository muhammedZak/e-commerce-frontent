import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/Order/CheckOutSteps';
import { savePaymentMethod } from '../store/slices/cartSlice';

const PaymentMethod = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress._id) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [payment, setPayment] = useState('');

  const dispatch = useDispatch();

  const onConformClick = () => {
    dispatch(savePaymentMethod(payment));
    navigate('/placeorder');
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Select a Payment Method
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  className="mr-2"
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label htmlFor="creditCard" className="text-gray-700">
                  Credit Card
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="payPal"
                  className="mr-2"
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label htmlFor="paypal" className="text-gray-700">
                  PayPal
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="stripe"
                  name="paymentMethod"
                  value="Stripe"
                  className="mr-2"
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label htmlFor="stripe" className="text-gray-700">
                  Stripe
                </label>
              </div>
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            type="submit"
            disabled={!payment}
            onClick={onConformClick}
          >
            Confirm Payment Method
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
