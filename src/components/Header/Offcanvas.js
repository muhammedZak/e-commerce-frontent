import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { logout } from '../../store/slices/authSlice';
import { logoutUser } from '../../store/slices/usersSlice';
import SearchBox from './SearchBox';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  FaBars,
  FaShoppingBag,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import AdminDropdown from './AdminDropdown';

const Offcanva = ({ show, handleClose, totalItems, userInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    try {
      const res = await dispatch(logoutUser()).unwrap();
      dispatch(logout(res));
      navigate('/login');
      toast.success('Successfully loggedout !', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error(err?.message || err.error);
    }
  };

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header className="bg-gray-100 m-2 ms-auto" closeButton>
        {/* <Offcanvas.Title>Filters</Offcanvas.Title> */}
      </Offcanvas.Header>
      <Offcanvas.Body className="text-black">
        <Link
          to="/watches/Men"
          className="block text-2xl m-1 font-semibold hover:bg-gray-700  hover:text-white p-2"
        >
          Men
        </Link>
        <Link
          to="/watches/Women"
          className="block text-2xl m-2 font-semibold hover:bg-gray-700  hover:text-white p-2"
        >
          Women
        </Link>
        <Link
          to="/watches"
          className="block text-2xl m-2 font-semibold hover:bg-gray-700  hover:text-white p-2"
        >
          Watches
        </Link>

        <Link
          to="/cart"
          className="block text-2xl m-2 font-semibold hover:bg-gray-700  hover:text-white p-2"
        >
          <FaShoppingCart className="inline mb-1 mr-1" />
          Cart
          {totalItems > 0 && (
            <span className="absolute top-1 left-16 bg-red-500 text-gray-200 hover:text-white text-xs px-2 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {userInfo ? (
          <>
            <div className="block text-2xl m-2 font-semibold hover:bg-gray-700  hover:text-white p-2">
              {userInfo.name}
            </div>
            <Link
              to="/profile"
              className="block text-2xl m-2 font-semibold hover:bg-gray-700  hover:text-white p-2"
            >
              <FaUser className="inline-block mr-2" />
              Your profile
            </Link>
            <Link
              to="/orders"
              className="block text-2xl m-2 font-semibold hover:bg-gray-700  hover:text-white p-2"
            >
              <FaShoppingBag className="inline-block mr-2" />
              Your orders
            </Link>
            <div
              style={{ cursor: 'pointer' }}
              onClick={onLogoutClick}
              className="block text-2xl m-2 font-semibold hover:bg-gray-700  hover:text-white p-2"
            >
              <FaSignOutAlt className="inline-block mr-2" />
              Logout
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="block text-2xl m-2 font-semibold hover:bg-gray-700  hover:text-white p-2"
          >
            <FaUser className="inline mb-1 mr-1" />
            Login
          </Link>
        )}

        <div className="m-2 p-2">
          <SearchBox isSidbar="true" />
        </div>

        {userInfo?.role === 'admin' && (
          <div className="md:hidden block">
            <AdminDropdown />
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Offcanva;
