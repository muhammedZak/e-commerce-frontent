import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from '../../components/Skeleton';
import Paginate from '../../components/Paginate';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../store/apis/productsApi';
import { toast } from 'react-toastify';

const ProductsListPage = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, isSuccess, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const onDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProduct(productId);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className=" px-5">
        <div className="flex justify-between px-1 pb-3 border-b-2 mb-10 mt-10">
          <h1 className="text-black text-4xl font-semibold">Products</h1>
          <button className="bg-blue-500 shadow-sm hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
            <Link to="/admin/products">Create Product</Link>
          </button>
        </div>
        {isLoading ? (
          <Skeleton times={3} className="h-10 w-full" />
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <table className="mb-14 min-w-full border-collapse block md:table shadow-2xl shadow-gray-950">
            <thead className="block md:table-header-group">
              <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                <th className="bg-gray-800 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Id
                </th>
                <th className="bg-gray-800 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Name
                </th>

                <th className="bg-gray-800 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Price
                </th>

                <th className="bg-gray-800 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Category
                </th>
                <th className="bg-gray-800 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {data.products.map((product) => (
                <tr
                  key={product._id}
                  className="bg-gray-700 text-stone-200 hover:text-black hover:bg-gray-100 border border-grey-500 md:border-none block md:table-row"
                >
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Id
                    </span>
                    {product._id}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Name
                    </span>
                    {product.name}
                  </td>

                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Price
                    </span>
                    {product.price}
                  </td>

                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Admin
                    </span>
                    {product.category}
                  </td>

                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Actions
                    </span>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        Edit
                      </Link>
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {isSuccess && (
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        )}
      </div>
    </>
  );
};

export default ProductsListPage;
