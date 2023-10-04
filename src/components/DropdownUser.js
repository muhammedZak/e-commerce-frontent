import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../store/slices/authSlice';
import { logoutUser } from '../store/slices/usersSlice';
import { toast } from 'react-toastify';

const DropdownUser = ({ userName }) => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('idle');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    try {
      setStatus('pending');
      const res = await dispatch(logoutUser()).unwrap();
      dispatch(logout(res));
      navigate('/login');
      toast.success('Successfully loggedout !', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error(err?.message || err.error);
    } finally {
      setStatus('idle');
    }
  };

  const handleNameClick = () => setShow(!show);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleNameClick}
        className="focus:outline-none hover:text-gray-600"
      >
        <FaUser className="inline-block mr-2" /> {userName}
      </button>
      {show && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-2">
            <Link
              to="/profile"
              className="block px-4 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaUser className="inline-block mr-2" /> Profile
            </Link>
            <button
              onClick={onLogoutClick}
              disabled={status === 'pending'}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
            >
              <FaSignOutAlt className="inline-block mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
