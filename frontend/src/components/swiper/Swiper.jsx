import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./swiper.css";
import { useEffect, useState } from "react";
import axios from "axios";

const MySwiper = () => {
  const [swipers, setSwiper] = useState([]);
  const desiredSlideCount = 5;

  const getSwiper = async () => {
    const response = await axios.get("http://localhost:5000/berita/swiper");
    let data = response.data;

    while (data.length < desiredSlideCount) {
      data = [...data, ...response.data];
    }

    if (data.length > desiredSlideCount) {
      data = data.slice(0, desiredSlideCount);
    }

    setSwiper(data);
  };

  useEffect(() => {
    getSwiper();
  }, []);

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      loop={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
      }}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
      }}
      modules={[EffectCoverflow, Pagination]}
      className="swiper_container"
    >
      {swipers.map((swiper, index) => (
        <SwiperSlide  key={index}>
          <img src={swiper.path} loading="lazy" alt={`Slide ${index}`}/>
        </SwiperSlide>
      ))}
      <div className="slider-controller">
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  );
};

export default MySwiper;
