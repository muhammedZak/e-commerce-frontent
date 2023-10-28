import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const EditAddress = ({ onClose, formSubmit, addressData }) => {
  const { contact, addressDetails, defaultAddress: defaultAdd } = addressData;

  const [name, setName] = useState(contact.name);
  const [mobile, setMobile] = useState(contact.mobile);
  const [address, setAddress] = useState(addressDetails.address);
  const [town, setTown] = useState(addressDetails.town);
  const [district, setDistrict] = useState(addressDetails.district);
  const [pin, setPin] = useState(addressDetails.pin);
  const [state, setState] = useState(addressDetails.state);
  const [country, setCountry] = useState(addressDetails.country);
  const [defaultAddress, setDefaultAddress] = useState(defaultAdd);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    formSubmit({
      id: addressData._id,
      name,
      mobile,
      address,
      pin,
      town,
      district,
      state,
      country,
      defaultAddress,
    });
    setAddress('');
    setCountry('');
    setDistrict('');
    setMobile(0);
    setPin(0);
    setName('');
    setState('');
    setTown('');
    setDefaultAddress(false);
    onClose();
  };

  return createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80 z-50"
      ></div>
      <form className="overflow-scroll">
        <div className="fixed top-10 bottom-10 left-96 right-96 p-10 bg-white z-50">
          <div className="flex justify-between">
            <h3 className=" text-lg font-medium">Contact Details</h3>
            <FaTimes className="cursor-pointer" onClick={onClose} />
          </div>
          <div className="p-2 mt-1 border">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full focus:outline-none"
              placeholder="Name"
            />
          </div>
          <div className="p-2 mt-1 border">
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full focus:outline-none"
              placeholder="Mobile"
            />
          </div>
          <h3 className=" text-lg font-medium">Address</h3>
          <div className="flex justify-between">
            <div className="p-2 mt-1 border">
              <input
                type="number"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full focus:outline-none"
                placeholder="Pin Code"
              />
            </div>
            <div className="p-2 mt-1">
              <input
                defaultChecked={defaultAddress}
                type="checkbox"
                onChange={(e) => setDefaultAddress(e.target.checked)}
                className="focus:outline-none"
              />
              Set Default
            </div>
          </div>
          <div className="p-2 mt-1 border">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full focus:outline-none"
              placeholder="Address"
            />
          </div>
          <div className="p-2 mt-1 border">
            <input
              value={town}
              onChange={(e) => setTown(e.target.value)}
              className="w-full focus:outline-none"
              placeholder="Town"
            />
          </div>
          <div className="p-2 mt-1 border">
            <input
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full focus:outline-none"
              placeholder="District"
            />
          </div>
          <div className="p-2 mt-1 border">
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full focus:outline-none"
              placeholder="State"
            />
          </div>
          <div className="p-2 mt-1 border">
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full focus:outline-none"
              placeholder="Country"
            />
          </div>
          <button
            onClick={handleFormSubmit}
            className="mt-3 p-3 w-full text-white bg-gray-900"
          >
            EDIT ADDRESS
          </button>
        </div>
      </form>
    </div>,
    document.querySelector('.modal-container')
  );
};

export default EditAddress;
