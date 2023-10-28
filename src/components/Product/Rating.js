import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color }) => {
  return (
    <div className="flex items-center">
      <span classNames="m-2">
        {value >= 1 ? (
          <FaStar className="text-yellow-300" />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt className="text-yellow-300" />
        ) : (
          <FaRegStar className="text-yellow-300" />
        )}
      </span>
      <span classNames="m-2">
        {value >= 2 ? (
          <FaStar className="text-yellow-300" />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt className="text-yellow-300" />
        ) : (
          <FaRegStar className="text-yellow-300" />
        )}
      </span>
      <span classNames="m-2">
        {value >= 3 ? (
          <FaStar className="text-yellow-300" />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt className="text-yellow-300" />
        ) : (
          <FaRegStar className="text-yellow-300" />
        )}
      </span>
      <span classNames="m-2">
        {value >= 4 ? (
          <FaStar className="text-yellow-300" />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt className="text-yellow-300" />
        ) : (
          <FaRegStar className="text-yellow-300" />
        )}
      </span>
      <span classNames="m-2">
        {value >= 5 ? (
          <FaStar className="text-yellow-300" />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt className="text-yellow-300" />
        ) : (
          <FaRegStar className="text-yellow-300" />
        )}
      </span>
      <span className="m-2 font-semibold text-lg pl-1">{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

export default Rating;
