import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser, getMe, reset } from "../../features/authSlices";
import PropTypes from "prop-types";

const Login = ({ logoHeader, setMsg }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user || isSuccess) {
      setTimeout(() => {
        navigate("/me");

        setMsg("Berhasil Login");
      }, 2300);
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    }
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };

  return (
    <div className="relative w-full h-full">
      <form onSubmit={Auth}>
        <div className="flex flex-col gap-y-6 h-full lg:p-10 md:p-8 p-6 overflow-hidden">
          <Link to="/">
            <img src={logoHeader} alt="" className="max-w-32 max-h-32" />
          </Link>
          <div className="flex flex-col lg:w-2/3 gap-y-2 px-2 lg:mt-4 md:mt-4 mt-2">
            <p className="lg:text-3xl text-black dark:text-white font-medium">
              Masuk
            </p>
            <p className="lg:text-base text-zinc-700 dark:text-zinc-400 tracking-tight">
              Masuk menggunakan akun yang telah kamu daftarkan
            </p>
            {isError && <p className="font-medium text-red-600">{message}</p>}
          </div>
          <div className="flex flex-col gap-y-4 lg:w-2/3 w-full px-2">
            <div className="flex flex-col gap-y-3">
              <label
                htmlFor="inputUsernameLogin"
                className="px-1 font-medium text-black dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="inputUsernameLogin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username kamu..."
                className="flex flex-row text-black px-4 py-2.5 rounded-md bg-gray-200 dark:bg-white focus:outline-none cursor-pointer placeholder:text-zinc-400"
              />
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label
                htmlFor="inputPasswordLogin"
                className="px-1 font-medium text-black dark:text-white"
              >
                Password
              </label>
              <div className="flex flex-row items-center">
                <input
                  type="password"
                  name="password"
                  id="inputPasswordLogin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password kamu..."
                  className="flex flex-row w-full text-black px-4 py-2.5 rounded-md bg-gray-200 dark:bg-white focus:outline-none cursor-pointer placeholder:text-zinc-400"
                />
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye absolute right-4 cursor-pointer -top-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                  </svg>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="flex flex-row px-4 py-2.5 lg:mt-6 md:mt-6 mt-4 rounded-xl bg-[#4169e1] hover:brightness-75 hover:duration-300 disabled:brightness-75 disabled:cursor-wait font-medium items-center text-center justify-center text-white cursor-pointer"
              disabled={isSuccess}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  logoHeader: PropTypes.string,
};

export default Login;
