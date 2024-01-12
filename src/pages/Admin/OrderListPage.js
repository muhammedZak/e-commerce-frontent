import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Skeleton from '../../components/Skeleton';
import { useGetOrdersQuery } from '../../store/apis/ordersApi';

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <div className="py-10">
        <h1 className=" text-black opacity-95 text-center border-b-2 mb-10 text-3xl font-semibold tracking-wider">
          Orders
        </h1>
        {isLoading ? (
          <Skeleton times={3} className="h-10 w-full" />
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : orders.length > 0 ? (
          <div className="px-5 overflow-x-auto">
            <table className="table-auto border-collapse border-spacing-0 border border-gray-500 w-full">
              <thead>
                <tr className="odd:bg-gray-100">
                  <th className="p-4">ID</th>
                  <th className="p-4">USER</th>
                  <th className="p-4">DATE</th>
                  <th className="p-4">TOTAL</th>
                  <th className="p-4">PAID</th>
                  <th className="p-4">DELIVERED</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="even:bg-slate-100 font-mono">
                    <td className="p-4">{order._id}</td>
                    <td className="p-4">{order.user && order.user.name}</td>
                    <td className="p-4">{order.createdAt.substring(0, 10)}</td>
                    <td className="p-4">₹ {order.totalPrice}</td>
                    <td className="p-4">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="p-4">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes className="ml-4 text-red-500" />
                      )}
                    </td>
                    <td className="p-4">
                      <Link
                        className="bg-green-800 py-2 px-3 text-white rounded"
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
