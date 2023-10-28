import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeCart } from '../../store/slices/cartSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const [qty, setQty] = useState(item.qty);

  const dispatch = useDispatch();

  const onChangeHandler = (value) => {
    setQty(value);
    dispatch(addToCart({ ...item, qty: value }));
  };

  const qtyOptions = [...Array(item?.countInStock).keys()].map((x) => {
    return (
      <option key={x + 1} value={x + 1}>
        {x + 1}
      </option>
    );
  });

  const handleremoveFromCartClick = (id) => {
    dispatch(removeCart(id));
  };

  return (
    <div className="p-2 mt-4 mb-3 lg:flex lg:justify-between lg:gap-5 border">
      <div className="md:flex md:w-2/3 md:gap-4">
        <img
          className="w-40 lg:w-36 h-48 lg:h-44 object-contain"
          src={item.images[0].path}
          alt="Image"
        />
        <div className="md:flex-1">
          <Link to={`/products/${item._id}`}>
            <p className="text-xl tracking-wider font-serif text-ellipsis overflow-hidden text-neutral-600">
              {item.name}
            </p>
          </Link>
          <p className="text-lg font-serif font-semibold leading-10 tracking-wider">
            {item.discount && <span>{item.discountPrice}</span>}
            <span>₹{item.price.toFixed(2)}</span>
            {item.discount && <span>({item.discount.percentage} off)</span>}
          </p>
          <div className="">
            <select
              className="p-1 mt-3 border focus:outline-none"
              value={qty}
              onChange={(e) => onChangeHandler(e.target.value)}
            >
              {qtyOptions}
            </select>
          </div>
        </div>
      </div>
      <div className="mt-3 lg:mt-0 hidden md:block border"></div>
      <div className="mt-3 lg:w-1/3 lg:mt-0 flex flex-col md:items-end lg:justify-center lg:items-center">
        <button
          className="m-1 text-sm flex justify-center items-center gap-2"
          onClick={() => handleremoveFromCartClick(item._id)}
        >
          <AiOutlineClose /> REMOVE
        </button>
        <button className="m-1 text-sm flex justify-center items-center gap-2">
          MOVE TO WISHLIST
        </button>
      </div>
    </div>
  );
};

export default CartItem;
