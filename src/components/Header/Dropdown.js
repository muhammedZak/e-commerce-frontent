import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUser, FaSignOutAlt, FaShoppingBag } from 'react-icons/fa';
import { logout } from '../../store/slices/authSlice';
import { logoutUser } from '../../store/slices/usersSlice';
import { toast } from 'react-toastify';

const Dropdown = ({ userInfo }) => {
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
    <div className="relative">
      <button onClick={handleNameClick} className="flex items-center">
        <div className=" h-10 w-10 rounded-full overflow-hidden border-2 border-gray-600">
          <img
            className="h-full w-full object-cover bg-white"
            alt="avatar"
            src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
          />
        </div>

        <p className=" text-black px-2 py-2 hover:text-white ml-1 uppercase font-semibold rounded hover:bg-gray-800">
          {userInfo}
        </p>
      </button>
      {show && (
        <div
          onClick={() => setShow(false)}
          className="w-48 mt-2 py-2 absolute right-0 bg-white rounded-lg shadow-xl"
        >
          <Link
            className="block px-4 py-2 hover:bg-indigo-500 hover:text-white"
            to="/profile"
          >
            <FaUser className="inline-block mr-2" />
            Your profile
          </Link>
          <Link
            className="block px-4 py-2 hover:bg-indigo-500 hover:text-white"
            to="/orders"
          >
            <FaShoppingBag className="inline-block mr-2" />
            Your orders
          </Link>
          <div
            onClick={onLogoutClick}
            disabled={status === 'pending'}
            className="block px-4 py-2 hover:bg-indigo-500 hover:text-white"
          >
            <FaSignOutAlt className="inline-block mr-2" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
