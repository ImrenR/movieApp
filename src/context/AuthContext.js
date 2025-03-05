import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../auth/firebase";
import { toastError, toastSuccess } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";

export const AuthContextt = createContext();

const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    userTakip();
  }, []);
  const createUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      toastSuccess("register işlemi başarılı");

      navigate("/");

      //? USERTAKİPTEN SONRA -----kullanıcı profilini güncellemek için kullanılan firebase metodu, login logout da userTakip sayesinde güncelleniyor ama register da isim güncellemesi yok, o da bu şekilde oluyor.alttakini yazmazsam (register ile girdiğimde) navbarda displayName i göremem. alttakini yazmazsam sadece google ile girersem görürüm
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
    } catch (error) {
      toastError(error.message);
    }
  };


  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    toastSuccess("Your registration is successful");
    navigate("/");
  };
  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        toastSuccess("Sign in with Google successful");
        navigate("/");
      })
      .catch((error) => {
        toastError("Sign in with Google failed");
      });
  };
  const logout = () => {
    signOut(auth);
    toastSuccess("Logout successful");
  };

  //? Firebase method that tracks whether the user is signed in
  //? and returns the new user as a response when the user changes.
  //? It runs once and keeps track of login/logout events.
  //? When logged in, user details are retrieved and stored in currentUser.
  //? When signed out, the currentUser data is updated accordingly.
  //? (To access email, etc., from register and login in the navbar).
  //? When signing in with Google, the user object includes displayName,
  //? but if signing in with email, you must call the update method
  //? from Firebase at the top. (userObserver)

  const userTakip = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;

        setCurrentUser({
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        });
      } else {
        setCurrentUser(false);
      }
    });
  };

  return (
    <AuthContextt.Provider value={{ createUser, signIn, signInGoogle, logout, currentUser }}>
      {children}
    </AuthContextt.Provider>
  );
};

export default AuthContext;
