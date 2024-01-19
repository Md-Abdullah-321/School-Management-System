import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-extrabold mb-4 text-yellow-500">404</h1>
      <p className="text-2xl font-semibold mb-8">Not Found</p>
      <p className="text-lg max-w-md text-center">
        Oops! It seems like the page you are looking for is lost in the vastness
        of the universe.
      </p>

      <NavLink
        to="/"
        className="text-xl uppercase mt-5 bg-yellow-500 px-2 cursor-pointer shadow-md rounded-sm"
      >
        Back to home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
