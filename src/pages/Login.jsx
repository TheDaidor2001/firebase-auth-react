import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { useState } from "react";
import { AuthText } from "../components/AuthText";
import { hola, signInUserFireabse } from "../config/userFirebase";
import { useUserContext } from "../context/UserContext";
import { Alert } from "../components/Alet";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, setError,setLoading } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if([email,password].includes('')){
      return setError({
        msg: 'Todos los campos son obligatorios'
      })
    }

    setLoading(true)
    try {
      const credentialUser = await signInUserFireabse(email, password);
      const{user} = credentialUser


    } catch (error) {
      console.log(error);
      if(error.code === 'auth/user-not-found'){
        return setError({
          msg: 'El usuario no existe'
        })
      }
      if(error.code === 'auth/wrong-password'){
        return setError({
          msg: 'Email o contraseña equivocados'
        })
      }
    }finally{
      setLoading(false)
    }
  };

  const googleProvider = async () => {

    try {
      hola()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white shadow-xl rounded-lg px-8 py-6">
      <AuthText
        text={"Bienvenido de Nuevo"}
        info={"¿Aún no tienes cuenta?"}
        accion={"Registrarse"}
        url={"/auth/register"}
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
        <div className="flex flex-col gap-2 ">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            className=" text-gray-500 border border-gray-200 rounded-lg px-2 py-2 outline-none"
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="relative w-100 h-[0.5px] bg-gray-300 mt-10 flex justify-center">
          <span className="bg-white rounded-full px-2 py-1 text-gray-500 absolute bottom-[-15px] border border-gray-300">
            También
          </span>
        </div>
        <div className="flex flex-col mt-10 gap-3 mb-3">
        <button type="button" onClick={googleProvider} className="py-2 rounded-lg text-gray-500 border border-gray-300 flex gap-3 items-center justify-center hover:bg-gray-200 transition-colors">
          <span>
            <img className="w-5 " src="/1534129544.svg"></img>
          </span>
          Google
        </button>
      </div>
      <Link
        to="/auth/forgot-password"
        className="text-xs mt-5 text-cyan-600 hover:text-cyan-800 transition-colors"
      >
        ¿Olvidate la contraseña?
      </Link>
      </AuthForm>
    </div>
  );
};
