import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDm-EH_bsf5J49X-yJNUVKWbqRHuCMCXWw",
  authDomain: "aufgabe-e6ea6.firebaseapp.com",
  projectId: "aufgabe-e6ea6",
  storageBucket: "aufgabe-e6ea6.appspot.com",
  messagingSenderId: "1080558527948",
  appId: "1:1080558527948:web:2059e07f755e6b5966e969",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
