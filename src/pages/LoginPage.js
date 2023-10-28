import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/usersSlice';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const canSave =
    [email, password].every(Boolean) && addRequestStatus === 'idle';

  const onLoginClick = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        const res = await dispatch(loginUser({ email, password })).unwrap();
        dispatch(setCredentials(res));
        navigate(redirect);
        toast.success('Successfully logged in !', {
          position: toast.POSITION.TOP_CENTER,
        });
        setEmail('');
        setPassword('');
      } catch (err) {
        toast.error(err?.message || err.error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <div className="flex bg-gray-100 items-center justify-center">
      <div className="p-20">
        <div className="p-10 bg-white">
          <div className="">
            <form>
              <input
                name="userEmail"
                value={email}
                onChange={onEmailChange}
                type="email"
                className="p-3 border w-80 block"
                placeholder=" email"
              />
              <input
                name="userPassword"
                value={password}
                onChange={onPasswordChange}
                type="password"
                className="p-3 border w-80 my-5 block"
                placeholder=" password"
              />
              <div className="flex justify-between">
                <Link className="text-blue-500 underline" to="/forgot">
                  forgot password?
                </Link>
                <Link className="text-blue-500 underline" to="/signup">
                  New User?
                </Link>
              </div>

              <button
                onClick={onLoginClick}
                disabled={!canSave}
                type="button"
                className="border mt-5 p-2 block bg-blue-500 text-white"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;