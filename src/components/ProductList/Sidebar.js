import React from 'react';

const Sidebar = () => {
  return (
    <div className="hidden lg:block">
      <div className="border">
        <div className="border-b-2">
          <div className="py-2 px-4 ">
            <h5 className="text-2xl italic font-medium tracking-widest">
              Filters
            </h5>
          </div>
        </div>
        <div className="py-3 px-4">
          <h6 className="py-1 font-semibold text-lg tracking-wider bg-gray-100">
            Material
          </h6>
          <div className="pt-3">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider">Stainless steel</label>
          </div>
          <div className="pt-1">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider">Leather</label>
          </div>
          <div className="pt-1">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider">Fabric</label>
          </div>
        </div>
        <div className="pt-2 px-4">
          <h6 className="py-1 font-semibold text-lg tracking-wider bg-gray-100">
            Price
          </h6>
          <div className="pt-3">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider">Under ₹4995</label>
          </div>
          <div className="pt-1">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider">₹4995-₹7994</label>
          </div>
          <div className="pt-1">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider"> ₹7995-₹9994</label>
          </div>
          <div className="pt-1">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider">₹9995 and Above</label>
          </div>
        </div>
        <div className="pt-3 px-4">
          <h6 className="py-1 font-semibold text-lg tracking-wider bg-gray-100">
            Strap size
          </h6>
          <div className="pt-3">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider">12mm</label>
          </div>
          <div className="pt-1">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider">14mm</label>
          </div>
          <div className="pt-1">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider">16mm</label>
          </div>
          <div className="pt-1">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider">18mm</label>
          </div>
          <div className="pt-1 pb-2">
            <input type="checkbox" />
            <label className="ml-3 tracking-wider">20mm</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
