import React from 'react';

const AddressButton = ({ btnValue, onClick, addressId }) => {
  return (
    <button
      onClick={() => onClick(addressId ? addressId : null)}
      className="w-44 py-2 hover:text-white hover:bg-gray-900  border"
    >
      {btnValue}
    </button>
  );
};

export default AddressButton;
