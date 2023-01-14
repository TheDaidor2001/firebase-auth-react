import { createContext, useContext, useState, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { Loading } from "../components/Loading.jsx";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
    });
  }, [user]);

  if (user === false) return <Loading />;

  return (
    <UserContext.Provider
      value={{ user, setUser, error, setError, setLoading, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
