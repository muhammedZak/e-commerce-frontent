import Skeleton from '../../components/Skeleton';
import {
  useGetUsersQuery,
  useDeletUserMutation,
} from '../../store/apis/usersApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UsersListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deletUser] = useDeletUserMutation();

  const onDeleteUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deletUser(userId);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="px-5">
      <h1 className=" text-center mt-4 text-gray-300 text-4xl font-semibold border-b-2 mb-10">
        Users
      </h1>
      {isLoading ? (
        <Skeleton times={3} className="h-10 w-full" />
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <table className="mb-14 min-w-full border-collapse block md:table shadow-2xl shadow-gray-950">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th className="bg-gray-800 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Name
              </th>
              <th className="bg-gray-800 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Id
              </th>
              <th className="bg-gray-800 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Email Address
              </th>
              <th className="bg-gray-800 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Mobile
              </th>
              <th className="bg-gray-800 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Admin
              </th>
              <th className="bg-gray-800 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-gray-700 text-stone-200 hover:text-black hover:bg-gray-100 border border-grey-500 md:border-none block md:table-row"
              >
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Name
                  </span>
                  {user.name}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Id
                  </span>
                  {user._id}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Email Address
                  </span>
                  {user.email}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Mobile
                  </span>
                  {user.mobile ? user.mobile : 'None'}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Admin
                  </span>
                  {user.role}
                </td>

                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Actions
                  </span>
                  {user.role === 'user' && (
                    <>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
                        <Link to={`/admin/user/${user._id}/edit`}>Edit</Link>
                      </button>
                      <button
                        onClick={() => onDeleteUser(user._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersListPage;
