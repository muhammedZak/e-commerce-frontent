import React from 'react';
import { useGetMyOrdersQuery } from '../store/apis/ordersApi';
import Skeleton from '../components/Skeleton';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
  const { data: orders, isLoading, isError, error } = useGetMyOrdersQuery();

  let renderedOrders;
  if (orders) {
    renderedOrders = orders.map((order) => (
      <tr key={order._id}>
        <td className="font-sans border-y-2 px-3 py-4 border-slate-700">
          {order._id}
        </td>
        <td className="font-sans border-y-2 px-3 py-4 border-slate-700">
          {order.isPaid ? 'Paid' : 'Not paid'}
        </td>
        <td className="font-sans border-y-2 px-3 py-4 border-slate-700">
          {order.isPaid ? 'Delivered' : 'Not delivered'}
        </td>
        <td className="font-sans text-center border-y-2 px-3 py-4 border-slate-700">
          {order.paymentMethod}
        </td>
        <td className="font-sans border-y-2 px-3 py-4 border-slate-700">
          {order.createdAt.substring(0, 10)}
        </td>
        <td className="font-sans border-y-2 px-3 py-4 border-slate-700">
          {order.totalPrice}
        </td>
        <td className="font-sans border-y-2 px-3 py-4 border-slate-700">
          <Link
            className=" px-2 py-1 rounded bg-gray-700 text-gray-200 shadow hover:bg-gray-900 hover:text-white"
            to={`/orders/${order._id}`}
          >
            Details
          </Link>
        </td>
      </tr>
    ));
  }

  return isLoading ? (
    <Skeleton times={3} className="h-10 w-full" />
  ) : isError ? (
    <p>error fething data..{error.toString()}</p>
  ) : orders.length > 0 ? (
    <>
      <h2 className="text-center mt-4 text-2xl font-semibold">You Orders</h2>
      <div className="flex justify-center mt-1">
        <table className="table-auto bg-gray-200">
          <thead>
            <tr>
              <th className="py-3 border-y-2 border-slate-600">ORDER</th>
              <th className="py-3 border-y-2 border-slate-600">PAID</th>
              <th className="py-3 border-y-2 border-slate-600">DELIVERED</th>
              <th className="py-3 border-y-2 border-slate-600">
                PAYMENT METHOD
              </th>
              <th className="py-3 border-y-2 border-slate-600">DATE</th>
              <th className="py-3 border-y-2 border-slate-600">TOTAL</th>
              <th className="py-3 border-y-2 border-slate-600"></th>
            </tr>
          </thead>
          <tbody>{renderedOrders}</tbody>
        </table>
      </div>
    </>
  ) : (
    <>
      <h2 className="text-center mt-4 text-2xl font-semibold border-b-2 mb-10">
        Your Orders
      </h2>
      <h3 className="text-xl font-medium text-center">You don't have orders</h3>
    </>
  );
};

export default OrderHistoryPage;
