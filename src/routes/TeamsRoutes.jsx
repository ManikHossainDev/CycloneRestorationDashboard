/* eslint-disable react/prop-types */
// TeamsRoutes.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TeamsRoutes = ({ children }) => {

  const { user } = useSelector(state=>state?.auth);
  const isAdmin = user && user.role === "team";
  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

export default TeamsRoutes;