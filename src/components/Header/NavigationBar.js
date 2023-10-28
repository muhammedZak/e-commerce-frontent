import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaBars, FaShoppingCart, FaUser } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import AdminDropdown from './AdminDropdown';
import SearchBox from './SearchBox';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="bg-gray-100  sticky top-0 h-20  w-full md:flex md:justify-between md:items-center md:py-5 md:px-4 shadow-sm shadow-black z-40">
      <div className="flex items-center justify-between py-5 px-4 md:p-0">
        <div>
          <Link
            to="/"
            className="text-black hover:text-white text-2xl font-bold"
          >
            SHOPPERS
          </Link>
        </div>
        <div className="md:block hidden ml-10">
          <SearchBox />
        </div>

        {userInfo && userInfo.role === 'admin' && (
          <div className="md:hidden block">
            <AdminDropdown />
          </div>
        )}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="block"
          >
            {isOpen ? (
              <IoCloseSharp className="text-gray-500 h-6 w-6 fill-current hover:text-white focus:text-white focus:outline-none" />
            ) : (
              <FaBars className="text-gray-500 h-6 w-6 fill-current hover:text-white focus:text-white focus:outline-none" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`px-2 pb-5 lg:p-0 lg:flex lg:items-center lg:mt-11 lg:justify-center ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="px-2 block md:hidden">
          <SearchBox />
        </div>
        <Link
          className="block px-2 py-2 text-black hover:text-white  font-semibold rounded hover:bg-gray-800"
          to="/watches/Men"
        >
          MEN
        </Link>
        <Link
          className="block px-2 py-2 text-black hover:text-white font-semibold rounded hover:bg-gray-800 md:ml-2"
          to="/watches/Women"
        >
          WOMEN
        </Link>
        <Link
          className="block px-2 py-2 text-black hover:text-white font-semibold rounded hover:bg-gray-800 md:ml-2 md:mr-4"
          to="/watches"
        >
          WATCHES
        </Link>
        <Link
          className="block relative px-2 py-2 text-black hover:text-white font-semibold rounded hover:bg-gray-800 md:ml-2 md:mr-1"
          to="/cart"
        >
          <FaShoppingCart className="inline mb-1 mr-1" />
          CART
          {cartItems.length > 0 && (
            <span className="absolute top-1 left-16 bg-red-500 text-gray-200 hover:text-white text-xs px-2 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
        {userInfo && userInfo.role === 'admin' && (
          <div className="hidden md:block mr-7">
            <AdminDropdown />
          </div>
        )}
        {userInfo ? (
          <div className="hidden md:block">
            <Dropdown userInfo={userInfo.name} />
          </div>
        ) : (
          <Link
            to="/login"
            className="block mb-2 md:m-0 px-2 py-2 text-black hover:text-white font-semibold rounded hover:bg-gray-800 md:ml-2 md:mr-4"
          >
            <FaUser className="inline mb-1 mr-1" />
            LOGIN
          </Link>
        )}

        <div className="block md:hidden border-t-2 border-gray-500">
          <Link
            className="mt-2 text-white block font-semibold uppercase px-2 py-2 hover:bg-gray-800 rounded"
            to="/profile"
          >
            Your profile
          </Link>
          <Link
            className="text-white block font-semibold uppercase px-2 py-2 hover:bg-gray-800 rounded"
            to="/orders"
          >
            Your orders
          </Link>
          <Link
            className="text-white block font-semibold uppercase px-2 py-2 hover:bg-gray-800 rounded"
            to="/logout"
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
