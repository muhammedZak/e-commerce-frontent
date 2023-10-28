import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../store/slices/cartSlice';
import Skeleton from '../components/Skeleton';
import Address from '../components/Address/Address';
import CartSummary from '../components/Cart/CartSummary';
import {
  useGetAddressQuery,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
  useAddAddressMutation,
} from '../store/apis/addressApi';
import AddressButton from '../components/Address/AddressButton';
import AddAddress from '../components/Address/AddAddress';

const ShippingPage = () => {
  const { data, isLoading, isSuccess, refetch, error } = useGetAddressQuery();

  const [deleteAddress, { isLoading: loadingDelete }] =
    useDeleteAddressMutation();

  const [addAddress, { isLoading: addAddressLoading, error: addAddressError }] =
    useAddAddressMutation();

  const [updateAddress, { isLoading: updateLoading }] =
    useUpdateAddressMutation();

  const [address, setAddress] = useState({});
  const [showAddAddress, setShowAddAddress] = useState(false);

  let defaultAddress;
  let otherAddresses;

  if (isSuccess && data) {
    defaultAddress = data.address.find((ad) => ad.defaultAddress === true);
    if (data.results > 0) {
      otherAddresses = data.address.filter((ad) => ad.defaultAddress === false);
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddAddressClick = () => {
    setShowAddAddress(true);
  };

  const handleAddAddressClose = () => {
    setShowAddAddress(false);
  };

  const saveShippingHandler = () => {
    dispatch(saveShippingAddress(address));
    navigate('/payment');
  };

  const onRadioclick = (ad) => {
    setAddress(ad);
  };

  const onRemoveClick = async (addressId) => {
    await deleteAddress(addressId);
    refetch();
  };

  const editAddressClick = async (addressData) => {
    try {
      await updateAddress(addressData).unwrap();
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  let renderedAddress;

  if (isSuccess && otherAddresses) {
    renderedAddress = otherAddresses.map((ad) => (
      <Address
        key={ad._id}
        address={ad}
        isChecked={address._id}
        onChange={onRadioclick}
        onRemoveClick={onRemoveClick}
        formSubmit={editAddressClick}
      />
    ));
  }

  const addAddressClick = async (addressData) => {
    try {
      await addAddress(addressData).unwrap();
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="px-4 ">
      <div className="p-2 my-2 border">
        <h1 className="text-lg lg:text-2xl font-medium tracking-wide">
          Select Delivery Address
        </h1>
      </div>
      <div className="lg:flex gap-3">
        <div className="lg:w-3/4">
          {isLoading || updateLoading || loadingDelete || addAddressLoading ? (
            <Skeleton times={3} className="h-10 w-full" />
          ) : isSuccess ? (
            <div>
              {defaultAddress ? (
                <>
                  <div className="p-2 my-1 bg-gray-100">
                    <h5 className="font-medium">Default Address</h5>
                  </div>
                  <Address
                    formSubmit={editAddressClick}
                    address={defaultAddress}
                    isChecked={address._id}
                    onChange={onRadioclick}
                    onRemoveClick={onRemoveClick}
                  />
                </>
              ) : (
                ''
              )}

              {otherAddresses && (
                <>
                  <div className="p-2 my-1 bg-gray-100">
                    <h5 className="font-medium">Other Address</h5>
                  </div>
                  {renderedAddress}
                </>
              )}
            </div>
          ) : error ? (
            <p>{error.message}</p>
          ) : (
            ''
          )}
          <div className="p-2 my-2 border">
            <AddressButton
              btnValue="ADD NEW ADDRESS"
              onClick={onAddAddressClick}
            />
          </div>
          {showAddAddress && (
            <AddAddress
              formSubmit={addAddressClick}
              onClose={handleAddAddressClose}
            />
          )}
        </div>
        <div className="my-1 lg:w-1/4">
          <CartSummary
            disabled={!address}
            btnValue="CONTINUE"
            btnClick={saveShippingHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
