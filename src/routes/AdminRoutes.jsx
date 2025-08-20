/* eslint-disable react/prop-types */
// AdminRoutes.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = ({ children }) => {

  const { user } = useSelector(state=>state?.auth);
  // console.log(user);
  const isAdmin = user && user.role === "admin";
  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default AdminRoutes;



