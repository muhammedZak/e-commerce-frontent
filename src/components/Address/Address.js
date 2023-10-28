import React, { useState } from 'react';
import AddressButton from './AddressButton';
import EditAddress from './EditAddress';

const Address = ({ address, formSubmit, onChange, onRemoveClick }) => {
  const [showEditAddress, setShowEditAddress] = useState(false);

  const onEditAddressClick = () => {
    setShowEditAddress(true);
  };

  const handleEditAddressClose = () => {
    setShowEditAddress(false);
  };

  return (
    <div className="p-2 my-1 lg:flex lg:justify-between border">
      <div className="flex gap-4">
        <input
          value={address}
          name="address"
          onChange={() => onChange(address)}
          type="radio"
          className="self-start"
        />
        <div>
          <h5 className="font-bold tracking-wide capitalize">
            {address.contact.name}
          </h5>
          <p className="text-gray-500 font-mono">
            {address.addressDetails.address}
          </p>
          <p className="text-gray-500 font-mono">
            {address.addressDetails.town},{address.addressDetails.district}
          </p>
          <p className="text-gray-500 font-mono">
            {address.addressDetails.state},{address.addressDetails.country}
          </p>
        </div>
      </div>
      <div className="hidden lg:block border"></div>
      <div className="">
        <div className="mt-1">
          <AddressButton
            onClick={onRemoveClick}
            addressId={address._id}
            btnValue="REMOVE"
          />
        </div>
        <div className="mt-1">
          <AddressButton onClick={onEditAddressClick} btnValue="EDIT" />
        </div>
        {showEditAddress && (
          <EditAddress
            addressData={address}
            onClose={handleEditAddressClose}
            formSubmit={formSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Address;
