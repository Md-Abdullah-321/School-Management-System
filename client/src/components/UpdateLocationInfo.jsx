import { useState } from "react";
import { useSelector } from "react-redux";

function UpdateLocationInfo() {
  const { location } = useSelector((state) => state.sitesettingsinfo);
  const [locationForm, setLocationForm] = useState({ ...location });
  const [showBtn, setShowBtn] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://creepy-duck-glasses.cyclic.app/api/site/update-location",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          website: locationForm.website,
          phone: locationForm.phone,
          whatsApp: locationForm.whatsApp,
          email: locationForm.email,
          address: {
            street: locationForm.address.street,
            city: locationForm.address.city,
            district: locationForm.address.state,
            zip: locationForm.address.zip,
          },
        }),
      }
    );
    const data = await response.json();
    alert(data.messege);
    setShowBtn(true);
  };

  const handleChange = (e) => {
    setShowBtn(false);

    if (
      e.target.name === "street" ||
      e.target.name === "city" ||
      e.target.name === "district" ||
      e.target.name === "zip"
    ) {
      return setLocationForm((prev) => {
        prev.address[e.target.name] = e.target.value;
        return {
          ...prev,
        };
      });
    }
    setLocationForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="w-11/12 sm:w-8/12 shadow-lg bg-slate-100 mt-5 rounded-md">
      <form method="post" className="p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-x-6 sm:items-center p-2">
          <label htmlFor="name" className="font-medium">
            Website URL:{" "}
          </label>
          <input
            type="text"
            value={locationForm.website}
            name="website"
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 px-2 rounded-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-x-16 sm:items-center p-2">
          <label htmlFor="logo" className="font-medium">
            Phone:{" "}
          </label>
          <input
            type="text"
            name="phone"
            value={locationForm.phone}
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 sm:px-2 rounded-md sm:ml-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-x-10 sm:items-center p-2">
          <label htmlFor="logo" className="font-medium">
            WhatsApp:{" "}
          </label>
          <input
            type="text"
            name="whatsApp"
            value={locationForm.whatsApp}
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 sm:px-2 rounded-md sm:ml-1"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-x-5 sm:items-center p-2">
          <label htmlFor="logo" className="font-medium">
            Official Email:{" "}
          </label>
          <input
            type="text"
            name="email"
            value={locationForm.email}
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 sm:px-2 rounded-md sm:ml-1"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-x-16 sm:items-center p-2">
          <label htmlFor="street" className="font-medium">
            Street:{" "}
          </label>
          <input
            type="text"
            name="street"
            value={locationForm.address.street}
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 sm:px-2 rounded-md sm:ml-3 truncate"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-x-20 sm:items-center p-2">
          <label htmlFor="street" className="font-medium">
            City:{" "}
          </label>
          <input
            type="text"
            name="city"
            value={locationForm.address.city}
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 sm:px-2 rounded-md sm:ml-3 truncate"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-x-16 sm:items-center p-2">
          <label htmlFor="street" className="font-medium">
            District:{" "}
          </label>
          <input
            type="text"
            name="district"
            value={locationForm.address.district}
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 sm:px-2 rounded-md sm:ml-1 truncate"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-x-20 sm:items-center p-2">
          <label htmlFor="street" className="font-medium">
            Zip:{" "}
          </label>
          <input
            type="number"
            name="zip"
            value={locationForm.address.zip}
            onChange={handleChange}
            className="outline-none w-full sm:w-2/3 py-1 sm:px-2 rounded-md sm:ml-5 truncate"
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

export default UpdateLocationInfo;
