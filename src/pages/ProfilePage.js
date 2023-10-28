import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/usersSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../store/slices/authSlice';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [isPending, setIsPending] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setMobile(userInfo.mobile);
    setGender(userInfo.gender);
    setDob(userInfo.dob);
  }, [
    userInfo.name,
    userInfo.email,
    userInfo.mobile,
    userInfo.gender,
    userInfo.dob,
  ]);

  const dispatch = useDispatch();

  const onChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);
      const res = await dispatch(
        updateUser({
          name,
          email,
          mobile,
          gender,
          dob,
        })
      ).unwrap();
      dispatch(setCredentials(res));
      toast.success('Successfully updated !', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error(err?.message || err.error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-8 bg-slate-50 md:flex md:justify-center">
      <div className="p-5  border md:w-3/4">
        <div className="py-4 text-center border">
          <h1 className="capitalize font-semibold text-2xl tracking-wide">
            {userInfo.name}
          </h1>
        </div>
        <form onSubmit={onChangeSubmit}>
          <div className="border-b py-5">
            <h2 className="text-xl font-medium">Account-Edit Profile</h2>
          </div>
          <div className="my-5 border p-2">
            <label className="block">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder=" Name"
              className="focus:outline-none"
            />
          </div>
          <div className="my-5 border p-2">
            <label className="block">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder=" email"
              className="focus:outline-none"
            />
          </div>
          <div className="my-5 border p-2">
            <label className="block">Mobile</label>
            <input
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              placeholder=" mobile"
              className="focus:outline-none"
            />
          </div>
          <div className=" gap-3 p-2 flex">
            <input
              onChange={(e) => setGender(e.target.value)}
              value="Male"
              name="gender"
              type="radio"
            />
            <label>Male</label>
            <input
              onChange={(e) => setGender(e.target.value)}
              value="Female"
              name="gender"
              type="radio"
            />
            <label>Female</label>
          </div>

          <div className="my-5 border p-2">
            <label className="block">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder=" Name"
              className="focus:outline-none"
            />
          </div>
          <div className="my-5 border p-4 text-center text-gray-300 bg-gray-900 hover:text-white">
            <button className="font-medium tracking-widest" type="submit">
              SAVE CHANGES
            </button>
          </div>
          <div className="my-1 border p-4 text-center text-gray-300 bg-gray-900 hover:text-white">
            <button className="font-medium tracking-widest">
              CHANGE PASSWORD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
