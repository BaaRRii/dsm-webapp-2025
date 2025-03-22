import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;