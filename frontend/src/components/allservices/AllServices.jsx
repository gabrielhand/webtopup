import axios from "axios";
import { useEffect, useState } from "react";
import BtnStatus from "../button/BtnStatus";

const AllServices = ({ searchLayanan, selectedKategori }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get("http://localhost:5000/kategoriforservices");

    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredDataByCategory = selectedKategori !== "Pilih Kategori" ? data.map((tipe) => ({
    ...tipe,
    kategori: tipe.kategori.filter((subKategori) => subKategori.nama === selectedKategori
  ),
  })) : data;

  const filteredData = filteredDataByCategory.map((tipe) => ({
    ...tipe,
    kategori: tipe.kategori.map((subKategori) => ({
      ...subKategori,
      layanans: subKategori.layanans.filter((layanan) =>
        layanan.layanan.toLowerCase().includes(searchLayanan.toLowerCase())
      )
    }))
  }));

  return (
    <div className="shadow-md border border-zinc-300 dark:border-[#4169e1]/30 rounded-xl flex flex-row w-full overflow-hidden pb-2">
      <div className="relative overflow-y-auto table-services scrollbar-none max-h-[40.5rem] w-full">
        <table className="bg-transparent caption-bottom w-full text-start">
          <thead className="bg-[#4169e1] dark:bg-[#2d2d2e]">
            <tr className="text-white border-b dark:border-zinc-600">
              <th className="py-2 text-start px-4 font-medium">Kategori</th>
              <th className="py-2 text-start px-4 font-medium">Layanan</th>
              <th className="py-2 text-start px-4 font-medium">Harga Member</th>
              <th className="py-2 text-start px-4 font-medium">Harga Gold</th>
              <th className="py-2 text-start px-4 font-medium">
                Harga Platinum
              </th>
              <th className="py-2 text-start px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((tipe) =>
              tipe.kategori.map((subKategori) =>
                subKategori.layanans.length > 0 ? (subKategori.layanans.map((layanan) => (
                  <tr
                    key={layanan.id}
                    className="bg-white dark:bg-[#16171a] dark:hover:bg-[#222429] hover:duration-300 border-b border-zinc-300 dark:border-zinc-600"
                  >
                    <td className="py-2 px-4 font-light text-black dark:text-white">
                      {subKategori.nama}
                    </td>
                    <td className="py-2 px-4 font-light text-black dark:text-white">
                      {layanan.layanan}
                    </td>
                    <td className="py-2 px-4 font-light text-black dark:text-white">
                      Rp {layanan.harga_member.toLocaleString("id-ID", {styles: "currency", currency: "IDR"})}
                    </td>
                    <td className="py-2 px-4 font-light text-black dark:text-white">
                      Rp {layanan.harga_gold.toLocaleString("id-ID", {styles: "currency", currency: "IDR"})}
                    </td>
                    <td className="py-2 px-4 font-light text-black dark:text-white">
                      Rp {layanan.harga_platinum.toLocaleString("id-ID", {styles: "currency", currency: "IDR"})}
                    </td>
                    <td className="py-2 px-4 font-light text-black dark:text-white">
                      <BtnStatus status={layanan.status} />
                    </td>
                  </tr>
                ))
              ) : null
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllServices;
