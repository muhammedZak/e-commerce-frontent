import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  FaBars,
  FaShoppingBag,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import AdminDropdown from './AdminDropdown';
import SearchBox from './SearchBox';
import Offcanva from './Offcanvas';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleClose = () => setIsOpen(false);

  return (
    <header className="bg-gray-600">
      <div className="flex justify-between items-center p-4">
        <div className="text-2xl text-slate-300 font-semibold">
          <Link to="/">SHOPPERS</Link>
        </div>
        <div className="hidden md:block">
          <ul className="flex items-center gap-5 text-white text-lg ">
            <li>
              <Link to="/watches/Men" className="hover:text-gray-400">
                Men
              </Link>
            </li>
            <li>
              <Link to="/watches/Women" className="hover:text-gray-400">
                Women
              </Link>
            </li>
            <li>
              <Link to="/watches" className="hover:text-gray-400">
                Watches
              </Link>
            </li>
            <div>
              <SearchBox />
            </div>
          </ul>
        </div>
        <div>
          <div className="hidden md:flex gap-5 justify-center items-center">
            {userInfo?.role === 'admin' && (
              <div>
                <AdminDropdown />
              </div>
            )}
            <Link to="/cart" className="text-white text-lg hover:text-gray-400">
              <FaShoppingCart className="inline mb-1 mr-1 hover:text-gray-400" />
              Cart
              {totalItems > 0 && (
                <span className="absolute top-1 left-16 bg-red-500 text-gray-200 hover:text-white text-xs px-2 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            {userInfo ? (
              <div className="text-white text-lg hover:text-gray-400">
                <Dropdown userInfo={userInfo.name} />
              </div>
            ) : (
              <div className="text-white text-lg ">
                <Link className="hover:text-gray-400" to="/login">
                  Login
                </Link>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="block md:hidden"
          >
            {isOpen ? (
              <IoCloseSharp className="text-slate-300 w-10 font-semibold h-6  fill-current hover:text-white focus:text-white focus:outline-none" />
            ) : (
              <FaBars className="text-slate-300 w-10 font-semibold h-6  fill-current hover:text-white focus:text-white focus:outline-none" />
            )}
          </button>
        </div>
      </div>
      <Offcanva
        show={isOpen}
        handleClose={handleClose}
        totalItems={totalItems}
        userInfo={userInfo}
      />
    </header>
  );
};

export default NavigationBar;
