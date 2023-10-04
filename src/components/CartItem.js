import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeCart } from '../store/slices/cartSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const [qty, setQty] = useState(item.qty);

  const dispatch = useDispatch();

  const onIncrementClick = () => {
    const newQty = qty + 1;
    setQty(newQty);
    dispatch(addToCart({ ...item, qty: newQty }));
  };

  const onDecrementClick = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      dispatch(addToCart({ ...item, qty: newQty }));
    }
  };

  const handleremoveFromCartClick = (id) => {
    dispatch(removeCart(id));
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg mb-4">
      <div className="flex items-center border-b mb-3">
        <div className="w-1/4 pr-4">
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full rounded-lg"
          />
        </div>
        <div className="w-1/4">
          <Link to={`/products/${item._id}`}>
            <p className="text-lg font-semibold">{item.name}</p>
          </Link>
        </div>
        <div className="w-1/4 text-center">
          <p className="text-lg">₹ {item.price}</p>
        </div>
        <div className="flex items-center">
          <button disabled={qty === 1} onClick={onDecrementClick}>
            -
          </button>
          <p className="text-center w-16">{qty}</p>
          <button
            disabled={qty === item.countInStock}
            onClick={onIncrementClick}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end mt-3">
        <button
          onClick={() => {
            handleremoveFromCartClick(item._id);
          }}
          className="text-red-500 hover:text-red-600"
        >
          <AiOutlineClose className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
