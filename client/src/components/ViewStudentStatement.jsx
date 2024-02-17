/* eslint-disable react/prop-types */
function ViewStudentStatement({ user, handlePayFees, student }) {
  return (
    <div className="w-full mx-auto mt-5">
      <div className="mt-3 mx-auto">
        {user?.role === "admin" && (
          <button
            className="text-xl uppercase bg-yellow-500 px-3 py-1 rounded-sm font-medium"
            onClick={handlePayFees}
          >
            Pay Tution Fee
          </button>
        )}
      </div>
      <div className="w-full mt-3">
        <h3 className="uppercase font-medium">Tution Fees:</h3>
        <div className="flex  flex-wrap justify-between items-center gap-x-2">
          {student?.feesHistory?.map((fees) => {
            return (
              <div
                key={fees._id}
                className="w-full sm:w-[49%] shadow-sm border mt-1 flex items-end justify-between"
              >
                <div className="w-full sm:w-1/2 p-2 text-center font-medium text-lg">
                  {fees.month.slice(0, 3)} - {fees.year}
                </div>
                <div className="bg-green-500 w-full sm:w-1/2 p-2 text-center font-semibold text-lg">
                  {student.tution_fees}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewStudentStatement;
