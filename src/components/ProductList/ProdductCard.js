import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Product/Rating';

const ProdductCard = ({ product }) => {
  return (
    <div className="hover:shadow-2xl border-2">
      <div>
        <p>
          <img
            className="w-full"
            src={product.images[0].path}
            alt={product.name}
          />
        </p>
      </div>
      <div className="px-3 py-1 h-36 font-serif">
        <div className="">
          <Link to={`/products/${product._id}`}>
            <p className="font-bold text-ellipsis overflow-hidden">
              {product.name}
            </p>
          </Link>
        </div>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <div className="">
          <p className="font-medium">₹ {product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProdductCard;
