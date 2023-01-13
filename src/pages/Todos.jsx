import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"
import { useUserContext } from "../context/UserContext"


export const Todo = () => {

  const {setUser} = useUserContext()

  const closeSesion = async() => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full h-screen p-10">
      <h1 className="text-2xl font-bold">Esto es una sección protegida :D. Solo la puedes ver si has iniciado sesión</h1>

      <button onClick={closeSesion} className="bg-cyan-600 hover:bg-cyan-700 w-full md:w-1/3 py-2 px-1 text-white font-bold ">Cerrar Sesión</button>
    </div>
  )
}
