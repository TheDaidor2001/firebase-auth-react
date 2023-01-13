
import { AuthForm } from "../components/AuthForm";
import { useState } from "react";
import { AuthText } from "../components/AuthText";
import { Alert } from "../components/Alet";
import { useUserContext } from "../context/UserContext";
import { resetPasswordSendEmail } from "../config/userFirebase";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { error, setError } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email].includes('')){
      return setError({
        msg: 'Todos los campos son obligatorios'
      })
    }
    try {
      const senEmailPassword = await resetPasswordSendEmail(email);

    } catch (error) {
      console.log(error);
        if(error.code === 'auth/user-not-found'){
            return setError({
                msg: 'El email no existe'
              })
        }

    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg px-8 py-6">
      <AuthText
        text={"Recupera tu contraseña"}
        info={"¿Quieres iniciar sesión?"}
        accion={"Iniciar Sesión"}
        url={"/auth"}
      />
      <AuthForm handleSubmit={handleSubmit}>
        {error.msg && <Alert msg={error.msg} />}
        <div className="flex flex-col gap-2 ">
          <label htmlFor="email" className="font-normal">
            Email
          </label>
          <input
            id="email"
            className=" text-gray-500 border border-gray-200 rounded-lg px-2 py-2 outline-none"
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

      </AuthForm>
    </div>
  );
};
