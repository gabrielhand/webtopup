import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const [populers, setPopuler] = useState([]);

  const getPopuler = async () => {
    const response = await axios.get("http://localhost:5000/kategoripopuler");
    setPopuler(response.data);
  };

  useEffect(() => {
    getPopuler();
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-2xl text-black dark:text-white font-medium">
        🔥 Populer
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-2">
        {populers.map((populer, index) => (
          <Link
          to={`/order/${populer.kode}`}
            key={index}
            className="relative rounded-lg flex p-2 h-24 overflow-hidden shadow-lg hover:outline hover:outline-2 hover:outline-[#4169e1] hover:outline-offset-2 duration-100"
          >
            <div
              className="absolute inset-0 bg-cover bg-center blur-sm"
              style={{ backgroundImage: `url(${populer.bannerlayanan})` }}
            ></div>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="z-10 flex flex-row items-center gap-x-2">
              <img
                src={populer.thumbnail}
                loading="lazy"
                className="rounded-lg max-w-20 h-full"
              />
              <p className="text-white font-medium">{populer.nama}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
