import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '../../components/Skeleton';
import DetailsList from '../../components/Product/DetailsList';
import {
  useDeleteProductImageMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../store/apis/productsApi';
import { toast } from 'react-toastify';

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [images, setImages] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newValue, setNewValue] = useState('');
  const [productDetails, setProductDetails] = useState([]);

  const {
    data: product,
    isLoading,
    isError,
    refetch,
    isSuccess,
    error,
  } = useGetProductQuery(productId);

  useEffect(() => {
    if (isSuccess) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setProductDetails(product.productDetails);
      setImages(product.images);
    }
  }, [product]);

  // console.log(images);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const onChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        description,
        price,
        images,
        countInStock,
        productDetails,
      }).unwrap();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const canSave = [newTitle, newValue].every(Boolean);

  const onAddClick = (e) => {
    e.preventDefault();
    setProductDetails([
      ...productDetails,
      { title: newTitle, value: newValue },
    ]);
    setNewTitle('');
    setNewValue('');
  };

  function onChangeProdDtls(detail) {
    setProductDetails(
      productDetails.map((d) => {
        if (d._id === detail._id) {
          return detail;
        } else {
          return d;
        }
      })
    );
  }

  function handleDeleteDetails(detailId) {
    setProductDetails(productDetails.filter((d) => d._id !== detailId));
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImages([...images, { url: res.url, path: res.path }]);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const [deleteProductImage] = useDeleteProductImageMutation();

  const onImageRemoveClick = async (img) => {
    try {
      const res = await deleteProductImage({ imageName: img.url });
      toast.success(res.data.message);
      setImages(() => images.filter((i) => i.url !== img.url));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <div className="p-4 md:flex md:justify-center shadow-2xl shadow-black">
        <div className="p-5 bg-white border md:w-3/4">
          <div className="py-4 text-center border">
            <h1 className="capitalize font-semibold text-2xl tracking-wide">
              Edit Product
            </h1>
          </div>
          {loadingUpdate && <Skeleton times={3} className="h-10 w-full" />}
          {isLoading ? (
            <Skeleton times={3} className="h-10 w-full" />
          ) : isError ? (
            <p>{error?.data?.message || error.error}</p>
          ) : (
            <form onSubmit={onChangeSubmit}>
              <div className="my-3 border p-2">
                <label className="block">Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder=" Name"
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="my-3 border p-2">
                <label className="block">Description</label>
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder=" description"
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="my-3 border p-2">
                <label className="block">Price</label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  placeholder=" price"
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="my-3 border p-2">
                <label className="block">Count in stock</label>
                <input
                  onChange={(e) => setCountInStock(e.target.value)}
                  value={countInStock}
                  placeholder=" count in stock"
                  className="w-full focus:outline-none"
                />
              </div>

              <div className="my-3 border p-2">
                <label htmlFor="multiple_files" className="block">
                  Upload image
                </label>
                <input
                  disabled={images.length >= 4}
                  id="multiple_files"
                  type="file"
                  multiple
                  onChange={uploadFileHandler}
                  placeholder=" images"
                  className="w-full focus:outline-none"
                />
                {images.map((img, index) => (
                  <div key={index}>
                    <span>{img.url}</span>
                    <span onClick={() => onImageRemoveClick(img)}>remove</span>
                  </div>
                ))}
              </div>

              <div className="my-3 p-2 border flex flex-wrap justify-between">
                <label>Product Details:</label>
                <input
                  onChange={(e) => setNewTitle(e.target.value)}
                  value={newTitle}
                  placeholder="  title"
                  className="p-1 border focus:outline-none"
                />
                <input
                  onChange={(e) => setNewValue(e.target.value)}
                  value={newValue}
                  placeholder="  value"
                  className="p-1 mt-1 md:m-0 border focus:outline-none"
                />
                <button
                  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                  disabled={!canSave}
                  onClick={onAddClick}
                >
                  Add
                </button>
              </div>
              <DetailsList
                productDetails={productDetails}
                onChangeDetails={onChangeProdDtls}
                onDeleteDetails={handleDeleteDetails}
              />

              <div className="my-3 border py-3 text-center text-gray-300 bg-gray-900 hover:text-white">
                <button className="font-medium tracking-widest" type="submit">
                  SAVE CHANGES
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;
