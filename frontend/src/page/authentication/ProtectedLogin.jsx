import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedLogin = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/me" replace />;
  }

  return children;
};
export default ProtectedLogin;
