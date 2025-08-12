/* eslint-disable react/prop-types */
// ManagerRoutes.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ManagerRoutes = ({ children }) => {

  const { user } = useSelector(state=>state?.auth);
  const isAdmin = user && user.role === "manager";
  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

export default ManagerRoutes;