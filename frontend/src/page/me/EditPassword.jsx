import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../../features/authSlices";

const EditPassword = ({ setStatusAlert, setMsg }) => {
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [focusedInPasswordLama, setFocusedInPasswordLama] = useState(false);
  const [focusedInPasswordBaru, setFocusedInPasswordBaru] = useState(false);

  const handleFocusInPasswordLama = () => setFocusedInPasswordLama(true);
  const handleBlurInPasswordLama = () => setFocusedInPasswordLama(false);

  const handleFocusInPasswordBaru = () => setFocusedInPasswordBaru(true);
  const handleBlurInPasswordBaru = () => setFocusedInPasswordBaru(false);

  const dispatch = useDispatch();

  const updatePassword = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("passwordold", passwordLama);
      formData.append("passwordnew", passwordBaru);
      const response = await axios.patch(
        `http://localhost:5000/users/password/edit`,
        formData,
        {}
      );

      const { msg } = response.data;
      setStatusAlert("Sukses");
      setMsg(msg);

      dispatch(getMe());
    } catch (error) {
      if (error.response) {
        setStatusAlert("Gagal");
        setMsg(error.response.data.msg);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  return (
    <div id="EditPassword-Content" className="flex flex-col gap-y-3 h-full">
      <div className="flex flex-row rounded-xl bg-[#4169e1] font-medium shadow-lg">
        <p className="px-5 py-3 text-white font-medium text-xl">
          Edit Password
        </p>
      </div>
      <form onSubmit={updatePassword}>
        <div className="flex flex-col gap-y-6 px-5 py-4 bg-white dark:bg-[#313136] rounded-xl shadow-lg">
          <div className="flex flex-row w-full gap-4">
            <div className="relative flex flex-col gap-y-2 flex-1 rounded-md overflow-hidden">
              <p className="text-lg text-black dark:text-white font-medium">
                Password Lama
              </p>
              <input
                id="passwordLama"
                type="password"
                value={passwordLama}
                onChange={(e) => setPasswordLama(e.target.value)}
                className="flex flex-row rounded-md px-4 py-3 focus:outline-none bg-gray-200 dark:bg-[#242429] text-black dark:text-white"
                placeholder="Password lama kamu"
                onFocus={handleFocusInPasswordLama}
                onBlur={handleBlurInPasswordLama}
              />
              <span
                className={`absolute h-[2px] left-0 top-[98%] w-full bg-black dark:bg-white duration-300 transform ${
                  focusedInPasswordLama ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            </div>
          </div>
          <div className="flex flex-row w-full gap-4">
            <div className="relative flex flex-col gap-y-2 flex-1 rounded-md overflow-hidden">
              <p className="text-lg text-black dark:text-white font-medium">
                Password Baru
              </p>
              <input
                id="passwordBaru"
                type="password"
                value={passwordBaru}
                onChange={(e) => setPasswordBaru(e.target.value)}
                className="flex flex-row rounded-md px-4 py-3 focus:outline-none bg-gray-200 dark:bg-[#242429] text-black dark:text-white"
                placeholder="Password baru kamu"
                onFocus={handleFocusInPasswordBaru}
                onBlur={handleBlurInPasswordBaru}
              />
              <span
                className={`absolute h-[2px] left-0 top-[98%] w-full bg-black dark:bg-white duration-300 transform ${
                  focusedInPasswordBaru ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            </div>
          </div>
          {/* <div className="flex flex-row w-full gap-4">
          <div className="relative flex flex-col gap-y-2 flex-1 rounded-md overflow-hidden">
            <p className="text-lg text-black dark:text-white font-medium">
              Konfirmasi Password Baru
            </p>
            <input
              id="konfirmasiPasswordBaru"
              type="password"
              name="password"
              className="flex flex-row rounded-md px-4 py-3 focus:outline-none bg-gray-200 dark:bg-[#242429] text-black dark:text-white"
              placeholder="Konfirmasi password baru kamu"
              onFocus={handleFocusInPasswordBaru}
              onBlur={handleBlurInPasswordBaru}
            />
            <span
              className={`absolute h-[2px] left-0 top-[98%] w-full bg-black dark:bg-white duration-300 transform ${
                focusedInPasswordBaru ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </div>
        </div> */}
          <div className="flex flex-row justify-end">
            <button
              type="submit"
              className="flex flex-row rounded-md bg-[#4169e1] text-white px-5 py-2"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPassword;
