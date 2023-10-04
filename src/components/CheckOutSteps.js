import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center mb-4">
      <div className="flex space-x-4">
        <div className="flex items-center">
          {step1 ? (
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          ) : (
            <span className="text-gray-500 cursor-not-allowed">Sign In</span>
          )}
        </div>

        <div className="flex items-center">
          {step2 ? (
            <Link to="/shipping" className="text-blue-500">
              Shipping
            </Link>
          ) : (
            <span className="text-gray-500 cursor-not-allowed">Shipping</span>
          )}
        </div>

        <div className="flex items-center">
          {step3 ? (
            <Link to="/payment" className="text-blue-500">
              Payment
            </Link>
          ) : (
            <span className="text-gray-500 cursor-not-allowed">Payment</span>
          )}
        </div>

        <div className="flex items-center">
          {step4 ? (
            <Link to="/placeorder" className="text-blue-500">
              Place Order
            </Link>
          ) : (
            <span className="text-gray-500 cursor-not-allowed">
              Place Order
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CheckoutSteps;
