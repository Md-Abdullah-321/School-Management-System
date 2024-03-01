import { useEffect, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { HeroSlider } from "../components/HeroSlider";

function Home() {
  const [Info, setInfo] = useState({});
  const [locationInfo, setLocationInfo] = useState({});
  const [notices, setNotices] = useState([]);
  const { siteInfo, location } = useSelector((state) => state.sitesettingsinfo);

  const fetchNotices = async () => {
    const response = await fetch(
      "https://creepy-duck-glasses.cyclic.app/api/site/notice"
    );
    const data = await response.json();
    setNotices(data.payload);
  };
  useEffect(() => {
    setInfo({ ...siteInfo });
    setLocationInfo({ ...location });
    fetchNotices();
  }, []);
  // const backgroundStyle = Info.backgroundImage
  //   ? { backgroundImage: `url(${Info.backgroundImage})` }
  //   : {};

  return (
    <div className="w-full mx-auto">
      {/* Hero section  */}
      <HeroSlider />
      {/* messages and notice  */}
      <div className="h-screen w-full flex flex-col md:flex-row justify-around items-center bg-slate-100 mt-20 sm:mt-0">
        <div className="md:w-2/5 mt-4 md:mt-0 md:h-5/6 shadow-lg p-5 border-b-4 border-yellow-500 rounded-md flex flex-col items-center justify-center bg-white">
          {/* image */}
          <div className="flex justify-center items-center">
            <img
              className="w-24 h-24 shadow-md rounded-full"
              src={Info?.logo}
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

          {notices?.map((notice, index) => {
            return (
              <div className="flex gap-5 mt-1" key={index}>
                <div className="w-1/6 text-center">
                  <div className="bg-gray-100 p-1 text-yellow-500 font-medium uppercase text-xs">
                    {(notice.date < 10 ? "0" + notice.date : notice.date) +
                      " " +
                      notice.month}
                  </div>
                  <div className="bg-yellow-500 p-1 text-white font-semibold text-xs">
                    {notice.year}
                  </div>
                </div>
                <div className="w-4/6">
                  <div className="p-1 font-semibold text-gray-900 text-xs">
                    {notice.title}
                  </div>
                  <div className="p-1 font-light flex gap-x-1 items-center hover:bg-gray-200">
                    <IoCloudDownloadOutline />
                    <a
                      className="text-xs"
                      href={notice.url}
                      download={`${notice.title}.pdf`}
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* about section  */}
      <div className="w-full md:h-screen mt-32">
        <div className="flex w-full flex-col md:flex-row h-full justify-around items-center">
          {/* about text  */}
          <div className="md:w-2/5 md:h-5/6 flex flex-col justify-center p-5 md:p-0">
            <h1 className="text-3xl font-semibold">About Us</h1>
            <p className="">{Info?.name}</p>
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

      {/* location  */}
      <div className="flex flex-col md:flex-row justify-around items-center gap-4 md:h-80 bg-slate-100">
        {/* left side  */}
        <div className="w-full md:w-2/5 p-5 md:p-0">
          <div className="w-full">
            <h1 className="text-3xl font-semibold">Contact</h1>
            <ul>
              <li>
                <span className="font-semibold">Website:</span>{" "}
                <a className="underline" href={locationInfo.website}>
                  {Info?.name}
                </a>
              </li>
              <li>
                <span className="font-semibold">Mobile:</span> +88{" "}
                {locationInfo.phone}
              </li>
              <li>
                <span className="font-semibold">WhatsApp:</span> +88{" "}
                {location.whatsApp}
              </li>
              <li>
                <span className="font-semibold">E-Mail:</span> {location.email}
              </li>
              <li>
                <span className="font-semibold">Address:</span>{" "}
                {location.address.street}, {location.address.city},{" "}
                {location.address.zip}
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
