import React from 'react';

const Coupon = () => {
  return (
    <div className="mt-3 p-3 border">
      <h2 className="text-2xl font-semibold tracking-wider">Apply Coupon</h2>
      <form className="mt-3 border flex justify-between">
        <div className="">
          <input
            className="p-2 w-auto focus:outline-none"
            placeholder="Enter coupon code"
          />
        </div>
        <div>
          <button
            type="submit"
            className="p-2 text-lg lg:text-sm tracking-wider w-full h-full text-white bg-gray-900"
          >
            APPLY
          </button>
        </div>
      </form>
    </div>
  );
};

export default Coupon;
