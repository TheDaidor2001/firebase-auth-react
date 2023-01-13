import { Outlet, Navigate, redirect } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import { auth } from "../config/firebase";



export const PrivateLayout = () => {
  const { user } = useUserContext();



  return (
    <>{user ? <Outlet /> : <Navigate to="/auth" />}</>
  );
};
