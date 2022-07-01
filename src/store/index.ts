import { auth, provider } from "@/FirebaseInit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
    isAuthReady: false,
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload;
    },
    setAuthReady(state, payload) {
      state.isAuthReady = true;
    },
  },
  actions: {
    async signup(context, { displayName, email, password }) {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userData) {
        await updateProfile(auth.currentUser!, {
          displayName: displayName,
        });
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

    async logout(context) {
      await signOut(auth);
      context.commit("updateUser", null);
    },
  },
});

const stop = onAuthStateChanged(auth, (user) => {
  store.commit("setAuthReady");
  store.commit("updateUser", user);
  stop();
});

export default store;
