import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  filter = '',
}) => {
  return (
    pages > 1 && (
      <div className="flex justify-center">
        <nav className="m-5 flex space-x-2" aria-label="Pagination">
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              className={`
               relative inline-flex items-center px-4 py-2 text-sm border border-fuchsia-100 hover:border-violet-100 font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10
               ${
                 x + 1 === page
                   ? 'bg-gradient-to-r from-violet-500 to-indigo-900 text-white'
                   : 'text-white bg-blue-300'
               }
              `}
              to={
                isAdmin
                  ? `/admin/productslist/${x + 1}`
                  : keyword
                  ? `/watches/search/${keyword}/page/${x + 1}`
                  : filter
                  ? `/watches/${filter}/page/${x + 1}`
                  : `/watches/page/${x + 1}`
              }
            >
              {x + 1}
            </Link>
          ))}
        </nav>
      </div>
    )
  );
};

export default Paginate;
