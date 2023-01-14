
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


//TODO: Pasar todo a varibales de entorno
const firebaseConfig = {
  apiKey: "AIzaSyB2bmKZef1BJb9bjXHvRx_MoNYFbKgk45I",
  authDomain: "fir-react-89818.firebaseapp.com",
  projectId: "fir-react-89818",
  storageBucket: "fir-react-89818.appspot.com",
  messagingSenderId: "873914203117",
  appId: "1:873914203117:web:674a2280b8705c5ffc05e4"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth();
auth.languageCode = 'es';