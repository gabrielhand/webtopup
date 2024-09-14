import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

const BannerMe = ({ user }) => {
  const { bannerDbUser } = useOutletContext();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <img
        id="bannerMe"
        src={bannerDbUser}
        alt="Banner-Me"
        loading="lazy"
        className="absolute object-cover object-center w-full h-full"
      />
      {/* <div className="absolute bg-black/30 inset-0"></div> */}
      <div className="absolute bg-[#242429] min-h-[35%] flex flex-col gap-y-1 w-full text-white px-6 bottom-0 left-0 right-0">
        <div className="flex flex-row w-full lg:gap-x-6 md:gap-x-6 gap-x-3">
          <div>
            {user ? (
              <div className="relative aspect-square rounded-full bg-white overflow-hidden flex lg:flex-none md:flex-none flex-none z-20 -top-14 md:w-44 w-32 h-full">
                <img
                  src={user.image ? user.image : "https://picsum.photos/200"}
                  alt={`Gambar-${user.username}`}
                  className={`object-cover ${
                    !imageLoaded ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={handleImageLoad}
                  style={{ display: imageLoaded ? "block" : "none" }}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                    <p className="text-black">Loading...</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative aspect-square rounded-full bg-white/50 overflow-hidden flex lg:flex-none md:flex-none flex-none z-20 -top-14 md:w-44 w-32 h-full">
                <p className="text-black">Loading...</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-3 justify-start items-start py-3">
            <p className="lg:text-3xl md:text-2xl text-xl font-semibold">
              {user.username}
            </p>
            <div className="lg:text-base md:text-base text-sm font-light px-4 py-2 text-blue-500 border border-blue-500 rounded-xl">
              {user.role}
            </div>
          </div>
          <div className="flex flex-col w-full justify-center items-end">
            <div className="flex flex-col justify-between gap-1 rounded-xl bg-gradient-to-bl from-white to-yellow-500 p-3 min-w-44 min-h-24">
              <div className="flex flex-row justify-end">
                <div className="flex-1 text-zinc-800 text-xs mr-2">
                  Saldo kamu
                </div>
                <div className="bg-red-600/50 rounded-full p-3 -mr-2"></div>
                <div className="bg-orange-600/50 rounded-full p-3"></div>
              </div>
              <div className="flex flex-row gap-1">
                <p className="text-sm text-black font-medium">Rp </p>
                <div className="lg:text-3xl md:text-2xl text-xl text-black font-medium mr-4">
                  {user.balance.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

BannerMe.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }),
};

export default BannerMe;
