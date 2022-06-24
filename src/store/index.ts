import { auth, provider } from "@/FirebaseInit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload;
      console.log("auth state changed: ", state.user);
    },
  },
  actions: {
    async signup(context, { email, password }) {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userData) {
        context.commit("updateUser", userData.user);
      } else {
        throw new Error("sign up failed");
      }
    },
    async login(context, { email, password }) {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      if (userData) {
        context.commit("updateUser", userData.user);
      } else {
        throw new Error("sign in failed");
      }
    },
    async googleSignIn(context, payload) {
      const userData = await signInWithPopup(auth, provider);
      if (userData) {
        context.commit("updateUser", userData.user);
      } else {
        throw new Error("Google sign in failed");
      }
    },
  },
});

export default store;
