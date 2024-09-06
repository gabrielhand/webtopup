const BtnStatus = ({ status }) => {
  const bgColor = status === "Success" || status === "available" ? "bg-green-500" : status === "Batal" ? "bg-red-500" : "bg-yellow-500";

  return <div className={`${bgColor} rounded-lg px-2 py-1 text-center text-white`}>{status}</div>;
};

export default BtnStatus;
