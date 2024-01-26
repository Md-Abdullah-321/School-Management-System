import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { getCurrentDate } from "../helper/getCurrentDate";

const init = {
  studentName: "",
  fathersName: "",
  mothersName: "",
  phoneNumber: "",
  className: "",
  dateOfBirth: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  image: "",
  tution_fees: 0,
  admissionDate: getCurrentDate(),
};
function CreateStudent() {
  const [formData, setFormData] = useState({ ...init });
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData((prev) => {
        return {
          ...prev,
          image: e.target.files[0],
        };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageRef = ref(
        storage,
        `images/teacher/${formData.image.name + Date.now()}`
      );
      const snapshot = await uploadBytes(imageRef, formData.image);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const response = await fetch(
        "https://creepy-duck-glasses.cyclic.app/api/student",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentName: formData.studentName,
            fathersName: formData.fathersName,
            mothersName: formData.mothersName,
            phoneNumber: formData.phoneNumber,
            className: formData.className,
            dateOfBirth: formData.dateOfBirth,
            address: {
              street: formData.street,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
            },
            image: downloadURL,
            tution_fees: formData.tution_fees,
            admissionDate: formData.admissionDate,
          }),
        }
      );

      const data = await response.json();
      alert(data.messege);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  useEffect(() => {
    if (!user.firstName) {
      navigate("/admin/login");
    }
    if (user.role !== "admin") {
      navigate("/admin");
      alert("You must be an admin to access this resource");
    }
  }, []);

  console.log(formData);
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-11/12 sm:w-1/2 shadow-lg">
        <form
          method="post"
          className="p-3 flex flex-col gap-1"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-1">
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={(e) => handleChange(e)}
              className="w-full sm:w-6/12 outline-none bg-gray-100 p-1"
              placeholder="Student Name"
            />
            <input
              type="text"
              name="fathersName"
              value={formData.fathersName}
              onChange={(e) => handleChange(e)}
              className="w-full sm:w-6/12 outline-none bg-gray-100 p-1"
              placeholder="Father's Name"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-1">
            <input
              type="text"
              name="mothersName"
              value={formData.mothersName}
              onChange={(e) => handleChange(e)}
              className="w-full sm:w-6/12 outline-none bg-gray-100 p-1"
              placeholder="Mother's Name"
            />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleChange(e)}
              className="w-full sm:w-6/12 outline-none bg-gray-100 p-1"
              placeholder="Phone Number"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-1">
            <select
              name="className"
              className="w-full sm:w-6/12 outline-none bg-gray-100 p-1"
              value={formData.className}
              onChange={(e) => handleChange(e)}
            >
              <option value="Play">Play</option>
              <option value="Narsary">Narsary</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
              <option value="Four">Four</option>
              <option value="Five">Five</option>
            </select>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange(e)}
              className="w-full sm:w-6/12 outline-none bg-gray-100 p-1"
              placeholder="Phone Number"
            />
          </div>
          <br />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-1">
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={(e) => handleChange(e)}
              className="w-full sm:w-3/12 outline-none bg-gray-100 p-1"
              placeholder="Street"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) => handleChange(e)}
              className="w-full sm:w-3/12 outline-none bg-gray-100 p-1"
              placeholder="City"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={(e) => handleChange(e)}
              className="w-full sm:w-3/12 outline-none bg-gray-100 p-1"
              placeholder="State"
            />
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={(e) => handleChange(e)}
              className="w-full sm:w-3/12 outline-none bg-gray-100 p-1"
              placeholder="Zip"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-1">
            <input
              type="number"
              name="tution_fees"
              value={formData.tution_fees}
              onChange={(e) => handleChange(e)}
              className="w-full sm:w-6/12 outline-none bg-gray-100 p-1"
              placeholder="Student Name"
            />
            <input
              type="file"
              name="image"
              onChange={(e) => handleChange(e)}
              className="w-full sm:w-6/12 outline-none bg-gray-100 p-1"
            />
          </div>

          <div className="w-full flex justify-center items-center mt-5 sm:mt-0">
            <button className="bg-yellow-500 w-2/3 sm:w-1/2 uppercase rounded-sm hover:shadow-lg cursor-pointer">
              Admit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
