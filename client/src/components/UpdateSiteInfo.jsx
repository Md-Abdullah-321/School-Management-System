import { useState } from "react";
import { useSelector } from "react-redux";
import { UploadToFirebase } from "../helper/UploadToFirebase";

function UpdateSiteInfo() {
  const { siteInfo } = useSelector((state) => state.sitesettingsinfo);
  const [siteForm, setSiteForm] = useState({ ...siteInfo });
  const [showBtn, setShowBtn] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bgImageUrls = await Promise.all(
        siteForm.backgroundImage.map((url) => UploadToFirebase("settings", url))
      );

      const logo = await UploadToFirebase("settings", siteForm.logo);

      const response = await fetch(
        "https://creepy-duck-glasses.cyclic.app/api/site/update-site",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: siteForm.name,
            logo,
            backgroundImage: bgImageUrls,
          }),
        }
      );

      const data = await response.json();
      alert(data.messege);
      setShowBtn(true);
    } catch (error) {
      console.error("Error updating site:", error);
    }
  };

  const handleChange = (e) => {
    setShowBtn(false);
    if (e.target.name === "logo") {
      setSiteForm((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.files[0],
        };
      });
    } else if (e.target.name === "backgroundImage") {
      const keys = Object.keys(e.target.files);
      if (keys.length > 4) {
        alert("Maximum 4 background images are allowed.");
        return;
      }
      let imageArr = [];
      keys.map((key) => {
        imageArr.push(e.target.files[key]);
      });
      return setSiteForm((prev) => {
        return {
          ...prev,
          backgroundImage: imageArr,
        };
      });
    } else {
      setSiteForm((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };
  return (
    <div className="w-11/12 sm:w-8/12 shadow-lg bg-slate-100 rounded-md p-2">
      <form method="post">
        <div className="flex flex-col sm:flex-row gap-x-6 sm:items-center p-2">
          <label htmlFor="name" className="font-medium">
            Website Name:{" "}
          </label>
          <input
            type="text"
            value={siteForm.name}
            name="name"
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 px-2 rounded-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-x-20 sm:items-center p-2">
          <label htmlFor="logo" className="font-medium">
            Logo:{" "}
          </label>
          <input
            type="file"
            name="logo"
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 sm:px-2 rounded-md sm:ml-1"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-x-8 sm:items-center p-2">
          <label htmlFor="logo" className="font-medium">
            Hero Image:{" "}
          </label>
          <input
            type="file"
            name="backgroundImage"
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 sm:px-2 rounded-md sm:ml-1"
            multiple="multiple"
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

export default UpdateSiteInfo;
