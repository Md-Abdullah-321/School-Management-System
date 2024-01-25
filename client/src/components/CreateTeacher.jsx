/* eslint-disable react/jsx-key */
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { storage } from "../firebase";

const init = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  subject: [],
  image: "",
  salary: 0,
  password: "12345678",
};
function CreateTeacher() {
  const [subject, setSubject] = useState([1]);
  const [formData, setFormData] = useState({ ...init });

  const handleAddSubject = () => {
    if (subject.length <= 3) {
      setSubject((prev) => [...prev, 1]);
    }
  };

  const handleChange = (e, index) => {
    if (e.target.name === "subject") {
      setFormData((prev) => {
        if (!prev.subject[index]) {
          prev.subject[index] = "";
        }
        prev.subject.splice(index, 1, e.target.value);
        return {
          ...prev,
        };
      });
    } else if (e.target.name === "image") {
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

    if (!formData.image) return;
    const imageRef = ref(
      storage,
      `images/teacher/${formData.image.name + Date.now()}`
    );
    uploadBytes(imageRef, formData.image)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then(async (downloadURL) => {
        setFormData((prev) => {
          return {
            ...prev,
            image: downloadURL,
          };
        });

        const res = await fetch(
          "https://creepy-duck-glasses.cyclic.app/api/teacher",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phoneNumber: formData.phoneNumber,
              subjects: formData.subject,
              address: {
                street: formData.street,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
              },
              password: formData.password,
              salary: formData.salary,
              picture: formData.image,
            }),
          }
        );

        const data = await res.json();
        console.log(data);
      });
  };

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
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange(e)}
              className="w-6/12 outline-none bg-gray-100 p-1"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange(e)}
              className="w-6/12 outline-none bg-gray-100 p-1"
              placeholder="Last Name"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              className="w-6/12 outline-none bg-gray-100 p-1"
              placeholder="Email"
            />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleChange(e)}
              className="w-6/12 outline-none bg-gray-100 p-1"
              placeholder="Phone Number"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-1">
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={(e) => handleChange(e)}
              className="w-3/12 outline-none bg-gray-100 p-1"
              placeholder="Street"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) => handleChange(e)}
              className="w-3/12 outline-none bg-gray-100 p-1"
              placeholder="City"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={(e) => handleChange(e)}
              className="w-3/12 outline-none bg-gray-100 p-1"
              placeholder="State"
            />
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={(e) => handleChange(e)}
              className="w-3/12 outline-none bg-gray-100 p-1"
              placeholder="Zip"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-1">
            {subject?.map((_, index) => {
              return (
                <div className="flex w-6/12  items-center gap-1">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject[index]}
                    onChange={(e) => handleChange(e, index)}
                    className="outline-none bg-gray-100 p-1 w-full"
                    placeholder="Subject"
                  />
                  {index === subject.length - 1 && index < 3 && (
                    <GoPlus
                      className="border-4 w-6 h-6 rounded-full cursor-pointer"
                      onClick={handleAddSubject}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-1 w-full">
            <input
              className="w-6/12 outline-none bg-gray-100 p-1"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              name="salary"
              placeholder="Salary"
            />
            <input
              className="w-6/12 outline-none bg-gray-100 p-1"
              type="file"
              value={formData.file}
              onChange={handleChange}
              name="image"
            />
          </div>

          <div className="w-full flex justify-center items-center">
            <button className="bg-yellow-500 w-1/2 uppercase rounded-sm hover:shadow-lg cursor-pointer">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTeacher;