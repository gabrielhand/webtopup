import { useState } from 'react';

const Test = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        className={`relative w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-500 ${
          isRightPanelActive ? 'right-panel-active' : ''
        }`}
        id="container"
      >
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-600 ${
            isRightPanelActive ? 'opacity-0 z-1 translate-x-full' : 'z-2'
          }`}
        >
          <form className="flex flex-col items-center justify-center p-12 h-full bg-white" method="POST">
            <h1 className="font-bold text-2xl mb-4">Create Account</h1>
            <input
              className="w-full p-3 mb-4 bg-gray-200 rounded-md"
              type="text"
              placeholder="Name"
              required
            />
            <input
              className="w-full p-3 mb-4 bg-gray-200 rounded-md"
              type="text"
              placeholder="Username"
              required
            />
            <input
              className="w-full p-3 mb-4 bg-gray-200 rounded-md"
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="w-full p-3 mb-4 bg-gray-200 rounded-md"
              type="password"
              placeholder="Password"
              required
            />
            <input
              className="w-full p-3 mb-4 bg-gray-200 rounded-md"
              type="password"
              placeholder="Confirm Password"
              required
            />
            <button className="px-10 py-3 mt-4 text-white bg-red-500 rounded-full uppercase font-bold">
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-600 ${
            isRightPanelActive ? 'translate-x-full opacity-0 z-1' : 'z-2'
          }`}
        >
          <form className="flex flex-col items-center justify-center p-12 h-full bg-white" method="POST">
            <h1 className="font-bold text-2xl mb-4">Sign In</h1>
            <input
              className="w-full p-3 mb-4 bg-gray-200 rounded-md"
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="w-full p-3 mb-4 bg-gray-200 rounded-md"
              type="password"
              placeholder="Password"
              required
            />
            <a href="#" className="text-sm text-gray-500 mb-4">
              Forgot your password?
            </a>
            <button className="px-10 py-3 mt-4 text-white bg-red-500 rounded-full uppercase font-bold">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay */}
        <div
          className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 z-100"
        >
          <div
            className="absolute w-[200%] h-full left-[-100%] bg-gradient-to-r from-pink-500 to-red-400 transition-transform duration-600"
            style={{
              transform: isRightPanelActive ? 'translateX(50%)' : 'translateX(0)',
            }}
          >
            <div
              className={`absolute top-0 left-0 w-1/2 h-full flex items-center justify-center flex-col text-white transition-transform duration-600 ${
                isRightPanelActive ? 'translate-x-0' : '-translate-x-1/4'
              }`}
            >
              <h1 className="text-3xl font-bold">Welcome Back!</h1>
              <p className="text-sm mt-4 mb-8">
                To keep connected with us, please login with your personal info
              </p>
              <button
                className="px-10 py-3 text-white border border-white rounded-full uppercase font-bold"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </div>

            <div
              className={`absolute top-0 right-0 w-1/2 h-full flex items-center justify-center flex-col text-white transition-transform duration-600 ${
                isRightPanelActive ? 'translate-x-1/4' : 'translate-x-0'
              }`}
            >
              <h1 className="text-3xl font-bold">Hello, Friend!</h1>
              <p className="text-sm mt-4 mb-8">
                Enter your personal details and start your journey with us
              </p>
              <button
                className="px-10 py-3 text-white border border-white rounded-full uppercase font-bold"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
