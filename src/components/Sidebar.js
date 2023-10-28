import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

const Sidebar = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  const handleHeaderClick = () => {
    setShowHeader(!showHeader);
  };

  const handlePriceFilterClick = () => {
    setShowPriceFilter(!showPriceFilter);
  };

  return (
    <div className="md:w-1/6 border-r-4">
      <div className="container mx-auto">
        <div className="md:pl-5 md:mt-24">
          <div className="md:mb-5">
            <div className="px-4 md:px-0 border-x-2 md:border-0 border-y-2 flex items-center justify-between">
              <p className="text-xl font-medium">Filter By Type</p>
              <span className="md:hidden" onClick={handleHeaderClick}>
                {showHeader ? <FaChevronDown /> : <FaChevronUp />}
              </span>
            </div>

            <div className={`md:block ${showHeader ? '' : 'hidden'}`}>
              <ul className="border md:border-0">
                <li className="py-2 pl-2 border md:border-0">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Value 1</span>
                  </label>
                </li>
                <li className="py-2 pl-2 border md:border-0">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Value 2</span>
                  </label>
                </li>
                <li className="py-2 pl-2 border md:border-0">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Value 3</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="px-4 md:px-0 border-x-2 md:border-0 border-y-2 flex items-center justify-between">
              <p className="text-xl font-medium">Filter By Price</p>
              <span className="md:hidden" onClick={handlePriceFilterClick}>
                {showPriceFilter ? <FaChevronDown /> : <FaChevronUp />}
              </span>
            </div>

            <div className={`md:block ${showPriceFilter ? '' : 'hidden'}`}>
              <ul className="border md:border-0">
                <li className="py-2 pl-2 border md:border-0">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Value 1</span>
                  </label>
                </li>
                <li className="py-2 pl-2 border md:border-0">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Value 2</span>
                  </label>
                </li>
                <li className="py-2 pl-2 border md:border-0">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Value 3</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
