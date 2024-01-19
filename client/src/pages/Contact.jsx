import { useState } from "react";

const init = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
};
function Contact() {
  const [formData, setFormData] = useState({ ...init });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.name &&
      formData.email &&
      formData.phoneNumber &&
      formData.message
    ) {
      try {
        setLoading(true);
        const res = await fetch(
          "https://creepy-duck-glasses.cyclic.app/api/message",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await res.json();
        if (data.success) {
          setLoading(false);
        }
        alert(data.messege);
      } catch (error) {
        console.log(error);
        alert("Could not send message");
      }
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col p-5 shadow-xl w-full md:w-1/3">
        <h1 className="text-center font-semibold text-4xl my-2 ">Contact Us</h1>

        <form method="post" className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            placeholder="Name"
            className="p-1 mb-1 font-semibold outline-none bg-gray-100 rounded-sm shadow-md"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            className="p-1 mb-1 font-semibold outline-none bg-gray-100 rounded-sm shadow-md"
          />
          <input
            type="number"
            name="phoneNumber"
            value={formData.phone}
            onChange={(e) => handleChange(e)}
            placeholder="Phone Number"
            className="p-1 mb-1 font-semibold outline-none bg-gray-100 rounded-sm shadow-md"
          />
          <textarea
            name="message"
            cols="30"
            rows="5"
            placeholder="Message"
            value={formData.message}
            onChange={(e) => handleChange(e)}
            className="p-1 mb-1 font-semibold outline-none bg-gray-100 rounded-sm shadow-md"
          />

          <button
            disabled={loading}
            type="submit"
            className="text-md uppercase bg-yellow-500 mt-1 p-1 rounded-sm shadow-md cursor-pointer"
          >
            send message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
