import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { useGetTopProductsQuery } from '../../store/apis/productsApi';
import { Link } from 'react-router-dom';

const CardHome = () => {
  const { data, isLoading } = useGetTopProductsQuery();

  let loading;
  if (isLoading) loading = <p>loading</p>;

  return isLoading
    ? loading
    : data.map((item) => (
        <div>
          <div className="relative">
            <img className="w-full" src={item.images[0].path} alt="img" />
            <div className="p-1 absolute top-2 right-3 bg-white rounded-full">
              <FavoriteBorderOutlinedIcon />
            </div>
            <div className="absolute left-2 bottom-3 flex gap-1 w-24 justify-center bg-white">
              <StarOutlinedIcon className="text-yellow-400" />
              <p>
                {item.rating} ({item.numReviews})
              </p>
            </div>
          </div>
          <div className="py-1">
            <Link to={`/products/${item._id}`}>
              <p className="py-1 text-2xl text-gray-950">{item.name}</p>
              <p className="py-1 text-2xl text-gray-950">$ {item.price}</p>
            </Link>
          </div>
        </div>
      ));
};

export default CardHome;
