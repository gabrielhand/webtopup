import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../../features/authSlices";
import PropTypes from "prop-types";

const UbahProfile = ({ id, imageUser, nama, username, nomerWa, setMsg }) => {
  const [editedUsername, setEditedUsername] = useState(username);
  const [focusedInUsername, setFocusedInUsername] = useState(false);
  const [selectedImage, setSelectedImage] = useState(imageUser);
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setEditedUsername(e.target.value);
  };

  const handleFocusInUsername = () => setFocusedInUsername(true);
  const handleBlurInUsername = () => setFocusedInUsername(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", editedUsername);
      if (e.target.image.files[0]) {
        formData.append("image", e.target.image.files[0]);
      }
      const response = await axios.patch(
        `http://localhost:5000/users/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { msg } = response.data;
      setMsg(msg);

      console.log(msg);

      dispatch(getMe());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="EditProfile-Content" className="flex flex-col gap-y-3">
      <div className="flex flex-row rounded-xl bg-[#4169e1] font-medium shadow-lg">
        <p className="px-5 py-3 text-white font-medium text-xl">Edit Profile</p>
      </div>
      <form onSubmit={updateUser}>
        <div className="flex flex-col gap-y-6 px-5 py-4 bg-white dark:bg-[#313136] rounded-xl shadow-lg">
          <div className="flex flex-row gap-6">
            <input
              type="file"
              id="imageUser"
              name="image"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              onChange={handleImageChange}
              hidden
            />
            <label htmlFor="imageUser">
              <div className="relative aspect-square rounded-xl border border-white max-w-28 group overflow-hidden cursor-pointer">
                <img
                  id="imageUser"
                  src={selectedImage}
                  alt={`Foto-${username}`}
                  className="object-cover inset-0 w-full h-full duration-500 group-hover:blur-sm group-hover:brightness-50"
                />
                <div className="hidden group-hover:flex flex-col absolute inset-0 justify-center items-center text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={1}
                    className="bi bi-upload"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                  </svg>
                </div>
              </div>
            </label>
            <div className="flex flex-col items-start">
              <p className="text-lg text-white font-medium">Foto profil</p>
              <p className="text-sm text-zinc-400 font-light">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero,
                accusamus.
              </p>
              <div className="flex flex-row items-center gap-3 px-5 py-2 mt-4 rounded-xl border outline-white text-white cursor-pointer">
                Upload Foto
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-upload"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full gap-4">
            <div className="flex flex-col gap-y-2 flex-1">
              <p className="text-lg text-black dark:text-white font-medium">
                Nama
              </p>
              <input
                type="text"
                name="nama"
                className="flex flex-row rounded-md px-4 py-3 focus:outline-none bg-gray-200 dark:bg-[#242429] text-black dark:text-white cursor-not-allowed"
                value={nama}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-y-2 flex-1">
              <p className="text-lg text-black dark:text-white font-medium">
                Nomor Whatsapp
              </p>
              <input
                type="text"
                name="nomorwa"
                className="flex flex-row rounded-md px-4 py-3 focus:outline-none bg-gray-200 dark:bg-[#242429] text-black dark:text-white cursor-not-allowed"
                value={nomerWa}
                readOnly
              />
            </div>
          </div>
          <div className="relative flex flex-col gap-y-2 flex-1 rounded-md overflow-hidden">
            <p className="text-lg text-black dark:text-white font-medium">
              Username
            </p>
            <input
              id="username"
              type="text"
              name="username"
              className="flex flex-row rounded-md px-4 py-3 focus:outline-none bg-gray-200 dark:bg-[#242429] text-black dark:text-white"
              value={editedUsername}
              onChange={handleUsernameChange}
              onFocus={handleFocusInUsername}
              onBlur={handleBlurInUsername}
            />
            <span
              className={`absolute h-[2px] left-0 top-[98%] w-full bg-black dark:bg-white duration-300 transform ${
                focusedInUsername ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </div>
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

UbahProfile.propTypes = {
  id: PropTypes.number.isRequired,
  imageUser: PropTypes.string.isRequired,
  nama: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  nomerWa: PropTypes.string.isRequired,
  setMsg: PropTypes.func.isRequired,
};

export default UbahProfile;
