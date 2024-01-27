import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { formatDateTime } from "../helper/formatDateAndTime";

/* eslint-disable react/prop-types */
function MessageCart({ msg }) {
  const [modal, setModal] = useState(false);
  const dateAndTime = formatDateTime(msg.createdAt).split(" ");

  const seenMessage = async () => {
    const res = await fetch(
      `https://creepy-duck-glasses.cyclic.app/api/message/${msg._id}`
    );
    const data = await res.json();
    console.log(data);
  };
  const handleModal = async () => {
    setModal(true);
    await seenMessage();
  };

  const handleClose = () => {
    setModal(false);
  };
  const msgStyle = msg.seen
    ? "capitalize text-xs text-gray-900"
    : "capitalize text-xs font-medium";

  const nameStyle = msg.seen
    ? "text-sm uppercase"
    : "text-sm uppercase font-semibold";
  return (
    <>
      {!modal && (
        <div className="bg-yellow-500 w-80 p-2 flex justify-between shadow-md rounded-md">
          <div className="w-9/12">
            <p className={nameStyle}>{msg.name}</p>
            <p className="text-xs text-gray-800">{msg.email}</p>
            <p className="text-xs text-gray-800">{msg.phoneNumber}</p>
            <p className={msgStyle}>{msg.message}</p>
          </div>
          <div className="w-3/12 flex flex-col justify-between items-end">
            <div>
              <p className="text-xs text-end">{dateAndTime[0].slice(0, -1)}</p>
              <p className="text-xs text-end">
                {dateAndTime[1] + " " + dateAndTime[2]}{" "}
              </p>
            </div>
            <div>
              <button
                className="text-xs uppercase bg-green-500 px-1 py-0.5 cursor-pointer rounded-sm font-semibold hover:shadow-xl"
                onClick={handleModal}
              >
                View
              </button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed left-0 right-0 top-0 bottom-0 w-full h-screen">
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-slate-900 opacity-95 "
            onClick={handleClose}
          ></div>
          <div className="fixed flex top-40 justify-center w-full">
            <div className="bg-yellow-500 p-4 w-11/12 sm:w-1/3 h-52 rounded-md shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <p className={nameStyle}>{msg.name}</p>
                  <p className="text-xs text-gray-800">{msg.email}</p>
                  <p className="text-xs text-gray-800">{msg.phoneNumber}</p>
                </div>
                <RxCross2 className="cursor-pointer" onClick={handleClose} />
              </div>
              <p className="w-full h-1/2 mt-5 bg-yellow-400 p-1 rounded-md text-xs capitalize shadow-xs text-slate-900">
                {msg.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MessageCart;
