import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

export const AuthForm = ({ children, handleSubmit }) => {


  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-2 mt-5"
    >
      {children}
      

      <button
        className="w-full block mt-5 bg-cyan-600 hover:bg-cyan-700 transition-colors py-2 text-white rounded-lg"
        type="submit"
      >
        Iniciar Sesión
      </button>
    </form>
  );
};
