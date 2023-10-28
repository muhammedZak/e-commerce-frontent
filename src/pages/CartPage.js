import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/Cart/CartItem';
import CartHeader from '../components/Cart/CartHeader';
import CartSummary from '../components/Cart/CartSummary';
import Coupon from '../components/Cart/Coupon';

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const renderedCartItems = cartItems.map((item) => {
    return <CartItem key={item._id} item={item} />;
  });

  const totalItems = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);

  return (
    <>
      <section className="py-12 px-4">
        <CartHeader count={totalItems} />
        <div className="lg:flex lg:justify-between gap-2">
          {cartItems.length > 0 ? (
            <div>{renderedCartItems}</div>
          ) : (
            <div className="w-2/3 flex justify-center items-center">
              <p className="text-xl text-red-700 font-medium">
                You cart is empty
              </p>
            </div>
          )}
          <div className="lg:mt-6 lg:flex-1">
            <CartSummary
              btnValue="PROCEED TO CHECKOUT"
              btnClick={checkoutHandler}
            />
            <Coupon />
          </div>
        </div>
        {/* <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            {/* <button
              onClick={() => navigate(-1)}
              className="text-blue-500 hover:underline text-lg"
            >
              &larr; Continue Shopping
            </button> */}
        {/* </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white p-8 rounded shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Your Shopping Cart
              </h2>
            </div>
            <div>
              <div className="bg-white rounded shadow-lg p-5">
                <h2 className="text-2xl font-semibold mb-4">Discount Codes</h2>
                <form className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Enter your coupon code"
                    className="border p-2 rounded-md mb-2"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  >
                    APPLY
                  </button>
                </form>
              </div>
              <div className="mt-8">
                <div className="bg-white p-8 rounded shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
                  <ul className="space-y-4">
                    <li className="flex justify-between">
                      <span>Total items</span>
                      <span>{cartItems.length > 0 ? totalItems : 0}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total</span>
                      <span>₹ {cartItems.length > 0 ? totalPrice : 0}</span>
                    </li>
                  </ul> */}
        {/* <button
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    className="bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 w-full"
                  >
                    PROCEED TO CHECKOUT
                  </button> */}
        {/* </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default CartPage;
