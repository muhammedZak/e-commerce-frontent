import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  BsSearch,
  BsPerson,
  BsSuitHeart,
  BsFillCartFill,
  BsList,
  BsX,
} from 'react-icons/bs';
import DropdownUser from './DropdownUser';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const usrIcon = userInfo ? (
    <DropdownUser userName={userInfo.name} />
  ) : (
    <Link to="/login">
      <div className="flex items-center">
        <BsPerson className="stroke-1" /> Login
      </div>
    </Link>
  );

  const [showMobileNav, setShowMobileNav] = useState(false);

  const openMobileNav = () => setShowMobileNav(true);
  const closeMobileNav = () => setShowMobileNav(false);

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl uppercase font-bold text-black">
            Shoppers
          </Link>
          <div className="ml-4 md:hidden">
            <button
              className="text-gray-600 hover:text-black"
              onClick={openMobileNav}
            >
              <BsSearch />
            </button>
          </div>
          <div className="ml-4 hidden md:block">
            <form className="flex items-center">
              <span className="text-gray-600">
                <BsSearch />
              </span>
              <input
                className="border-2 border-gray-300 px-3 py-2 rounded-lg focus:outline-none"
                type="text"
                placeholder="Search"
              />
            </form>
          </div>
        </div>

        <nav className="flex items-center">
          <ul
            className={`flex space-x-6 md:flex ${
              showMobileNav ? 'flex-col' : 'hidden'
            }`}
          >
            <li>
              <Link
                to="/men"
                className="text-gray-600 hover:text-black"
                onClick={closeMobileNav}
              >
                MEN
              </Link>
            </li>
            <li>
              <Link
                to="/women"
                className="text-gray-600 hover:text-black"
                onClick={closeMobileNav}
              >
                WOMEN
              </Link>
            </li>
            <li>
              <Link
                to="/watches"
                className="text-gray-600 hover:text-black"
                onClick={closeMobileNav}
              >
                WATCHES
              </Link>
            </li>
          </ul>
          <ul className="flex items-center space-x-6 ml-6">
            <li>{usrIcon}</li>
            <li>
              <Link to="/wishlist" className="text-gray-600 hover:text-black">
                <BsSuitHeart className="stroke-1" />
              </Link>
            </li>
            <li className="relative">
              <Link to="/cart" className="text-gray-600 hover:text-black">
                <BsFillCartFill className="stroke-1" />
              </Link>
              {cartItems.length > 0 && (
                <span className="absolute -top-3 left-5 bg-red-500 text-white text-xs px-2 rounded-full">
                  {totalItems}
                </span>
              )}
            </li>
          </ul>
          <button
            className={`text-gray-600 hover:text-black md:hidden ml-3 ${
              showMobileNav ? 'hidden' : 'block'
            }`}
            onClick={openMobileNav}
          >
            <BsList className="stroke-1" />
          </button>
        </nav>
      </div>

      {/* Off-canvas mobile navigation */}
      {showMobileNav && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="p-4">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={closeMobileNav}
            >
              <BsX />
            </button>
            <form className="flex items-center mb-4">
              <span className="text-gray-600">
                <BsSearch />
              </span>
              <input
                className="border-2 border-gray-300 px-3 py-2 rounded-lg focus:outline-none"
                type="text"
                placeholder="Search"
              />
            </form>
            <ul className="space-y-4">
              <li>
                <Link to="/men" className="text-gray-600 hover:text-black">
                  MEN
                </Link>
              </li>
              <li>
                <Link to="/women" className="text-gray-600 hover:text-black">
                  WOMEN
                </Link>
              </li>
              <li>
                <Link to="/watches" className="text-gray-600 hover:text-black">
                  WATCHES
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
