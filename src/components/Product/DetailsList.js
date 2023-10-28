import { useState } from 'react';

function Tasks({ detail, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let content;
  if (isEditing) {
    content = (
      <>
        <input
          value={detail.title}
          onChange={(e) => {
            onChange({ ...detail, title: e.target.value });
          }}
          placeholder="  title"
          className="p-1 border focus:outline-none"
        />
        <input
          value={detail.value}
          onChange={(e) => {
            onChange({ ...detail, value: e.target.value });
          }}
          placeholder="  value"
          className="p-1 mt-1 md:m-0 border focus:outline-none"
        />
        <button
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
          disabled={!detail.title || !detail.value}
          onClick={() => setIsEditing(false)}
        >
          Save
        </button>
      </>
    );
  } else {
    content = (
      <>
        <span>{detail.title}: </span>
        <span>{detail.value}</span>
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(detail._id)}
          className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
        >
          Delete
        </button>
      </>
    );
  }

  return content;
}

const DetailsList = ({ productDetails, onChangeDetails, onDeleteDetails }) => {
  return (
    <ul className="flex flex-wrap gap-7">
      {productDetails.map((detail) => (
        <li key={detail._id} className="p-2 border">
          <Tasks
            detail={detail}
            onChange={onChangeDetails}
            onDelete={onDeleteDetails}
          />
        </li>
      ))}
    </ul>
  );
};

export default DetailsList;
