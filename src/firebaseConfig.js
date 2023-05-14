// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEkL8NVSpW_KO5RV6u1CPkTCIDGzx9etw",
  authDomain: "udemy-vue3-9e733.firebaseapp.com",
  projectId: "udemy-vue3-9e733",
  storageBucket: "udemy-vue3-9e733.appspot.com",
  messagingSenderId: "742012871757",
  appId: "1:742012871757:web:5deb4e65ebb2138468a804"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

export { auth }