/* eslint-disable react/prop-types */
function ViewTeacherAttendence({ teacher }) {
  return (
    <div className="w-full mx-auto mt-5">
      <table className="w-full border-2 border-yellow-500">
        <thead className="w-full">
          <tr className="w-full bg-yellow-500 rounded-sm uppercase text-xs">
            <th className="w-1/4">Year</th>
            <th className="w-1/4">Month</th>
            <th className="w-1/4">Day</th>
            <th className="w-1/4">Status</th>
          </tr>
        </thead>
        <tbody className="w-full text-xs">
          {teacher?.attendance?.map((attendance, index) => {
            return (
              <tr
                key={attendance._id}
                className={
                  index % 2 === 1
                    ? "w-full text-center bg-yellow-200"
                    : "w-full text-center"
                }
              >
                <td className="w-1/4">{attendance.year}</td>
                <td className="w-1/4">{attendance.month}</td>
                <td className="w-1/4">{attendance.day}</td>
                <td className="w-1/4">{attendance.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTeacherAttendence;
