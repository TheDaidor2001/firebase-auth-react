import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";



export const signInUserFireabse = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const createUserFirebase = (email,password, displayName) => createUserWithEmailAndPassword(auth, email, password, displayName) ;


export const resetPasswordSendEmail = (email) => sendPasswordResetEmail(auth, email)
