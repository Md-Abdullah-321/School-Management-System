import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function DeleteModal({ type, name, setModal, id }) {
  const navigate = useNavigate();
  const handleNotDelete = () => {
    setModal(false);
  };

  const handleDelete = async () => {
    try {
      setModal(false);
      const res = await fetch(
        type === "teacher"
          ? `https://creepy-duck-glasses.cyclic.app/api/teacher/${id}`
          : `https://creepy-duck-glasses.cyclic.app/api/student/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        const data = await res.json();
        alert(data.messege);
        if (type === "teacher") {
          navigate("/admin/teacher");
        } else {
          navigate("/admin/classes");
        }
      } else {
        console.error(`Error: ${res.status} - ${res.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <div className="fixed left-0 right-0 bottom-0 top-0 bg-white opacity-85"></div>
      <div className="fixed bg-yellow-500 p-4 shadow-md rounded-md">
        <p className="text-sm uppercase">
          Are you sure to delete <span className="font-medium">`{name}`</span> ?
        </p>
        <div className="flex items-center gap-x-2 mt-1">
          <button
            className="bg-green-500 text-xs uppercase py-0.5 px-2 hover:shadow-lg rounded-sm font-medium"
            onClick={handleNotDelete}
          >
            No
          </button>
          <button
            className="bg-red-500 text-xs uppercase py-0.5 px-2 rounded-sm hover:shadow-lg font-medium"
            onClick={handleDelete}
          >
            Yes
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
