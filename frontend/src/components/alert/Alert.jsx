import PropTypes from "prop-types";

const Alert = ({
  status,
  message,
  bg,
  bgIcon,
  border,
  textColor,
  closeAlert,
}) => {
  return (
    <div
      className={`relative flex flex-row items-center gap-x-4 min-w-72 rounded-md ${bg} dark:bg-[#313136] p-4 border-l-4 ${border} shadow-lg`}
    >
      <div
        className={`flex flex-row p-3 items-center justify-center text-center aspect-square rounded-full ${bgIcon}`}
      >
        {status === "Sukses" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            className="bi bi-check-lg text-white"
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1}
            className="bi bi-x-lg text-white"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        )}
      </div>
      <div className="flex flex-col">
        <p className="font-medium dark:text-white">{status}</p>
        <p className="dark:text-zinc-300 text-sm -mt-1">{message}</p>
      </div>
      <div
        onClick={closeAlert}
        className={`absolute right-3 top-3 ${textColor} cursor-pointer`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1}
          className="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </div>
    </div>
  );
};

Alert.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  border: PropTypes.string.isRequired,
  closeAlert: PropTypes.func.isRequired,
};

export default Alert;
