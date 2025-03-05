import React from "react";
import { ToastContainer } from "react-toastify";
import AppRouter from "./router/AppRouter";
import AuthContext from "./context/AuthContext";
import MovieContext from "./context/MovieContext";

const App = () => {
  return (
    <div className="">
      <AuthContext>
        <MovieContext>

      
        <AppRouter />
        <ToastContainer />
        </MovieContext>
      </AuthContext>
    </div>
  );
};

export default App;
