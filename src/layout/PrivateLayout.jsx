import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";



export const PrivateLayout = () => {
  const { user } = useUserContext();

  

  return (
    <>{user ? <Outlet /> : <Navigate to="/auth" />}</>
  );
};
