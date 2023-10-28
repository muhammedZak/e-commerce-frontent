import { Link } from 'react-router-dom';

const CartHeader = ({ count }) => {
  return (
    <div className="p-2 border-2">
      <div className="p-2 bg-gray-100">
        <div className="flex items-center justify-between">
          <div className="font-serif">My Bag {count}</div>
          <div className="bg-blue-200 p-2">
            <Link to="/watches">&larr; Continue shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
