// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnN5h1A3ShlgNxSakdLJwISjWLTXT8kzo",
  authDomain: "chat-w-pdf-c1f5c.firebaseapp.com",
  projectId: "chat-w-pdf-c1f5c",
  storageBucket: "chat-w-pdf-c1f5c.appspot.com",
  messagingSenderId: "983018737227",
  appId: "1:983018737227:web:695b3deae1fdf6497247ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};