import { useState } from "react";
import { UploadToFirebase } from "../helper/UploadToFirebase";

const init = {
  event_name: "",
  event_collection: [],
};
function AddNewMemory() {
  const [gallery, setGallery] = useState({ ...init });
  const [showBtn, setShowBtn] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event_collection = [];
    gallery.event_collection.map(async (url) => {
      const firebaseURL = await UploadToFirebase("gallery", url);
      event_collection.push(firebaseURL);
    });
    const response = await fetch(
      "https://creepy-duck-glasses.cyclic.app/api/site/event",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_name: gallery.event_name,
          event_collection: event_collection,
        }),
      }
    );
    const data = await response.json();
    alert(data.messege);
    setShowBtn(true);
  };
  const handleChange = (e) => {
    setShowBtn(false);
    if (e.target.name === "eventCollection") {
      const keys = Object.keys(e.target.files);
      if (keys.length > 4) {
        alert("Maximum 4 background images are allowed.");
        return;
      }
      let imageArr = [];
      keys.map((key) => {
        imageArr.push(e.target.files[key]);
      });
      return setGallery((prev) => {
        return {
          ...prev,
          event_collection: imageArr,
        };
      });
    } else {
      setGallery((prev) => {
        return {
          ...prev,
          event_name: e.target.value,
        };
      });
    }
  };
  return (
    <div className="w-11/12 sm:w-8/12 shadow-lg bg-slate-100 rounded-md mt-5">
      <form method="post" className="p-2">
        <div className="flex flex-col sm:flex-row gap-x-12 sm:items-center p-2">
          <label htmlFor="name" className="font-medium">
            Event Name:{" "}
          </label>
          <input
            type="text"
            value={gallery.event_name}
            name="eventName"
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 px-2 rounded-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-x-2 sm:items-center p-2">
          <label htmlFor="logo" className="font-medium">
            Event Collection:{" "}
          </label>
          <input
            type="file"
            name="eventCollection"
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 sm:px-2 rounded-md"
            multiple
          />
        </div>

        <button
          className="ml-2 bg-yellow-500 px-2 py-0.5 uppercase font-medium cursor-pointer hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={showBtn}
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default AddNewMemory;
