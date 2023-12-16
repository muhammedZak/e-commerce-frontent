import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaSortDown } from 'react-icons/fa6';
import { FaUser, FaShoppingBag } from 'react-icons/fa';

const AdminDropdown = () => {
  const [show, setShow] = useState(false);
  const handleNameClick = () => setShow(!show);
  return (
    <div className="relative">
      <button onClick={handleNameClick} className="flex items-center">
        <p className="inline text-white text-lg hover:text-gray-400 capitalize font-semibold rounded ">
          Admin
        </p>
        <FaSortDown className=" text-white  hover:text-gray-400 mb-1 " />
      </button>
      {show && (
        <div
          onClick={() => setShow(false)}
          className="z-10 w-48 mt-2 py-2 absolute right-0 bg-white rounded-lg shadow-xl"
        >
          <Link
            className="block px-4 py-2 hover:bg-indigo-500 hover:text-white"
            to="/admin/userslist"
          >
            <FaUser className="inline-block mr-2" />
            Users
          </Link>
          <Link
            className="block px-4 py-2 hover:bg-indigo-500 hover:text-white"
            to="/admin/orderslist"
          >
            <FaShoppingBag className="inline-block mr-2" />
            Orders
          </Link>
          <Link
            className="block px-4 py-2 hover:bg-indigo-500 hover:text-white"
            to="/admin/productslist"
          >
            <FaShoppingBag className="inline-block mr-2" />
            Products
          </Link>
        </div>
      )}
      {/* {show && (
        <button
          onClick={() => setShow(false)}
          className="absolute z-0 top-0 left-0 right-0 bottom-0"
        ></button>
      )} */}
    </div>
  );
};

export default AdminDropdown;
