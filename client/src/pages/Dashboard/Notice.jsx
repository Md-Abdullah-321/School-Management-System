import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { IoCloudDownloadOutline, IoCreateOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { getDateAndMonth } from "../../helper/getDateAndMonth";
import Sidebar from "../../layout/Sidebar";

function Notice() {
  const navigate = useNavigate();
  const [text, setText] = useState(false);
  const [toggleNoticeForm, setToggleNoticeForm] = useState(false);
  const [notices, setNotices] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [title, setTitle] = useState("");
  const user = useSelector((state) => state.user);

  const fetchNotice = async () => {
    try {
      const response = await fetch(
        "https://creepy-duck-glasses.cyclic.app/api/site/notice"
      );
      const data = await response.json();
      setNotices([...data.payload]);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };
  useEffect(() => {
    if (!user.firstName) {
      navigate("/admin/login");
    }
    fetchNotice();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    if (pdf === null || title === "") {
      return alert("Please, fill all the input fields.");
    }

    try {
      const imageRef = ref(
        storage,
        `pdf/${pdf.name + Date.now() + Math.round(Math.random() * 1000)}`
      );
      const snapshot = await uploadBytes(imageRef, pdf);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const { date, month, year } = getDateAndMonth();
      const response = await fetch(
        "https://creepy-duck-glasses.cyclic.app/api/site/notice",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date,
            month,
            year,
            title,
            url: downloadURL,
          }),
        }
      );

      const data = await response.json();
      alert(data.messege);
      setToggleNoticeForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      const response = await fetch(
        "https://creepy-duck-glasses.cyclic.app/api/site/notice",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      const data = await response.json();
      alert(data.messege);
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row w-full">
      <Sidebar />
      {toggleNoticeForm && (
        <div className="flex w-full min-h-screen p-5 justify-center items-center">
          <form className="flex flex-col w-96 bg-yellow-100 p-3 rounded-md">
            <div className="w-full flex justify-end items-center">
              <RxCross2
                onClick={() => setToggleNoticeForm(false)}
                className="cursor-pointer hover:w-5 hover:h-5"
              />
            </div>
            <input
              type="text"
              name="title"
              className=" outline-none text-gray-700 text-sm p-1 rounded-sm mt-2"
              placeholder="Notice Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="file"
              name="pdf"
              className="mt-2"
              onChange={(e) => setPdf(e.target.files[0])}
            />
            <button
              className="mt-2 uppercase text-sm bg-yellow-500 p-0.5 rounded-sm"
              onClick={handleClick}
            >
              upload
            </button>
          </form>
        </div>
      )}

      {!toggleNoticeForm && (
        <div className="w-full min-h-screen p-5">
          {text && (
            <p className="fixed bottom-20 right-4 bg-gray-100 text-sm p-1 rounded-xl text-gray-700">
              Create Notice
            </p>
          )}
          <div
            className="fixed bottom-6 right-8 bg-gray-100 p-4 rounded-full cursor-pointer"
            onMouseOver={() => setText(true)}
            onMouseOut={() => setText(false)}
            onClick={() => setToggleNoticeForm(true)}
          >
            <IoCreateOutline className="w-5 h-5" />
          </div>

          <div className="w-full flex items-center gap-2">
            {notices.map((notice, index) => {
              return (
                <div
                  key={index}
                  className="w-60 bg-yellow-100 p-2 h-20 flex flex-col justify-center"
                >
                  <div className="w-full flex justify-between items-center px-0.5">
                    <p className="text-xs uppercase text-gray-600">{`${notice.date} ${notice.month} ${notice.year}`}</p>
                    <button
                      className="text-xs uppercase bg-yellow-500 p-0.5 rounded-sm"
                      onClick={() => handleDeleteNotice(notice._id)}
                    >
                      delete
                    </button>
                  </div>
                  <p className="text-sm truncate ml-1">{notice.title}</p>
                  <div className="p-1 font-light flex gap-x-1 items-center hover:bg-gray-100">
                    <IoCloudDownloadOutline />
                    <a
                      className="text-xs"
                      href={notice.url}
                      download={`${notice.title}.pdf`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notice;
