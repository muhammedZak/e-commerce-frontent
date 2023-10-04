import React from 'react';
import { Link } from 'react-router-dom';

const ProdductCard = ({ product }) => {
  return (
    <div className="mx-5">
      <div className="py-2 my-4">
        <a href="#">
          <img className="w-full md:w-auto" src={product?.images} />
        </a>
      </div>
      <div className="my-2">
        <Link to={`/products/${product._id}`}>
          <p className="font-bold">{product.name}</p>
        </Link>
      </div>
      <div className="mb-2">rating</div>
      <div>
        <p className="font-medium">₹ {product.price}</p>
      </div>
    </div>
  );
};

export default ProdductCard;
