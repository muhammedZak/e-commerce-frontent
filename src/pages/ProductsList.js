import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductsQuery } from '../store/apis/productsApi';
import ProdductCard from '../components/ProductList/ProdductCard';
import Sidebar from '../components/ProductList/Sidebar';
import Skeleton from '../components/Skeleton';
import Paginate from '../components/Paginate';
import Header from '../components/ProductList/Header';
import OffCanvas from '../components/ProductList/Offcanvas';

const ProductsList = () => {
  const { pageNumber, keyword, filter } = useParams();

  const [material, setMaterial] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const handlePriceClick = (minPrice, maxPrice) => {
    if (!minPrice || !maxPrice) {
      setMinPrice('');
      setMaxPrice('');
    } else if (minPrice === '0') {
      setMinPrice('');
      setMaxPrice(maxPrice);
    } else if (maxPrice === '0') {
      setMinPrice(minPrice);
      setMaxPrice('');
    } else {
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
    }
  };

  const attr = material.length
    ? encodeURIComponent(JSON.stringify(material))
    : '';

  const { data, isSuccess, isLoading, error } = useGetProductsQuery({
    keyword,
    filter,
    attr,
    minPrice,
    maxPrice,
    pageNumber: Number(pageNumber) || 1,
  });

  let content;

  if (isLoading) {
    content = <Skeleton times={6} className="h-20 w-full" />;
  } else if (error) {
    content = <p>{error?.data?.message || error.error}</p>;
  } else if (isSuccess) {
    content = data.products.map((product) => {
      return (
        <div key={product._id} className="mt-3">
          <ProdductCard key={product._id} product={product} />
        </div>
      );
    });
  }

  return (
    <>
      <section className="py-10 ">
        <div className="px-1 md:px-14 lg:px-24">
          <div className="lg:grid px-3  lg:grid-cols-4 lg:gap-4">
            <div className="pb-2 block lg:hidden">
              <OffCanvas />
            </div>
            <Sidebar
              material={material}
              setMaterial={setMaterial}
              onClick={handlePriceClick}
            />
            <div className="lg:col-span-3">
              <Header count={isSuccess ? data.results : 0} />
              <div className="md:grid md:grid-cols-3 md:gap-5 lg:grid-cols-4">
                {content}
              </div>
            </div>
          </div>
          <hr className="my-5" />
          <div className="text-center">
            {isSuccess && (
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
                filter={filter ? filter : ''}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsList;
