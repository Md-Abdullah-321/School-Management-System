import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLastFiveYears } from "../helper/getLastFiveYears";

const init = {
  year: null,
  month: null,
  salary: null,
  paid: true,
};
function Pay() {
  const [formData, setFormData] = useState({ ...init });
  const id = useParams().id;
  const lastFiveYears = getLastFiveYears();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fetchTeacher = async () => {
    const res = await fetch(
      `https://creepy-duck-glasses.cyclic.app/api/teacher/${id}`
    );

    const data = await res.json();

    setFormData((prev) => ({ ...prev, salary: data.payload.salary }));
  };

  const paySalary = async () => {
    const res = await fetch(
      `https://creepy-duck-glasses.cyclic.app/api/teacher/pay/${id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: formData.year,
          month: formData.month,
          amount: parseInt(formData.salary),
          paid: true,
        }),
      }
    );

    const data = await res.json();

    alert(data.messege);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.year || !formData.month || !formData.salary) {
      return alert("Please, fill all the input field.");
    }

    await paySalary();
  };
  useEffect(() => {
    fetchTeacher();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-11/12 sm:w-9/12 md:w-6/12">
        <form className="w-full bg-yellow-500 p-2 rounded-md">
          <h2 className="text-center my-3 uppercase font-semibold text-2xl text-white">
            Pay Salary
          </h2>
          <div className="flex flex-col sm:flex-row gap-x-2 justify-between">
            <label htmlFor="year" className="font-medium">
              Select Year:{" "}
            </label>
            <select
              name="year"
              onChange={handleChange}
              className="sm:w-2/3 outline-none p-1 border-none bg-white rounded-sm"
            >
              <option value="">select year</option>
              {lastFiveYears.map((year, index) => (
                <option value={year} key={index}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-x-2 mt-2 justify-between">
            <label htmlFor="year" className="font-medium">
              Select Month:{" "}
            </label>
            <select
              name="month"
              onChange={handleChange}
              className="sm:w-2/3 outline-none p-1 border-none bg-white rounded-sm"
            >
              <option value="">select month</option>
              {months.map((month, index) => (
                <option value={month} key={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-x-2 mt-2 justify-between">
            <label htmlFor="year" className="font-medium">
              Salary:{" "}
            </label>
            <input
              type="number"
              className="sm:w-2/3 px-1 rounded-sm outline-none"
              name="salary"
              onChange={handleChange}
              value={formData.salary}
            />
          </div>

          <button
            className="bg-yellow-300 w-full mt-4 rounded-sm uppercase text-sm p-1 font-medium hover:shadow-lg"
            onClick={handleSubmit}
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pay;
