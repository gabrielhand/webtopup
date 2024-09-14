// import { Link } from "react-router-dom";
import AllGames from "../../components/allgames/AllGames";
import BestSeller from "../../components/bestseller/BestSeller";
import Swiper from "../../components/swiper/Swiper";

const Home = () => {
  return (
    <div className="flex flex-col lg:gap-y-6 md:gap-y-6 gap-y-4">
      <div className="bg-gradient-to-b from-blue-800/10 dark:from-black to-[#4169e1]/80 dark:to-[#4169e1]/40 px-16 py-10">
        <Swiper />
      </div>
      <div className="lg:px-16 md:px-10 px-4">
        <BestSeller />
      </div>
      <div className="lg:px-16 md:px-10 px-4">
        <AllGames />
      </div>
    </div>
  );
};

export default Home;
