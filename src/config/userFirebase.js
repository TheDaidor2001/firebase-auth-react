import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import { useUserContext } from "../context/UserContext";

export const signInUserFireabse = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const createUserFirebase = (email, password, displayName) =>
  createUserWithEmailAndPassword(auth, email, password, displayName);

export const resetPasswordSendEmail = (email) =>
  sendPasswordResetEmail(auth, email);

const provider = new GoogleAuthProvider();

export const hola = () => {
  signInWithPopup(auth, provider) 
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    setUser(user)
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

}
  
