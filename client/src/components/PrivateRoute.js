import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  // this a React HOC (see: https://legacy.reactjs.org/docs/higher-order-components.html)
  // that wraps another component and returns result conditionally.
  // this component is used for controlling access to protected routes
  const { authUser } = useContext(UserContext);
  const location = useLocation();
  if (authUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  }
};

export default PrivateRoute;
