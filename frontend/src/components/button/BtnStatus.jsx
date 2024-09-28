import PropTypes from "prop-types";

const BtnStatus = ({ status }) => {
  const bgColor =
    status === "Success" || status === "available"
      ? "bg-green-500"
      : status === "Batal"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <div className={`${bgColor} rounded-lg px-2 py-1 text-center text-white`}>
      {status}
    </div>
  );
};

BtnStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default BtnStatus;
