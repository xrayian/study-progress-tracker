import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrsKN9xo9BRVZlgY3hn1u-weSVuDyYQPc",
  authDomain: "amar-progress.firebaseapp.com",
  projectId: "amar-progress",
  storageBucket: "amar-progress.appspot.com",
  messagingSenderId: "193034373677",
  appId: "1:193034373677:web:0993316a2579b41f5206a4",
  measurementId: "G-4VJTBCNQTC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
