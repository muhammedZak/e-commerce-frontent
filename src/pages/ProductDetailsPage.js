import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById } from '../store/slices/productsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetailsPage = () => {
  const { id: productId } = useParams();

  const product = useSelector((state) => selectProductById(state, productId));

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (newImage) => {
    setSelectedImage(newImage);
  };

  const onQtyChanged = (e) => {
    setQty(e.target.value);
  };

  const handleAddToCartClick = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const qtyOptions = [...Array(product.countInStock).keys()].map((x) => {
    return (
      <option key={x + 1} value={x + 1}>
        {x + 1}
      </option>
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white container my-10 mx-auto rounded-lg shadow-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:p-48">
          <div className="relative aspect-w-1 aspect-h-1 md:aspect-h-1">
            <div>
              <img
                src={selectedImage}
                alt={product.name}
                className="object-cover rounded-lg"
              />
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Image Gallery</h2>
              <div className="flex flex-wrap -mx-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="w-1/4 p-2 cursor-pointer"
                    onClick={() => handleImageChange(image)}
                  >
                    <img
                      src={image}
                      alt={product.name}
                      className={`object-cover rounded-lg ${
                        selectedImage === image
                          ? 'border-2 border-indigo-600'
                          : ''
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" md:text-left">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-indigo-600 mt-2">{product.category}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-2xl font-semibold text-indigo-600">
                ₹{product.price.toFixed(2)}
              </span>
              {product.countInStock > 0 && (
                <div>
                  <label htmlFor="itemQty">Qauntity: </label>
                  <select
                    id="itemQty"
                    className="border"
                    value={qty}
                    onChange={onQtyChanged}
                  >
                    {qtyOptions}
                  </select>
                </div>
              )}

              <button
                disabled={product.countInStock === 0}
                onClick={handleAddToCartClick}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none"
              >
                Add to Cart
              </button>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <ul>
                {product.productDetails.map((detail, index) => (
                  <li key={index} className="grid grid-cols-2 mb-2">
                    <p className="text-gray-600">{detail.title}:</p>
                    <p> {detail.value}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
