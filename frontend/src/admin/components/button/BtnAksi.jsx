import axios from "axios";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const BtnAksi = ({ id, getData, dataTipe }) => {
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [usernameMemberEdit, setUsernameMemberEdit] = useState("");
  const [balanceEdit, setBalanceEdit] = useState("");
  const [roleEdit, setRoleEdit] = useState("");
  const [isMenuRoleOpenEdit, setMenuRoleOpenEdit] = useState(false);

  const [idKategori, setIdKategori] = useState("");
  const [namaKategori, setNamaKategori] = useState("");
  const [namaKategoriEdit, setNamaKategoriEdit] = useState("");
  const [subNamaKategoriEdit, setSubNamaKategoriEdit] = useState("");
  const [brandEdit, setBrandEdit] = useState("");
  const [kodeEdit, setKodeEdit] = useState("");
  const [deskripsiEdit, setDeskripsiEdit] = useState("");
  const [ketLayananEdit, setKetLayananEdit] = useState("");
  const [ketIdEdit, setKetIdEdit] = useState("");
  const [placeholder1Edit, setPlaceholder1Edit] = useState("");
  const [placeholder2Edit, setPlaceholder2Edit] = useState("");
  const [serverEdit, setServerEdit] = useState("");
  const [selectedServerEdit, setSelectedServerEdit] = useState("");
  const [isMenuServerOpenEdit, setMenuServerEditOpen] = useState(false);
  const [populerEdit, setPopulerEdit] = useState("");
  const [selectedPopulerEdit, setSelectedPopulerEdit] = useState("");
  const [isMenuPopulerOpenEdit, setMenuPopulerEditOpen] = useState(false);
  const [tipeEdit, setTipeEdit] = useState([]);
  const [selectedTipeEdit, setSelectedTipeEdit] = useState(null);
  const [isMenuTipeOpenEdit, setMenuTipeEditOpen] = useState(false);
  const [rateMemberEdit, setRateMemberEdit] = useState("");
  const [rateGoldEdit, setRateGoldEdit] = useState("");
  const [ratePlatinumEdit, setRatePlatinumEdit] = useState("");
  const [thumbnailEdit, setThumbnailEdit] = useState(null);
  const [bannerLayananEdit, setBannerLayananEdit] = useState(null);
  const [petunjukEdit, setPetunjukEdit] = useState(null);

  const [namaTipe, setNamaTipe] = useState("");
  const [namaTipeEdit, setNamaTipeEdit] = useState("");

  const modalRef = useRef(null);

  const thumbnailRefEdit = useRef(null);
  const bannerLayananRefEdit = useRef(null);
  const petunjukRefEdit = useRef(null);

  const hapusDataJoki = async () => {
    const response = await axios.delete(
      `http://localhost:5000/datajoki/hapus/${id}`
    );
    getData();
    console.log(response.data.msg);
  };

  const hapusPembelianGiftSkin = async () => {
    const response = await axios.delete(
      `http://localhost:5000/pembelian/giftskin/hapus/${id}`
    );
    getData();
    console.log(response.data.msg);
  };

  const hapusPembelianDmVilog = async () => {
    const response = await axios.delete(
      `http://localhost:5000/pembelian/dmvilog/hapus/${id}`
    );
    getData();
    console.log(response.data.msg);
  };

  const getMemberByIdForEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:5000/users/member/get/${id}`
      );

      setUsername(response.data.username);
      setUsernameMemberEdit(response.data.username);
      setBalanceEdit(response.data.balance);
      setRoleEdit(response.data.role);

      modalRef.current.showModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRoleSelection = (selectedRole) => {
    setRoleEdit(selectedRole);
    setMenuRoleOpenEdit(false);
  };

  const updateMemberByUsernameForEdit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", usernameMemberEdit);
      formData.append("balance", balanceEdit);
      formData.append("role", roleEdit);
      const response = await axios.patch(
        `http://localhost:5000/users/member/update/${username}`,
        formData
      );

      modalRef.current.close();
      getData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const hapusMember = async () => {
    const response = await axios.delete(
      `http://localhost:5000/users/member/delete/${id}`
    );
    getData();
    console.log(response.data.msg);
  };

  const getKategoriByIdForEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:5000/kategoriforadmin/get/${id}`
      );

      setIdKategori(response.data.id);
      setNamaKategori(response.data.nama);
      setNamaKategoriEdit(response.data.nama);
      setSubNamaKategoriEdit(response.data.sub_nama);
      setBrandEdit(response.data.brand);
      setKodeEdit(response.data.kode);
      setDeskripsiEdit(response.data.deskripsi);
      setKetLayananEdit(response.data.ket_layanan);
      setKetIdEdit(response.data.ket_id);
      setPlaceholder1Edit(response.data.placeholder_1);
      setPlaceholder2Edit(response.data.placeholder_2);
      setTipeEdit(response.data.tipe);

      const server = response.data.server_id;
      setServerEdit(
        server === 1
          ? "2. Target ( User ID / Server ID )"
          : server === 0
          ? "1. Target ( User ID )"
          : "3. Target ( Custom via code )"
      );

      setRateMemberEdit(response.data.rate_member);
      setRateGoldEdit(response.data.rate_gold);
      setRatePlatinumEdit(response.data.rate_platinum);

      const populer = response.data.populer;
      setPopulerEdit(populer === 1 ? "Ya" : populer === 0 ? "Tidak" : "");

      setThumbnailEdit(response.data.thumbnail);
      setBannerLayananEdit(response.data.bannerlayanan);
      setPetunjukEdit(response.data.petunjuk);

      modalRef.current.showModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTipeSelection = (selectedTipe) => {
    setSelectedTipeEdit(selectedTipe);
    setMenuTipeEditOpen(false);
  };

  const handlePopulerSelection = (selectedPopuler) => {
    setSelectedPopulerEdit(selectedPopuler);
    setMenuPopulerEditOpen(false);
  };

  const handleServerSelection = (selectedServer) => {
    setSelectedServerEdit(selectedServer);
    setMenuServerEditOpen(false);
  };

  const updateKategoriByIdForEdit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nama", namaKategoriEdit);
      formData.append("sub_nama", subNamaKategoriEdit);
      formData.append("brand", brandEdit);
      formData.append("kode", kodeEdit);
      formData.append("ket_layanan", ketLayananEdit);
      formData.append("ket_id", ketIdEdit);
      formData.append("placeholder_1", placeholder1Edit);
      formData.append("placeholder_2", placeholder2Edit);
      formData.append(
        "server_option",
        selectedServerEdit
          ? selectedServerEdit === "1. Target ( User ID )"
            ? 0
            : selectedServerEdit === "2. Target ( User ID / Server ID )"
            ? 1
            : selectedServerEdit === "3. Target ( Custom via code )"
            ? 0
            : 0
          : serverEdit
          ? serverEdit === "1. Target ( User ID )"
            ? 0
            : serverEdit === "2. Target ( User ID / Server ID )"
            ? 1
            : serverEdit === "3. Target ( Custom via code )"
            ? 0
            : 0
          : 0
      );
      formData.append(
        "tipe_id",
        selectedTipeEdit ? selectedTipeEdit.id : tipeEdit.id
      );
      formData.append("rate_member", rateMemberEdit);
      formData.append("rate_gold", rateGoldEdit);
      formData.append("rate_platinum", ratePlatinumEdit);
      formData.append(
        "populer",
        selectedPopulerEdit
          ? selectedPopulerEdit === "Ya"
            ? 1
            : selectedPopulerEdit === "Tidak"
            ? 0
            : 0
          : populerEdit
          ? populerEdit === "Ya"
            ? 1
            : populerEdit === "Tidak"
            ? 0
            : 0
          : 0
      );
      formData.append("deskripsi", deskripsiEdit);
      formData.append("thumbnail", thumbnailEdit);
      formData.append("bannerlayanan", bannerLayananEdit);
      formData.append("petunjuk", petunjukEdit);
      const response = await axios.patch(
        `http://localhost:5000/kategoriforadmin/update/${idKategori}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      modalRef.current.close();
      getData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const hapusKategori = async () => {
    const response = await axios.delete(
      `http://localhost:5000/kategoriforadmin/delete/${id}`
    );
    getData();
    console.log(response.data.msg);
  };

  const hapusSubKategori = async () => {
    const response = await axios.delete(
      `http://localhost:5000/subkategoriforadmin/delete/${id}`
    );
    getData();
    console.log(response.data.msg);
  };

  const getTipeById = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/tipe/get/${id}`);

      setNamaTipe(response.data.name);
      setNamaTipeEdit(response.data.name);

      modalRef.current.showModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTipe = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:5000/tipe/update/${id}`,
        {
          name: namaTipeEdit,
        }
      );

      console.log(response.data);
      modalRef.current.close();
      getData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const hapusTipe = async () => {
    const response = await axios.delete(
      `http://localhost:5000/tipe/delete/${id}`
    );
    getData();
    console.log(response.data.msg);
  };

  const isPesananJoki = location.pathname === "/pesanan/joki";
  const isPesananGiftSkin = location.pathname === "/pesanan/gift-skin";
  const isPesananDmVilog = location.pathname === "/pesanan/dmvilog";
  const isMemberKelola = location.pathname === "/member/kelola";
  const isProdukKategori = location.pathname === "/produk/kategori";
  const isProdukSubKategori = location.pathname === "/produk/subkategori";
  const isProdukTipe = location.pathname === "/produk/tipe";
  const isProdukLayanan = location.pathname === "/produk/layanan";
  const isProdukVoucher = location.pathname === "/produk/voucher";

  const toggleMenuRoleEdit = () => {
    setMenuRoleOpenEdit(!isMenuRoleOpenEdit);
  };

  const toggleMenuTipeEdit = () => {
    setMenuTipeEditOpen(!isMenuTipeOpenEdit);
  };

  const toggleMenuPopulerEdit = () => {
    setMenuPopulerEditOpen(!isMenuPopulerOpenEdit);
  };

  const toggleMenuServerEdit = () => {
    setMenuServerEditOpen(!isMenuServerOpenEdit);
  };

  return (
    <div className="flex flex-row items-center gap-3">
      {isPesananJoki ||
      isPesananGiftSkin ||
      isPesananDmVilog ||
      isProdukSubKategori ? (
        <div
          onClick={
            isPesananJoki
              ? hapusDataJoki
              : isPesananGiftSkin
              ? hapusPembelianGiftSkin
              : isPesananDmVilog
              ? hapusPembelianDmVilog
              : isProdukSubKategori
              ? hapusSubKategori
              : undefined
          }
          className="flex flex-row px-3 py-1.5 bg-red-500 hover:brightness-75 hover:duration-300 rounded-lg text-white cursor-pointer"
        >
          Hapus
        </div>
      ) : (
        <>
          <div
            onClick={
              isMemberKelola
                ? getMemberByIdForEdit
                : isProdukKategori
                ? getKategoriByIdForEdit
                : isProdukTipe
                ? getTipeById
                : undefined
            }
            className="flex flex-row px-3 py-1.5 bg-yellow-500 hover:brightness-75 hover:duration-300 rounded-lg text-white cursor-pointer"
          >
            Edit
          </div>
          |
          <div
            onClick={
              isMemberKelola
                ? hapusMember
                : isProdukKategori
                ? hapusKategori
                : isProdukTipe
                ? hapusTipe
                : undefined
            }
            className="flex flex-row px-3 py-1.5 bg-red-500 hover:brightness-75 hover:duration-300 rounded-lg text-white cursor-pointer"
          >
            Hapus
          </div>
        </>
      )}

      <dialog ref={modalRef} className="modal p-5 lg:p-0 md:p-2">
        <div
          className={`relative rounded-box w-full ${
            isProdukKategori ? "max-w-3xl" : "max-w-lg"
          } bg-white dark:bg-[#18181a]`}
        >
          <form
            onSubmit={
              isMemberKelola
                ? updateMemberByUsernameForEdit
                : isProdukKategori
                ? updateKategoriByIdForEdit
                : isProdukTipe
                ? updateTipe
                : undefined
            }
            className="flex flex-col gap-y-5"
          >
            <div className="flex flex-row items-center gap-x-3 text-xl ps-6 pl-6 pt-6 pr-6 pe-6">
              <p className="font-semibold text-black dark:text-white">
                {isMemberKelola
                  ? "Edit Member"
                  : isProdukKategori
                  ? "Edit Kategori"
                  : isProdukTipe
                  ? "Edit Tipe"
                  : ""}
              </p>
              <p className="text-zinc-400 dark:text-zinc-500 font-medium italic">
                {isMemberKelola
                  ? username
                  : isProdukKategori
                  ? namaKategori
                  : isProdukTipe
                  ? namaTipe
                  : ""}
              </p>
            </div>
            <div className="flex flex-col max-h-96 overflow-y-auto px-6 py-1">
              {isMemberKelola && (
                <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                  <label
                    htmlFor="usernameMemberEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    id="usernameMemberEdit"
                    type="text"
                    placeholder="Username"
                    value={usernameMemberEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setUsernameMemberEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="balanceMemberEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Balance
                  </label>
                  <input
                    id="balanceMemberEdit"
                    type="text"
                    placeholder="Saldo"
                    value={balanceEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setBalanceEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="role"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Role
                  </label>
                  <div className="relative col-span-2">
                    <div
                      onClick={toggleMenuRoleEdit}
                      className="flex flex-row items-center justify-between gap-3 text-black dark:text-white bg-white dark:bg-[#16171a] p-2.5 rounded-lg focus:outline focus:outline-offset-1 focus:outline-zinc-600 ring-1 ring-zinc-200 dark:ring-zinc-600 cursor-pointer"
                    >
                      {roleEdit}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className={`bi bi-caret-down-fill transform transition-transform duration-100 ${
                          isMenuRoleOpenEdit ? "rotate-180" : "rotate-0"
                        }`}
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                      </svg>
                    </div>
                    {isMenuRoleOpenEdit && (
                      <div className="absolute z-[1] top-12 flex flex-col gap-y-2 bg-white dark:bg-[#16171a] p-2 rounded-lg w-full ring-1 ring-zinc-200 dark:ring-zinc-600">
                        {["Member", "Gold", "Platinum"].map((roleOption) => (
                          <div
                            key={roleOption}
                            onClick={() => handleRoleSelection(roleOption)}
                            className="flex flex-row px-4 py-2 text-black dark:text-white cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:duration-300 rounded-lg z-50"
                          >
                            {roleOption}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {isProdukKategori && (
                <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                  <label
                    htmlFor="namaKategoriEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Nama
                  </label>
                  <input
                    id="namaKategoriEdit"
                    type="text"
                    placeholder="Nama"
                    value={namaKategoriEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setNamaKategoriEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="subNamaEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Sub Nama
                  </label>
                  <input
                    id="subNamaEdit"
                    type="text"
                    placeholder="Sub Nama"
                    value={subNamaKategoriEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setSubNamaKategoriEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="brandEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Brand
                  </label>
                  <input
                    id="brandEdit"
                    type="text"
                    placeholder="Brand"
                    value={brandEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setBrandEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="kodeEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Kode
                  </label>
                  <input
                    id="kodeEdit"
                    type="text"
                    placeholder="Kode"
                    value={kodeEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setKodeEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="deskripsiEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Deskripsi
                  </label>
                  <input
                    id="deskripsiEdit"
                    type="text"
                    placeholder="Deskripsi"
                    value={deskripsiEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setDeskripsiEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="ketLayananEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Keterangan Layanan
                  </label>
                  <input
                    id="ketLayananEdit"
                    type="text"
                    placeholder="Keterangan Layanan"
                    value={ketLayananEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setKetLayananEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="ketIdEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Keterangan ID
                  </label>
                  <input
                    id="ketIdEdit"
                    type="text"
                    placeholder="Keterangan ID"
                    value={ketIdEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setKetIdEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="placeholder1Edit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Placeholder 1
                  </label>
                  <input
                    id="placeholder1Edit"
                    type="text"
                    placeholder="Placeholder 1"
                    value={placeholder1Edit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setPlaceholder1Edit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="placeholder2Edit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Placeholder 2
                  </label>
                  <input
                    id="placeholder2Edit"
                    type="text"
                    placeholder="Placeholder 2"
                    value={placeholder2Edit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setPlaceholder2Edit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="serverEdit"
                    className="col-span-1 flex flex-row pt-2 text-black dark:text-white"
                  >
                    Server Id
                  </label>
                  <div className="relative col-span-2">
                    <div
                      onClick={toggleMenuServerEdit}
                      className="flex flex-row items-center justify-between gap-3 text-black dark:text-white bg-white dark:bg-[#16171a] p-2.5 rounded-lg focus:outline focus:outline-offset-1 focus:outline-zinc-600 ring-1 ring-zinc-200 dark:ring-zinc-600 cursor-pointer"
                    >
                      {selectedServerEdit ? selectedServerEdit : serverEdit}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className={`bi bi-caret-down-fill transform transition-transform duration-100 ${
                          isMenuServerOpenEdit ? "rotate-180" : "rotate-0"
                        }`}
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                      </svg>
                    </div>
                    <p className="text-error text-xs mt-2">
                      *Selalu Perhatikan! Jika Produk yang kamu gunakan
                      Menggunakan Server ID maka Harus diganti
                    </p>
                    {isMenuServerOpenEdit && (
                      <div className="absolute z-[1] top-12 flex flex-col gap-y-2 bg-white dark:bg-[#16171a] p-2 rounded-lg w-full ring-1 ring-zinc-200 dark:ring-zinc-600">
                        {[
                          "1. Target ( User ID )",
                          "2. Target ( User ID / Server ID )",
                          "3. Target ( Custom via code )",
                        ].map((serverOption) => (
                          <div
                            key={serverOption}
                            onClick={() => handleServerSelection(serverOption)}
                            className="flex flex-row px-4 py-2 text-black dark:text-white cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:duration-300 rounded-lg z-50"
                          >
                            {serverOption}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="tipe"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Tipe
                  </label>
                  <div className="relative col-span-2">
                    <div
                      onClick={toggleMenuTipeEdit}
                      className="flex flex-row items-center justify-between gap-3 text-black dark:text-white bg-white dark:bg-[#16171a] p-2.5 rounded-lg focus:outline focus:outline-offset-1 focus:outline-zinc-600 ring-1 ring-zinc-200 dark:ring-zinc-600 cursor-pointer"
                    >
                      {selectedTipeEdit ? selectedTipeEdit.name : tipeEdit.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className={`bi bi-caret-down-fill transform transition-transform duration-100 ${
                          isMenuTipeOpenEdit ? "rotate-180" : "rotate-0"
                        }`}
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                      </svg>
                    </div>
                    {isMenuTipeOpenEdit && (
                      <div className="absolute z-[1] top-12 flex flex-col gap-y-2 bg-white dark:bg-[#16171a] p-2 rounded-lg w-full ring-1 ring-zinc-200 dark:ring-zinc-600">
                        {dataTipe.map((tipeOption) => (
                          <div
                            key={tipeOption.name}
                            onClick={() => handleTipeSelection(tipeOption)}
                            className="flex flex-row px-4 py-2 text-black dark:text-white cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:duration-300 rounded-lg z-50"
                          >
                            {tipeOption.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="rateMemberEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Rate Member
                  </label>
                  <input
                    id="rateMemberEdit"
                    type="text"
                    placeholder="Rate Member"
                    value={rateMemberEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setRateMemberEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="rateGoldEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Rate Gold
                  </label>
                  <input
                    id="rateGoldEdit"
                    type="text"
                    placeholder="Rate Gold"
                    value={rateGoldEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setRateGoldEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="ratePlatinumEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Rate Platinum
                  </label>
                  <input
                    id="ratePlatinumEdit"
                    type="text"
                    placeholder="Rate Platinum"
                    value={ratePlatinumEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setRatePlatinumEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                  <label
                    htmlFor="populer"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Populer
                  </label>
                  <div className="relative col-span-2">
                    <div
                      onClick={toggleMenuPopulerEdit}
                      className="flex flex-row items-center justify-between gap-3 text-black dark:text-white bg-white dark:bg-[#16171a] p-2.5 rounded-lg focus:outline focus:outline-offset-1 focus:outline-zinc-600 ring-1 ring-zinc-200 dark:ring-zinc-600 cursor-pointer"
                    >
                      {selectedPopulerEdit ? selectedPopulerEdit : populerEdit}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className={`bi bi-caret-down-fill transform transition-transform duration-100 ${
                          isMenuPopulerOpenEdit ? "rotate-180" : "rotate-0"
                        }`}
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                      </svg>
                    </div>
                    {isMenuPopulerOpenEdit && (
                      <div className="absolute z-[1] top-12 flex flex-col gap-y-2 bg-white dark:bg-[#16171a] p-2 rounded-lg w-full ring-1 ring-zinc-200 dark:ring-zinc-600">
                        {["Ya", "Tidak"].map((populerOption) => (
                          <div
                            key={populerOption}
                            onClick={() =>
                              handlePopulerSelection(populerOption)
                            }
                            className="flex flex-row px-4 py-2 text-black dark:text-white cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:duration-300 rounded-lg z-50"
                          >
                            {populerOption}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="thumbnail"
                    className="col-span-1 flex flex-row text-black dark:text-white pt-2"
                  >
                    Thumbnail
                  </label>
                  <div className="col-span-2">
                    <input
                      id="thumbnail"
                      ref={thumbnailRefEdit}
                      type="file"
                      onChange={(e) => setThumbnailEdit(e.target.files[0])}
                      className="bg-white dark:bg-[#16171a] w-full p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                    />
                    <p className="text-error text-xs mt-2">
                      Gunakan Ukuran 512 x 652 pixel (Lebar x Tinggi) untuk
                      thumbnail
                    </p>
                  </div>
                  <label
                    htmlFor="bannerLayanan"
                    className="col-span-1 flex flex-row text-black dark:text-white pt-2"
                  >
                    Banner Layanan
                  </label>
                  <div className="col-span-2">
                    <input
                      id="bannerLayanan"
                      ref={bannerLayananRefEdit}
                      type="file"
                      onChange={(e) => setBannerLayananEdit(e.target.files[0])}
                      className="bg-white dark:bg-[#16171a] w-full p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                    />
                    <p className="text-error text-xs mt-2">
                      Disarankan Banner Layanan menggunakan ukuran 1180 x 275
                      pixel (Lebar x Tinggi)
                    </p>
                  </div>
                  <label
                    htmlFor="petunjuk"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Petunjuk
                  </label>
                  <input
                    id="petunjuk"
                    ref={petunjukRefEdit}
                    type="file"
                    onChange={(e) => setPetunjukEdit(e.target.files[0])}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                </div>
              )}
              {isProdukTipe && (
                <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                  <label
                    htmlFor="namaTipeEdit"
                    className="col-span-1 flex flex-row items-center text-black dark:text-white"
                  >
                    Nama
                  </label>
                  <input
                    id="namaTipeEdit"
                    type="text"
                    placeholder="Nama"
                    value={namaTipeEdit}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setNamaTipeEdit(e.target.value)}
                    className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row justify-end ps-6 pl-6 pb-6 pr-6 pe-6">
              <button
                type="submit"
                className="bg-purple-500 px-4 py-2.5 rounded-lg hover:brightness-75 hover:duration-300 text-white font-medium cursor-pointer"
              >
                Edit
              </button>
            </div>
          </form>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute top-4 right-4 end-4">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

BtnAksi.propTypes = {
  id: PropTypes.number,
  getData: PropTypes.func,
  dataTipe: PropTypes.array,
};

export default BtnAksi;
