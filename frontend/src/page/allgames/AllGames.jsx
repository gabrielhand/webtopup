import { useOutletContext } from "react-router-dom";
import AllGamesComponent from "../../components/allgames/AllGames";
import { useEffect, useState } from "react";

const AllGames = () => {
  const { bannerAllGames } = useOutletContext();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="flex flex-col lg:gap-y-6 md:gap-y-6 gap-y-4 lg:px-16 md:px-10 px-4 py-6">
      <div className="relative rounded-xl w-full min-h-72 overflow-hidden">
        <img
          id="bannerAllGames"
          src={bannerAllGames}
          alt="Banner-AllGames"
          loading="lazy"
          className="absolute object-cover object-top inset-0 w-full h-full"
        />
        <div className="absolute bg-black/30 inset-0"></div>
        <div
          className={`absolute bg-black/60 flex flex-col gap-y-1 w-full text-white p-6 bottom-0 transform transition-transform duration-700 ease-in-out ${
            animate ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <p className="lg:text-3xl md:text-2xl text-xl font-medium">Semua Games</p>
          <p className="lg:text-base md:text-sm text-xs font-light">
            Semua kategori yang ada di website kami!
          </p>
        </div>
      </div>
      <AllGamesComponent />
    </div>
  );
};

export default AllGames;
