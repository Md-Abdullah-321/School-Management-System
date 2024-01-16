// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhqRZAYbLyo4WGrAaFQNE3VOA6ipBu5Xk",
  authDomain: "school-management-system-ede3f.firebaseapp.com",
  projectId: "school-management-system-ede3f",
  storageBucket: "school-management-system-ede3f.appspot.com",
  messagingSenderId: "747271706120",
  appId: "1:747271706120:web:e776b171713d4fae7aa3bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);