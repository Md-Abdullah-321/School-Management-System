import { useEffect, useState } from "react";

function Messages() {
  const [messages, setMessages] = useState([]);
  const fetchMessages = async () => {
    const res = await fetch(
      "https://creepy-duck-glasses.cyclic.app/api/message"
    );

    const data = await res.json();

    const lastSixMsg = [];
    for (let i = data.payload.length - 1; i >= 0; i--) {
      if (i === data.payload.length - 7) {
        break;
      }
      lastSixMsg.push(data.payload[i]);
    }
    setMessages([...lastSixMsg]);
  };

  const handleClick = (id) => {
    console.log(id);
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <div className="w-full flex flex-col justify-center px-4 border rounded-md">
      <h1 className="text-center text-xl sm:text-2xl uppercase my-4">
        Latest Messages
      </h1>
      <table className="table-fixed w-full">
        <thead className="w-full bg-yellow-500">
          <tr className="w-full">
            <th className="w-1/3 sm:w-3/12 text-center sm:text-start text-xs sm:text-md">
              Name
            </th>
            <th className="w-2/3 sm:w-5/12 text-center sm:text-start text-xs sm:text-md">
              Message
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {messages.map((msg, index) => {
            let className =
              index % 2 === 0
                ? "bg-gray-200 py-1 px-2 cursor-pointer"
                : "py-1 px-2 cursor-pointer";
            return (
              <tr
                className={className}
                key={msg._id}
                onClick={() => handleClick(msg._id)}
              >
                <td className="w-4/12 sm:w-3/12 truncate text-xs sm:text-sm font-semibold">
                  {msg.name}
                </td>

                <td className="w-4/12 sm:w-5/12 truncate text-xs sm:text-md text-gray-800">
                  {msg.message}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Messages;
