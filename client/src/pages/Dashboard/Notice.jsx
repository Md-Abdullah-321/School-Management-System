import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import Sidebar from "../../layout/Sidebar";

function Notice() {
  const navigate = useNavigate();
  const [pdf, setPdf] = useState(null);
  const [title, setTitle] = useState("");
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.firstName) {
      navigate("/admin/login");
    }
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
      const response = await fetch(
        "https://creepy-duck-glasses.cyclic.app/api/site/notice",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            url: downloadURL,
          }),
        }
      );

      const data = await response.json();
      alert(data.messege);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row w-full">
      <Sidebar />
      <div className="flex w-full min-h-screen flex-col p-5">
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            name="pdf"
            onChange={(e) => setPdf(e.target.files[0])}
          />
          <button onClick={handleClick}>upload</button>
        </div>
      </div>
    </div>
  );
}

export default Notice;
