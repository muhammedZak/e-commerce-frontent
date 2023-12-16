import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Skeleton from '../../components/Skeleton';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../store/apis/usersApi';

const UserEditPage = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const { data: user, isLoading, error, refetch } = useGetUserQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const navigate = useNavigate();

  const onChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, role }).unwrap();
      toast.success('user updated successfully');
      refetch();
      navigate('/admin/userslist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <div className="p-8 md:flex md:justify-center shadow-2xl shadow-black">
        <div className="p-5 bg-white border md:w-3/4">
          <div className="py-4 text-center border">
            <h1 className="capitalize font-semibold text-2xl tracking-wide">
              Edit User
            </h1>
          </div>
          {loadingUpdate && <Skeleton times={3} className="h-10 w-full" />}
          {isLoading ? (
            <Skeleton times={3} className="h-10 w-full" />
          ) : error ? (
            <p>{error?.data?.message || error.error}</p>
          ) : (
            <form onSubmit={onChangeSubmit}>
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
                <label className="block">Role</label>
                <input
                  type="checkbox"
                  checked={role === 'admin'}
                  onChange={(e) =>
                    e.target.checked ? setRole('admin') : setRole('user')
                  }
                  className="focus:outline-none"
                />
              </div>
              <div className="my-5 border p-4 text-center text-gray-300 bg-gray-900 hover:text-white">
                <button className="font-medium tracking-widest" type="submit">
                  SAVE CHANGES
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
