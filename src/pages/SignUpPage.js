import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser } from '../store/slices/usersSlice';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const [name, setName] = useState('');
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

  const onNameChange = (e) => setName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const canSave =
    [name, email, password].every(Boolean) && addRequestStatus === 'idle';

  const onRegisterClick = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        const res = await dispatch(
          addNewUser({ name, email, password })
        ).unwrap();
        dispatch(setCredentials(res));
        navigate(redirect);
        toast.success('Successfully signed up !', {
          position: toast.POSITION.TOP_CENTER,
        });
        setName('');
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
      <div className="p-10 mt-15 order-2">
        <div className="p-10 bg-white">
          <div className="">
            <form>
              <input
                name="userName"
                value={name}
                onChange={onNameChange}
                type="text"
                className="p-3 border w-80  block"
                placeholder=" name"
              />
              <input
                name="userEmail"
                value={email}
                onChange={onEmailChange}
                type="email"
                className="p-3 border w-80 mt-5 block"
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
              <Link className="text-blue-500 underline" to="/login">
                Already a User?
              </Link>
              <button
                onClick={onRegisterClick}
                disabled={!canSave}
                type="button"
                className="border p-2 block bg-blue-500 text-white"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
