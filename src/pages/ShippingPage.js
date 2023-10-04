import { useState } from 'react';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../store/slices/cartSlice';
import CheckoutSteps from '../components/CheckOutSteps';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [zip, setZip] = useState(shippingAddress.zip || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveShippingHandler = () => {
    dispatch(saveShippingAddress({ address, city, zip, country }));
    navigate('/payment');
  };

  return (
    <>
      <CheckoutSteps step1 step2 />

      <div className="container mx-auto p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>

          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-semibold mb-2"
              htmlFor="address"
            >
              Shipping Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="border rounded-md py-2 px-3 w-full"
              type="text"
              id="address"
              placeholder="123 Main St"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-semibold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="border rounded-md py-2 px-3 w-full"
              type="text"
              id="city"
              placeholder="New York"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-semibold mb-2"
              htmlFor="zip"
            >
              ZIP Code
            </label>
            <input
              value={zip}
              className="border rounded-md py-2 px-3 w-full"
              type="text"
              id="zip"
              placeholder="10001"
              onChange={(e) => setZip(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-semibold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <input
              value={country}
              className="border rounded-md py-2 px-3 w-full"
              type="text"
              id="country"
              placeholder="United States"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button
            onClick={saveShippingHandler}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            type="submit"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default ShippingPage;
