import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewStudent() {
  const id = useParams().id;
  const [student, setStudent] = useState({});

  const fetchTeacher = async () => {
    const res = await fetch(
      `https://creepy-duck-glasses.cyclic.app/api/student/${id}`
    );
    const data = await res.json();
    setStudent({ ...data.payload });
  };
  useEffect(() => {
    fetchTeacher();
  }, []);
  console.log(student);
  return <div>Hi</div>;
}

export default ViewStudent;
