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
              <div className="relative aspect-square rounded-full bg-white overflow-hidden flex lg:flex-none md:flex-none flex-none z-20 -top-14 lg:w-36 w-32">
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
          <div className="flex flex-col gap-y-2 justify-start items-start py-3">
            <p className="lg:text-3xl md:text-2xl text-xl font-semibold">
              {user.username}
            </p>
            <div className="lg:text-base md:text-base text-sm font-light lg:px-4 px-3 py-1.5 text-yellow-500 border border-yellow-500 rounded-lg">
              {user.role}
            </div>
          </div>
          <div className="flex flex-col w-full justify-center items-end">
            <div className="flex flex-col gap-y-3">
              <p className="flex flex-row justify-end text-xs text-zinc-300">Saldo Kamu</p>
              <div className="flex flex-row justify-between gap-1">
                <p className="lg:text-sm text-xs text-white font-medium">Rp </p>
                <div className="lg:text-3xl md:text-2xl text-xl text-white font-medium">
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
