import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  selectAllProducts,
  fetchProducts,
} from '../store/slices/productsSlice';
import ProdductCard from '../components/ProdductCard';
//import Breadcump from '../components/Breadcump';
import Sidebar from '../components/Sidebar';
import Skeleton from '../components/Skeleton';

const ProductsList = () => {
  const location = useLocation();

  //const path = location.pathname.substring(1);
  //const category = path.charAt(0).toUpperCase() + path.slice(1);

  const dispatch = useDispatch();

  const data = useSelector(selectAllProducts);

  const productStatus = useSelector((state) => state.products.status);

  const productError = useSelector((state) => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  let products;
  let content;

  if (location.pathname === '/men') {
    products = data.filter((product) => {
      return product.category === 'Men';
    });
  } else if (location.pathname === '/women') {
    products = data.filter((product) => {
      return product.category === 'Women';
    });
  } else {
    products = data;
  }

  if (productStatus === 'loading') {
    content = <Skeleton times={6} className="h-20 w-full" />;
  } else if (productStatus === 'succeeded') {
    content = products.map((product) => {
      return <ProdductCard key={product._id} product={product} />;
    });
  } else if (productStatus === 'failed') {
    content = <div>{productError}</div>;
  }

  return (
    <>
      {/* <Breadcump /> */}
      <section>
        <div className="md:flex">
          <Sidebar />
          <div className="my-10 md:w-2/3 lg:w-3/4 xl:w-4/5 mx-auto">
            <div className="text-center">
              <p className="text-3xl">Our Products</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {content}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsList;
