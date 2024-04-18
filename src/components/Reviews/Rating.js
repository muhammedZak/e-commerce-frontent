import { FaStar, FaRegStar } from 'react-icons/fa';

const Review = () => {
  return (
    <div className="mt-2">
      <h5 className="text-lg font-medium tracking-wide">Customer Ratings</h5>
      <div className="md:flex md:p-3  md:justify-around">
        <div className="my-2 md:mr-20 xl:mr-10 text-2xl  font-serif font-semibold flex items-center gap-2">
          4.8 <FaStar className="text-yellow-300" />
        </div>
        <div className="hidden md:block border"></div>
        <div className=" w-full md:ml-20 text-neutral-500">
          <div className="flex items-center gap-2">
            <span>5</span>
            <span>
              <FaRegStar />
            </span>
            <span className="flex-1">
              <progress className="w-[95%]" value={1} />
            </span>
            <span className="tracking-wider w-[25%]">5645</span>
          </div>
          <div className="flex items-center gap-2">
            <span>4</span>
            <span>
              <FaRegStar />
            </span>
            <span className="flex-1">
              <progress className="w-[95%]" value={0.8} />
            </span>
            <span className="tracking-wider w-[25%]">5645</span>
          </div>
          <div className="flex items-center gap-2">
            <span>3</span>
            <span>
              <FaRegStar />
            </span>
            <span className="flex-1">
              <progress className="w-[95%]" value={0.5} />
            </span>
            <span className="tracking-wider w-[25%]">5645</span>
          </div>
          <div className="flex items-center  gap-2">
            <span>2</span>
            <span>
              <FaRegStar />
            </span>
            <span className="flex-1">
              <progress className="w-[95%]" value={0.2} />
            </span>
            <span className="tracking-wider w-[25%]">64</span>
          </div>
          <div className="flex items-center gap-2">
            <span>1</span>
            <span>
              <FaRegStar />
            </span>
            <span className="flex-1">
              <progress className="w-[95%]" value={0.1} />
            </span>
            <span className="tracking-wider w-[25%]">45</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
