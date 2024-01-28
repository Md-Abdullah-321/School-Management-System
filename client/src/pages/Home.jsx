import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Teachers from "./Dashboard/Teachers";

function Home() {
  // Use the useSelector hook to get data from the Redux store
  const { backgroundImage, name, logo } = useSelector(
    (state) => state.sitesettingsinfo.siteInfo
  );

  // Check if backgroundImage is available before setting it in the style
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <div className="w-full mx-auto">
      {/* Hero section  */}
      <div style={backgroundStyle} className="w-full bg-cover sm:h-screen">
        <div className="w-full h-full bg-slate-900 opacity-80 flex items-center ">
          <div className="w-full p-10">
            <h5
              className="text-yellow-500
            text-3xl sm:text-5xl font-semibold"
            >
              Welcome To
            </h5>
            <h1
              className="text-white
            text-4xl sm:text-7xl font-bold"
            >
              {name}
            </h1>
          </div>
        </div>
      </div>

      {/* messages and notice  */}
      <div className="h-screen w-full flex flex-col md:flex-row justify-around items-center bg-slate-100">
        <div className="md:w-2/5 mt-4 md:mt-0 md:h-5/6 shadow-lg p-5 border-b-4 border-yellow-500 rounded-md flex flex-col items-center justify-center bg-white">
          {/* image */}
          <div className="flex justify-center items-center">
            <img
              className="w-24 h-24 shadow-md rounded-full"
              src={logo}
              alt="Image Loading..."
            />
          </div>
          {/* message*/}
          <div className="mt-4">
            <p className="text-xs p-2">
              Dhaka University of Engineering &amp; Technology (DUET), Gazipur,
              being an excellent tertiary and higher-level academic institution
              with its commitment to quality education and advanced level of
              research, has earned excellent reputation in producing quality
              graduates in various fields of engineering and science. The
              university is one of the important component in Bangladesh to the
              reflection of the country’s national aspiration and dream. It is
              expected that this renowned academic institution will work towards
              producing the quality graduates who will dedicate themselves to
              make the country great by braving the challenges of the century.
              DUET is also known worldwide for its stellar learning performance.
            </p>
            <h3 className="text-center mt-5 font-semibold text-xl">
              -Md Abdullah-
            </h3>
            <p className="text-center text-yellow-500 font-semibold text-xl">
              Software Engineer
            </p>
          </div>
        </div>
        <div className="w-full md:w-2/5 mt-5 md:mt-0 shadow-lg p-5 border-t-4 border-yellow-500 rounded-md h-5/6 bg-white">
          <h2 className="text-center text-xl font-semibold mb-5">Notice</h2>

          <div className="flex gap-5">
            <div className="w-1/6 text-center">
              <div className="bg-gray-100 p-1 text-yellow-500 font-semibold">
                04 JAN
              </div>
              <div className="bg-yellow-500 p-1 text-white font-semibold">
                2024
              </div>
            </div>
            <div className="w-4/6">
              <div className="p-1 font-semibold text-gray-500">Notice name</div>
              <div className="p-1 font-semibold">Link</div>
            </div>
          </div>
        </div>
      </div>

      {/* about section  */}
      <div className="w-full md:h-screen mt-32">
        <div className="flex w-full flex-col md:flex-row h-full justify-around items-center">
          {/* about text  */}
          <div className="md:w-2/5 md:h-5/6 flex flex-col justify-center p-5 md:p-0">
            <h1 className="text-3xl font-semibold">About Us</h1>
            <p className="">{name}</p>
            <p className="text-sm text-gray-800 mt-5">
              Dhaka University of Engineering & Technology (DUET), Gazipur was
              founded as the College of Engineering, Dhaka with the motto
              “Technology is the Advancement” at its temporary campus at
              Tejgaon, Dhaka, Bangladesh in 1980. It was then renamed as Dhaka
              Engineering College (DEC) under the University of Dhaka in 1981,
              and used to offer Bachelor of Engineering programs in Civil,
              Electrical, and Mechanical disciplines. With the passage of time,
              Dhaka Engineering College was empowered autonomy under the
              Bangladesh Institute of Technology ordinance no. XXI of 1986,
              under the name Bangladesh Institute of Technology, Dhaka
              (Abbreviated as BITD) to award undergraduate and postgraduate
              degrees. Hence September 1, 2003 became a historic{" "}
            </p>
            <NavLink to="/about">
              <button className="bg-yellow-500 py-1 px-2 rounded-sm mt-5 cursor-pointer text-white font-semibold">
                READ MORE
              </button>
            </NavLink>
          </div>
          {/* images  */}
          <div className="md:w-2/5 md:h-5/6 flex flex-col justify-center items-center p-5 md:p-5">
            <div className="w-40 h-40 bg-yellow-500 ml-40"></div>
            <div className="w-40 h-40 bg-red-500 mr-20"></div>
            <div className="w-40 h-40 bg-blue-500 ml-40"></div>
          </div>
        </div>
      </div>

      <Teachers />

      {/* location  */}
      <div className="flex flex-col md:flex-row justify-around items-center gap-4 md:h-80">
        {/* left side  */}
        <div className="w-full md:w-2/5 p-5 md:p-0">
          <div className="w-full">
            <h1 className="text-3xl font-semibold">Contact</h1>
            <ul>
              <li>
                <span className="font-semibold">Website:</span>{" "}
                <a
                  className="underline"
                  href="https://creepy-duck-glasses.cyclic.app/"
                >
                  {name}
                </a>
              </li>
              <li>
                <span className="font-semibold">Mobile:</span> +880 16457 39121
              </li>
              <li>
                <span className="font-semibold">WhatsApp:</span> +880 17800
                73651
              </li>
              <li>
                <span className="font-semibold">E-Mail:</span>{" "}
                abdullah.dev.it@gmail.com
              </li>
              <li>
                <span className="font-semibold">Address:</span> Thanapara,
                Tangail, 1900
              </li>
            </ul>
          </div>
        </div>
        {/* right side  */}
        {/* <div className="w-2/5"> */}
        <div className=" w-full p-3 md:p-0 md:w-2/5 h-40 rounded-md m-5">
          <iframe
            className="w-full h-full rounded-md"
            src="https://www.google.com/maps/embed?pb=!4v1705479286115!6m8!1m7!1sOQjHQQsKxUVBfSopYrb3sA!2m2!1d24.24195897481565!2d89.9169039670362!3f105.55959168835903!4f0!5f0.7820865974627469"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Home;
