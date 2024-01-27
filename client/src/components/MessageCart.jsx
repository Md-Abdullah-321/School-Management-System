import { formatDateTime } from "../helper/formatDateAndTime";

/* eslint-disable react/prop-types */
function MessageCart({ msg }) {
  const dateAndTime = formatDateTime(msg.createdAt).split(" ");
  const className = msg.seen
    ? "capitalize text-xs text-gray-900"
    : "capitalize text-xs font-medium";
  return (
    <div className="bg-yellow-500 w-80 p-2 flex justify-between shadow-md rounded-md">
      <div className="w-9/12">
        <p className="text-sm uppercase font-semibold">{msg.name}</p>
        <p className="text-xs text-gray-800">{msg.email}</p>
        <p className="text-xs text-gray-800">{msg.phoneNumber}</p>
        <p className={className}>{msg.message}</p>
      </div>
      <div className="w-3/12 flex flex-col justify-between items-end">
        <div>
          <p className="text-xs text-end">{dateAndTime[0].slice(0, -1)}</p>
          <p className="text-xs text-end">
            {dateAndTime[1] + " " + dateAndTime[2]}{" "}
          </p>
        </div>
        <div>
          <button className="text-xs uppercase bg-green-500 px-1 py-0.5 cursor-pointer rounded-sm font-semibold hover:shadow-xl">
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageCart;
