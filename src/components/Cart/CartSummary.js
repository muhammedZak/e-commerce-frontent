import React from 'react';
import { useSelector } from 'react-redux';
import StripeButton from '../Order/StripeButton';

const CartSummary = ({ btnValue, btnClick }) => {
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
  } = useSelector((state) => state.cart);

  const cart = useSelector((state) => state.cart);

  return (
    <div className="p-3 border">
      <h2 className="text-2xl lg:text-xl font-semibold tracking-wider">
        Order Summary
      </h2>
      <div className=" mt-3 flex justify-between">
        <h4 className="text-xl lg:text-lg font-medium text-orange-950">
          Bag Total
        </h4>
        <h4 className="font-serif text-xl lg:text-lg font-medium text-orange-950">
          ₹{cartItems.length ? itemsPrice : '0.00'}
        </h4>
      </div>
      <hr className="mt-3" />
      <div className="mt-3 flex justify-between">
        <h4 className="text-xl lg:text-lg font-medium text-orange-950">Tax</h4>
        <h4 className="font-serif text-xl lg:text-lg font-medium text-orange-950">
          ₹{cartItems.length ? taxPrice : '0.00'}
        </h4>
      </div>
      <hr className="mt-3" />
      <div className="mt-3 flex justify-between">
        <h4 className="text-xl lg:text-lg font-medium text-orange-950">
          Delivery
        </h4>
        <h4 className="font-serif text-xl lg:text-lg font-medium text-orange-950">
          ₹{cartItems.length ? shippingPrice : '0.00'}
        </h4>
      </div>
      <hr className="mt-3" />
      <div className="mt-3 flex justify-between">
        <h4 className="text-xl lg:text-lg font-bold text-orange-950">
          Total Amount
        </h4>
        <h4 className="font-serif text-xl  lg:text-lg font-bold text-orange-950">
          ₹{cartItems.length ? totalPrice : '0.00'}
        </h4>
      </div>
      {paymentMethod === 'Stripe' ? (
        <StripeButton cart={cart} />
      ) : (
        <button
          disabled={cartItems.length === 0}
          className="mt-3 p-2 w-full text-lg lg:text-sm uppercase text-white bg-gray-900 tracking-wider"
          onClick={btnClick}
        >
          {btnValue ? btnValue : 'PROCEED TO CHECKOUT'}
        </button>
      )}
    </div>
  );
};

export default CartSummary;
