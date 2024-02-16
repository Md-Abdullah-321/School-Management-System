// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { useSelector } from "react-redux";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export function HeroSlider() {
  const siteInfo = useSelector((state) => state.sitesettingsinfo.siteInfo);
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {siteInfo?.backgroundImage?.length > 0 &&
          siteInfo?.backgroundImage?.map((url, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="w-full h-60 sm:h-96 md:h-[550px] flex items-center bg-slate-900"
                >
                  <div className="w-full h-full bg-slate-900 opacity-70 flex items-center ">
                    <div className="ml-16">
                      <p className="text-white font-semibold text-lg sm:text-3xl uppercase">
                        Welcome to
                      </p>
                      <p className="text-yellow-500 font-semibold uppercase sm:text-5xl text-xl w-5/6 sm:w-full ">
                        {siteInfo.name}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
