import React from "react";
// import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../Containers/Home/Home/Home";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  //  this auth shuld be controled through authorized user. it is true for now
  //   const _auth = isLoggedIn;
  //   return isLoggedIn ? <Home /> : <Login/>;
  if (isLoggedIn === "true") return <Home />;
  if (isLoggedIn === "false") return <Navigate to="/auth" />;
};
export default ProtectedRoute;
