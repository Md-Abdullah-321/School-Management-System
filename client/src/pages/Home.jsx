import { useSelector } from "react-redux";

function Home() {
  // Use the useSelector hook to get data from the Redux store
  const { backgroundImage, name, logo } = useSelector((state) => state.home);

  // Check if backgroundImage is available before setting it in the style
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <div className="w-full">
      {/* Hero section  */}
      <div style={backgroundStyle} className="w-full h-screen">
        <div className="w-full h-full bg-slate-900 opacity-80 flex items-center">
          <div className="w-full p-10">
            <h5 className="text-yellow-500 text-5xl font-semibold">
              Welcome To
            </h5>
            <h1 className="text-white text-7xl font-bold">{name}</h1>
          </div>
        </div>
      </div>

      {/* messages and notice  */}
      <div className="h-screen w-full flex justify-around items-center">
        <div className="w-2/5 h-5/6 shadow-lg p-5 border-b-4 border-yellow-500 rounded-md flex flex-col items-center justify-center">
          {/* image */}
          <div className="flex justify-center items-center">
            <img
              className="w-24 h-24 shadow-md rounded-full"
              src={logo}
              alt="Image Loading..."
            />
          </div>
          {/* message */}
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
              However, we have to aim to be not only the leading institution for
              knowledge-dispersion, but also world class leader in
              knowledge-creation. We have always had students and faculty
              members who are capable of doing world class research, as is
              evident by the placement of our alumni in various positions in
              renowned universities and industries of the world.
            </p>
            <h3 className="text-center mt-5 font-semibold text-xl">
              -Md Abdullah-
            </h3>
            <p className="text-center text-yellow-500 font-semibold text-xl">
              Software Engineer
            </p>
          </div>
        </div>
        <div className="w-2/5 shadow-lg p-5 border-t-4 border-yellow-500 rounded-md h-5/6">
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
    </div>
  );
}

export default Home;
