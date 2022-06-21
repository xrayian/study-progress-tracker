// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrsKN9xo9BRVZlgY3hn1u-weSVuDyYQPc",
  authDomain: "amar-progress.firebaseapp.com",
  projectId: "amar-progress",
  storageBucket: "amar-progress.appspot.com",
  messagingSenderId: "193034373677",
  appId: "1:193034373677:web:0993316a2579b41f5206a4",
  measurementId: "G-4VJTBCNQTC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
