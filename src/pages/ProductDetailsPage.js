import { useState, useEffect } from 'react';
import Skeleton from '../components/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { addToCart } from '../store/slices/cartSlice';
import {
  useGetProductQuery,
  useCreateReviewMutation,
} from '../store/apis/productsApi';
// import Rating from '../components/Product/Rating';
import Rating from '../components/Reviews/Rating';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductQuery(productId);

  const [createReview, { isLoading: loadingCreateReview }] =
    useCreateReviewMutation();

  const [selectedImage, setSelectedImage] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (product) setSelectedImage(product.images[0]);
  }, [product]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (newImage) => {
    setSelectedImage(newImage);
  };

  const handleAddToCartClick = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate('/cart');
  };

  const onAddReviewClick = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      setComment('');
      setRating('');
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <Skeleton times={3} className="h-10 w-full" />
  ) : error ? (
    <p>{error?.data?.message || error.error}</p>
  ) : (
    <section className="px-4 py-5 xl:flex gap-10 xl:items-start xl:gap-5">
      <div className="xl:w-5/12 sm:flex sm:justify-center xl:justify-normal sm:items-start xl:items-start">
        <div className="order-2   xl:self-start">
          <img
            className="w-full sm:h-auto xl:h-auto	object-contain"
            src={selectedImage.path}
            alt={product.name}
          />
        </div>
        <div className="order-1">
          <ul className="px-10 sm:px-2 xl:px-5 py-3 xl:py-10 flex sm:flex-col gap-3 justify-center">
            {product.images.map((img) => (
              <li className="" key={img._id}>
                <button
                  className="w-full"
                  onClick={() => handleImageChange(img)}
                >
                  <img
                    className={`w-full md:w-20 h-20 object-contain ${
                      selectedImage._id === img._id
                        ? 'border-2 border-indigo-600'
                        : ''
                    }`}
                    src={img.path}
                    alt={product.name}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="xl:flex-1">
        <div className="md:mt-8 xl:m-0  ">
          <h3 className="text-2xl font-serif italic tracking-wider">
            {product.name}
          </h3>
        </div>
        <div className="py-1 mt-3 px-1 inline-flex gap-2 border font-serif">
          <div className="flex items-center">
            4.8 <FaStar className="text-yellow-300" />
          </div>
          <div className="border"></div>
          <div className="px-2 tracking-wider">{product.numReviews} Rating</div>
        </div>
        <hr className="my-3" />
        <div>
          <p className="text-lg font-serif font-semibold leading-10 tracking-wider">
            {product.discount && <span>{product.discountPrice}</span>}
            <span>₹{product.price.toFixed(2)}</span>
            {product.discount && (
              <span>({product.discount.percentage} off)</span>
            )}
          </p>
          <p className="text-lg font-medium">inclusive of all taxes</p>
          <p className="text-lg font-serif font-medium">
            {product.countInStock === 0 ? 'Out of stock' : 'In stock'}
          </p>
          <div className="md:flex md:gap-2">
            <button
              disabled={product.countInStock === 0}
              onClick={handleAddToCartClick}
              className="py-2 xl:leading-6 xl:w-1/2 mt-3 w-full md:w-1/3 text-center font-semibold tracking-wider leading-10 border bg-gray-950 text-white hover:bg-gray-700"
            >
              ADD TO CART
            </button>
            <button className="py-2 xl:leading-6 xl:w-1/2 mt-3 w-full md:w-1/3 text-center font-semibold tracking-wider leading-10 border bg-gray-950 text-white hover:bg-gray-700">
              WISHLIST
            </button>
          </div>
          <hr className="mt-4" />
          <div className="mt-2">
            <h5 className="mb-2 text-lg font-medium tracking-wide">
              Product details
            </h5>
            <ul className="md:grid grid-cols-2">
              {product.productDetails.map((detail, index) => (
                <li
                  key={index}
                  className="grid grid-flow-col auto-cols-max gap-4 mb-2"
                >
                  <p className=" text-gray-600 font-medium">{detail.title}:</p>
                  <p> {detail.value}</p>
                </li>
              ))}
            </ul>
          </div>
          <hr className="mt-4" />
          <Rating />
          <hr className="mt-4" />
          <div className="mt-2">
            <h5 className="text-lg font-medium tracking-wide">
              Customer Reviews (
              {product.reviews.length === 0
                ? 'No reviews'
                : `${product.reviews.length}`}
              )
            </h5>
            {product.reviews.length > 0 &&
              product.reviews.map((review) => (
                <div className="my-3 lg:flex gap-5">
                  <div className="w-10 lg:mt-6 lg:h-10 xl:h-7 text-lg font-medium px-1 bg-green-600 text-white flex items-center gap-1">
                    {review.rating} <FaStar />
                  </div>
                  <div>
                    <p className="py-3 text-lg text-neutral-500">
                      {review.comment}
                    </p>
                    <img
                      className="w-20"
                      src={product.images[0].path}
                      alt="Avatar"
                    />
                    <div className="py-1 mt-3 px-1 inline-flex gap-2 border font-serif text-neutral-500">
                      <div className="flex items-center">{review.name}</div>
                      <div className="border"></div>
                      <div className="px-2 tracking-widest">
                        {review.createdAt.substring(0, 10)}
                      </div>
                    </div>
                  </div>
                  <hr className="mt-3" />
                </div>
              ))}
          </div>
        </div>
        <hr className="mt-4" />
        <h2 className="text-xl font-semibold mt-8 mb-4">
          Write a customer review
        </h2>
        {loadingCreateReview && <Skeleton times={3} className="h-10 w-full" />}
        {userInfo ? (
          <form onSubmit={onAddReviewClick}>
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-gray-700 font-medium"
              >
                Rating
              </label>
              <select
                required
                onChange={(e) => setRating(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
              >
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <label
                htmlFor="comment"
                className="block text-gray-700 font-medium"
              >
                Comment
              </label>
              <textarea
                required
                className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none"
              disabled={loadingCreateReview}
              type="submit"
            >
              Submit
            </button>
          </form>
        ) : (
          <p className="text-gray-700">
            Please{' '}
            <Link to="/login" className="text-blue-500">
              sign in
            </Link>{' '}
            to write a review
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsPage;
