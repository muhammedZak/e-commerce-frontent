import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    setKeyword('');
    if (keyword.trim()) {
      navigate(`/watches/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder=" Search here"
        className=""
      />
      <button
        className=" px-2 py-2 bg-cyan-900 text-gray-200 hover:text-white  font-semibold  hover:bg-cyan-950"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
