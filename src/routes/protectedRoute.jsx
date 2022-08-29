import React from "react";
import { Navigate } from "react-router-dom";
import { pageStateAtom } from "../atom";
import { useRecoilState } from "recoil";

const ProtectedRoute = ({ isAuthenticated, children, pathname, token }) => {
  // const [pageState, setPageState] = useRecoilState(pageStateAtom);
  // // console.log(pathname, pageState);
  // if (pathname === "/mypage") {
  //   setPageState(pathname);
  // } else if (pathname === "/community") {
  //   setPageState(pathname);
  // } else if (pathname === "/frige") {
  //   setPageState(pathname);
  // }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
