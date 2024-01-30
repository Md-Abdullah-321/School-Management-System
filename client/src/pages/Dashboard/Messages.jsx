import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MessageCart from "../../components/MessageCart";
import Sidebar from "../../layout/Sidebar";

function Messages() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchMessage = async () => {
    const res = await fetch(
      "https://creepy-duck-glasses.cyclic.app/api/message"
    );

    const data = await res.json();
    const latestToOldest = [];

    for (let i = data.payload.length - 1; i >= 0; i--) {
      latestToOldest.push(data.payload[i]);
    }
    setMessages([...latestToOldest]);
  };
  useEffect(() => {
    if (!user.firstName) {
      navigate("/admin/login");
    }
    fetchMessage();
  }, []);

  console.log(messages);
  return (
    <div className="flex flex-col sm:flex-row w-full">
      <Sidebar />
      <div className="flex w-full min-h-screen flex-col p-5">
        <div className="w-full flex items-center gap-4 flex-wrap">
          {messages.map((msg) => (
            <MessageCart key={msg._id} msg={msg} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Messages;
