import React from 'react';

const ProductImage = ({ images }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-64">
        {images.map((image, index) => (
          <a key={index} href="#">
            <img
              className="w-full max-h-40 mb-5"
              src={image}
              alt={`Product Image ${index + 1}`}
            />
          </a>
        ))}
      </div>
      <div className="mx-3">
        <img className="max-h-96 w-auto" src={images[0]} alt="Main Product" />
      </div>
    </div>
  );
};

export default ProductImage;
