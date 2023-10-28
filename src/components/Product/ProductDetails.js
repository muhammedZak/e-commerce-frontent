import React from 'react';

const ProductDetails = ({ product }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-7">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-gray-600 text-lg">Price: $ {product.price}</p>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 lg:pr-10 mb-7">
          <p className="text-gray-700 mb-5">{product.description}</p>
          <div className="flex items-center mt-5 lg:mt-10">
            <span className="text-2xl mr-3">Quantity:</span>
            <div className="flex items-center">
              <button className="border rounded-full p-2 text-2xl">-</button>
              <input
                type="text"
                value="1"
                className="text-center border text-2xl w-12"
              />
              <button className="border rounded-full p-2 text-2xl">+</button>
            </div>
          </div>
          <button className="mt-7 lg:mt-10 bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-full block text-center">
            ADD TO CART
          </button>
        </div>
        <div className="lg:w-1/3 mt-7 lg:mt-0">
          <div>
            <p className="text-xl font-semibold mb-3">Product Details</p>
            {product.productDetails.map((detail, index) => (
              <div key={index} className="flex text-sm">
                <div className="w-1/2">{detail.title}:</div>
                <div className="w-1/2">{detail.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
