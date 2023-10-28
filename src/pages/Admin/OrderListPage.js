import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Skeleton from '../../components/Skeleton';
import { useGetOrdersQuery } from '../../store/apis/ordersApi';

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <div>
        <h1 className="mt-5 text-gray-300 text-center border-b-2 mb-10 text-3xl font-semibold tracking-wider">
          Orders
        </h1>
        {isLoading ? (
          <Skeleton times={3} className="h-10 w-full" />
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : orders.length > 0 ? (
          <div className="flex justify-center mt-1">
            <table className="mb-14 table-auto bg-gray-200 shadow-2xl shadow-gray-950">
              <thead>
                <tr>
                  <th className="py-3 border-y-2 border-slate-600">ID</th>
                  <th className="py-3 border-y-2 border-slate-600">USER</th>
                  <th className="py-3 border-y-2 border-slate-600">DATE</th>
                  <th className="py-3 border-y-2 border-slate-600">TOTAL</th>
                  <th className="py-3 border-y-2 border-slate-600">PAID</th>
                  <th className="py-3 border-y-2 border-slate-600">
                    DELIVERED
                  </th>
                  <th className="py-3 border-y-2 border-slate-600"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-100">
                    <td className="font-sans border-y-2 px-6 py-4 border-slate-700">
                      {order._id}
                    </td>
                    <td className="font-sans border-y-2 px-6 py-4 border-slate-700">
                      {order.user && order.user.name}
                    </td>
                    <td className="font-sans border-y-2 px-6 py-4 border-slate-700">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="font-sans border-y-2 px-6 py-4 border-slate-700">
                      ${order.totalPrice}
                    </td>
                    <td className="font-sans border-y-2 px-6 py-4 border-slate-700">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="font-sans border-y-2 px-6 py-4 border-slate-700">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes className="ml-4 text-red-500" />
                      )}
                    </td>
                    <td className="font-sans border-y-2 px-6 py-4 border-slate-700">
                      <Link
                        className=" px-2 py-1 rounded bg-gray-700 text-gray-200 shadow hover:bg-gray-900 hover:text-white"
                        to={`/orders/${order._id}`}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <h3 className="text-xl text-gray-300 font-medium text-center">
              No orders
            </h3>
          </>
        )}
      </div>
    </>
  );
};

export default OrderListPage;
