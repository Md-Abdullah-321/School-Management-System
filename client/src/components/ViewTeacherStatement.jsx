/* eslint-disable react/prop-types */
function ViewTeacherStatement({ teacher, user, handleNavigate }) {
  return (
    <div className="w-full mx-auto flex flex-col justify-center items-center p-2">
      <div className="mt-3" onClick={handleNavigate}>
        {user.role === "admin" && (
          <button className="text-xl uppercase bg-yellow-500 px-3 py-1 rounded-sm font-medium">
            Pay Salary
          </button>
        )}
      </div>
      <div className="w-full flex flex-wrap justify-between items-center gap-x-2 mx-auto">
        {teacher?.paymentHistory?.map((salary) => {
          const salaryStyle = salary.paid
            ? "bg-green-500 w-1/2 p-2 text-center font-semibold text-lg"
            : "bg-red-500 w-1/2 p-2 text-center font-semibold text-lg";
          return (
            <div
              key={salary._id}
              className="w-full sm:w-[49%] shadow-sm border p-2 mt-1 flex items-end justify-between"
            >
              <div className="sm:w-1/2 p-2 text-center font-medium text-lg">
                {salary.month.slice(0, 3)} - {salary.year}
              </div>
              <div className={salaryStyle}>{salary.amount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewTeacherStatement;
