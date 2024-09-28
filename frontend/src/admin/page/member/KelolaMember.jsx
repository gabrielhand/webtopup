import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import axios from "axios";
import ImgNotFound from "../../../assets/not-found.png";
import BtnAksi from "../../components/button/BtnAksi";

const KelolaMember = () => {
  const [isLoading, setLoading] = useState(false);
  const [memberKelola, setMemberKelola] = useState([]);
  const [username, setUsername] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [namaLengkap, setNamaLengkap] = useState("");
  const [usernameMember, setUsernameMember] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Member");
  const [isMenuRoleOpen, setMenuRoleOpen] = useState(false);
  // const [usernameMemberEdit, setUsernameMemberEdit] = useState("");
  // const [passwordEdit, setPasswordEdit] = useState("");
  // const [roleEdit, setRoleEdit] = useState("");
  // const [isMenuRoleOpenEdit, setMenuRoleOpenEdit] = useState(false);
  const [usernameMemberBalance, setUsernameMemberBalance] = useState("");
  const [balance, setBalance] = useState("");

  const getMemberKelola = async (page = 1, username = "") => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/users/member?page=${page}&limit=${limit}`;

      if (username) {
        url += `&username=${username}`;
      }

      const response = await axios.get(url);
      setMemberKelola(response.data.memberKelola);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setMenuRoleOpen(false);
  };

  const addMember = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", namaLengkap);
      formData.append("username", usernameMember);
      formData.append("password", password);
      formData.append("role", role);
      const response = await axios.post(
        "http://localhost:5000/users/member/create",
        formData
      );

      handleResetAddMember();
      getMemberKelola();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBalance = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", usernameMemberBalance);
      formData.append("balance", balance);
      const response = await axios.patch(
        "http://localhost:5000/users/member/balance/update",
        formData
      );

      handleResetUpdateBalanceMember();
      getMemberKelola();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMemberKelola();
  }, []);

  useEffect(() => {
    if (!username.trim()) {
      getMemberKelola(currentPage);
    }
  }, [username]);

  useEffect(() => {
    getMemberKelola(currentPage, username);
  }, [currentPage]);

  const handleSearchMemberKelola = () => {
    getMemberKelola(1, username);
  };

  const handlePageChangeMemberKelola = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleMenuRole = () => {
    setMenuRoleOpen(!isMenuRoleOpen);
  };

  const handleResetAddMember = () => {
    setNamaLengkap("");
    setUsernameMember("");
    setPassword("");
    setRole("Member");
  };

  const handleResetUpdateBalanceMember = () => {
    setUsernameMemberBalance("");
    setBalance("");
  };

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <BreadCrumbs />
      <div className="grid lg:grid-cols-5 md:grid-cols-5 gap-6">
        <div className="col-span-3 flex flex-col gap-y-4">
          <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
            Tambah Pengguna
          </div>
          <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
            <form onSubmit={addMember} className="flex flex-col gap-y-4">
              <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                <label
                  htmlFor="namaLengkap"
                  className="col-span-1 flex flex-row items-center text-black dark:text-white"
                >
                  Nama Lengkap
                </label>
                <input
                  id="namaLengkap"
                  type="text"
                  placeholder="Nama Lengkap"
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                />
                <label
                  htmlFor="username"
                  className="col-span-1 flex flex-row items-center text-black dark:text-white"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={usernameMember}
                  onChange={(e) => setUsernameMember(e.target.value)}
                  className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                />
                <label
                  htmlFor="password"
                  className="col-span-1 flex flex-row items-center text-black dark:text-white"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                />
                <label
                  htmlFor="role"
                  className="col-span-1 flex flex-row items-center text-black dark:text-white"
                >
                  Role
                </label>
                <div className="relative col-span-2 flex flex-col">
                  <div
                    onClick={toggleMenuRole}
                    className="flex flex-row items-center justify-between gap-3 text-black dark:text-white bg-white dark:bg-[#16171a] p-2.5 rounded-lg focus:outline focus:outline-offset-1 focus:outline-zinc-600 ring-1 ring-zinc-200 dark:ring-zinc-600 cursor-pointer"
                  >
                    {role}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className={`bi bi-caret-down-fill transform transition-transform duration-100 ${
                        isMenuRoleOpen ? "rotate-180" : "rotate-0"
                      }`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </div>
                  {isMenuRoleOpen && (
                    <div className="absolute top-12 flex flex-col gap-y-2 bg-white dark:bg-[#16171a] p-2 rounded-lg w-full ring-1 ring-zinc-200 dark:ring-zinc-600">
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
              <div className="flex flex-row gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={handleResetAddMember}
                  className="bg-zinc-300 px-3 py-2 rounded-md text-black"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-purple-500  px-3 py-2 rounded-md text-white"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-y-4">
          <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
            Kirim Saldo
          </div>
          <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
            <form onSubmit={updateBalance} className="flex flex-col gap-y-4">
              <div className="grid grid-cols-3 gap-y-4">
                <label
                  htmlFor="usernameSaldo"
                  className="col-span-1 flex flex-row items-center text-black dark:text-white"
                >
                  Username
                </label>
                <input
                  id="usernameSaldo"
                  type="text"
                  placeholder="Username"
                  value={usernameMemberBalance}
                  onChange={(e) => setUsernameMemberBalance(e.target.value)}
                  className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                />
                <label
                  htmlFor="jumlah"
                  className="col-span-1 flex flex-row items-center text-black dark:text-white"
                >
                  Jumlah
                </label>
                <input
                  id="jumlah"
                  type="number"
                  placeholder="Jumlah"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="col-span-2 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                />
              </div>
              <div className="flex flex-row gap-3 justify-end mt-2">
                <button
                  onClick={handleResetUpdateBalanceMember}
                  type="button"
                  className="bg-zinc-300 px-3 py-2 rounded-md text-black"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-purple-500  px-3 py-2 rounded-md text-white"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-row text-2xl text-black dark:text-white font-semibold">
        Daftar Semua Member
      </div>
      <div className="flex flex-row items-center justify-between gap-x-3">
        <div className="flex flex-row gap-x-3">
          <input
            type="text"
            name="usernameUser"
            id="usernameAdminInput"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black dark:text-white font-medium cursor-pointer bg-white dark:bg-[#2d2d2e] rounded-lg px-4 py-2 focus:outline-none border border-zinc-300 dark:border-zinc-600 shadow-md"
          />
          <button
            onClick={handleSearchMemberKelola}
            className="flex flex-row items-center gap-x-2 px-4 py-2 bg-purple-500 hover:brightness-90 hover:dur rounded-lg text-white cursor-pointer shadow-md"
          >
            Cari
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={0.5}
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </div>
      </div>
      <div className="shadow-md border border-zinc-300 dark:border-[#4169e1]/30 rounded-xl flex flex-row w-full overflow-y-hidden pb-2 overflow-x-auto min-h-72">
        <table className="bg-transparent w-full text-start">
          <thead className="bg-purple-500 dark:bg-[#2d2d2e]">
            <tr className="text-white border-b dark:border-zinc-600">
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Nama Lengkap
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Username
              </th>
              <th className="py-2 text-start px-4 font-medium">Saldo</th>
              <th className="py-2 text-start px-4 font-medium">Level</th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                No Whatsapp
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Tanggal Bergabung
              </th>
              <th className="py-2 text-start px-4 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="12">
                  <div className="flex flex-row gap-x-1 items-end justify-center my-8 text-black dark:text-white">
                    <p className="text-lg">Loading</p>
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {memberKelola.length === 0 ? (
                  <tr>
                    <td colSpan="12">
                      <div className="flex justify-center my-8">
                        <div className="flex flex-col justify-center items-center">
                          <img
                            src={ImgNotFound}
                            alt="No orders found"
                            className="max-w-40"
                          />
                          <p className="text-black dark:text-white">
                            Oops, member tidak ditemukan!
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {memberKelola.map((member, index) => {
                      return (
                        <tr
                          key={index}
                          className="bg-white dark:bg-[#16171a] border-b border-zinc-300 dark:border-zinc-600"
                        >
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {member.name}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {member.username}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            Rp{" "}
                            {member.balance.toLocaleString("id-ID", {
                              styles: "currency",
                              currency: "IDR",
                            })}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {member.role}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {member.whatsapp}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            {member.created_at.slice(0, 19).replace("T", " ")}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            <BtnAksi id={member.id} getData={getMemberKelola} />
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row flex-wrap gap-2 justify-center mt-4">
        <button
          onClick={() => handlePageChangeMemberKelola(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-black rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChangeMemberKelola(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-purple-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChangeMemberKelola(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-purple-500 text-white rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default KelolaMember;
