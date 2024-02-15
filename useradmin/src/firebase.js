// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "useradmin-9c64e.firebaseapp.com",
  projectId: "useradmin-9c64e",
  storageBucket: "useradmin-9c64e.appspot.com",
  messagingSenderId: "552188313857",
  appId: "1:552188313857:web:e56eb904f235271ad61b00",
  measurementId: "G-5PEGEPVBPV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
