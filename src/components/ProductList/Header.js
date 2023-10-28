import React from 'react';

const Header = ({ count }) => {
  return (
    <div className="p-2 border-2">
      <div className="p-2 bg-gray-100">
        <div className="flex items-center justify-between">
          <div className="font-serif">{count} Items Found</div>
          <div>
            <form className="flex">
              <label className="px-1 py-2 font-serif">Sort By</label>
              <select className="px-1 py-2">
                <option>What's New</option>
                <option>Popularity</option>
                <option>Better Discount</option>
                <option>Price: High to Low</option>
                <option>Price: Low to High</option>
              </select>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
