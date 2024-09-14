const Register = ({ logoHeader }) => {
  return (
    <div className="w-full h-full">
      <form action="">
        <div className="flex flex-col gap-y-6 h-full lg:p-10 md:p-8 p-6">
          <figure>
            <img src={logoHeader} alt="" className="max-w-32 max-h-32" />
          </figure>
          <div className="flex flex-col lg:w-2/3 gap-y-2 px-2 lg:mt-4 md:mt-4 mt-2">
            <p className="lg:text-3xl text-black dark:text-white font-medium">
              Daftar
            </p>
            <p className="lg:text-base text-zinc-700 dark:text-zinc-400 tracking-tight">
              Harap masukkan informasi registrasi yang sesuai
            </p>
          </div>
          <div className="flex flex-col gap-y-4 lg:w-2/3 w-full px-2">
            <div className="flex flex-col gap-y-3">
              <label
                htmlFor="inputNameRegister"
                className="px-1 font-medium text-black dark:text-white"
              >
                Nama
              </label>
              <input
                type="text"
                name="name"
                id="inputNameRegister"
                placeholder="Masukkan nama kamu..."
                className="flex flex-row text-black px-4 py-2.5 rounded-xl bg-white focus:outline-none cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <label htmlFor="inputUsernameRegister" className="px-1 font-medium text-black dark:text-white">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="inputUsernameRegister"
                placeholder="Masukkan username kamu..."
                className="flex flex-row text-black px-4 py-2.5 rounded-xl bg-white focus:outline-none cursor-pointer"
              />
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label
                htmlFor="inputPasswordRegister"
                className="px-1 font-medium text-black dark:text-white"
              >
                Password
              </label>
              <div className="flex flex-row items-center">
                <input
                  type="password"
                  name="password"
                  id="inputPasswordRegister"
                  placeholder="Masukkan password kamu..."
                  className="flex flex-row w-full text-black px-4 py-2.5 rounded-xl bg-white focus:outline-none cursor-pointer"
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
            <div className="flex flex-col gap-y-3">
              <label
                htmlFor="inputNomorWa"
                className="px-1 font-medium text-black dark:text-white"
              >
                No Whatsapp
              </label>
              <input
                type="number"
                name="whatsapp"
                id="inputNomorWa"
                placeholder="Masukkan Nomor Whatsapp kamu..."
                className="flex flex-row text-black px-4 py-2.5 rounded-xl bg-white focus:outline-none cursor-pointer"
              />
            </div>
            <div className="flex flex-row px-4 py-2.5 lg:mt-6 md:mt-6 mt-4 rounded-xl bg-[#4169e1] hover:brightness-75 hover:duration-300 font-medium items-center text-center justify-center text-white cursor-pointer">
              Daftar
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
