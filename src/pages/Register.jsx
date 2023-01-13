import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { useState } from "react";
import { AuthText } from "../components/AuthText";
import { createUserFirebase } from "../config/userFirebase";
import { Alert } from "../components/Alet";
import { useUserContext } from "../context/UserContext";
import {sendEmailVerification} from 'firebase/auth'
import { auth } from "../config/firebase";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordtwo, setPasswordTwo] = useState("");
  const [displayName, setDispayName] = useState("");

  const {user,error, setError} = useUserContext()
  console.log(error);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password !== passwordtwo) {
      return setError({
        msg: 'Las contraseñas no coinciden'
      })
    }

    if([email,password, passwordtwo].includes('')){
      return setError({
        msg: 'Todos los campos son obligatorios'
      })
    }
    
    try {
      const createUser = await createUserFirebase(email, password, displayName);
      await sendEmailVerification(auth.currentUser)
      if(!createUser.emailVerified){
        return setError({
          msg: 'Hemos enviado un email de confirmación a tu cuenta'
        })
      }
      setError({})
    } catch (error) {
      console.log(error);
      if(error.code === 'auth/weak-password'){
        return setError({
          msg: 'La contraseña debe tener mínimo 6 carácteres'
        })
      }
      if(error.code === 'auth/email-already-in-use'){
        return setError({
          msg: 'El correo ya está registrado'
        })
      }
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg px-8 py-6">
      <AuthText
        text={"Crea tu nueva cuenta"}
        info={"¿Ya tienes cuenta?"}
        accion={"Iniciar Sesión"}
        url={"/auth"}
      />
      <AuthForm handleSubmit={handleSubmit}>
        {error.msg && (
          <Alert msg={error.msg}/>
        )}
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
        <div className="flex flex-col gap-2 ">
          <label htmlFor="password2" className="font-normal">
            Repetir Contraseña
          </label>
          <input
            id="password2"
            className=" text-gray-500 border border-gray-200 rounded-lg px-2 py-2 outline-none"
            type="password"
            placeholder="••••••"
            value={passwordtwo}
            onChange={(e) => setPasswordTwo(e.target.value)}
          />
        </div>
        <div className="relative w-100 h-[0.5px] bg-gray-300 mt-10 flex justify-center">
          <span className="bg-white rounded-full px-2 py-1 text-gray-500 absolute bottom-[-15px] border border-gray-300">
            También
          </span>
        </div>
        <div className="flex flex-col mt-10 gap-3 mb-3">
        <button className="py-2 rounded-lg text-gray-500 border border-gray-300 flex gap-3 items-center justify-center hover:bg-gray-200 transition-colors">
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
