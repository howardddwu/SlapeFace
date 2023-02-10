import React, { createContext, useState, useEffect, useReducer } from "react";
import { useCallback } from "react";
import jwt_decode from 'jwt-decode';
import AuthReducer from "../reducers/AuthReducer";



const verifyUser = (string) => {
  //assign result with "user" or "token" accordingly
  let result = localStorage.getItem(string);
  if (string === "user")
    result = JSON.parse(localStorage.getItem("user"))
  
  // get token from local
  let token = localStorage.getItem("token");

  //if there is token, check if token valid
  if (token.length > 5) {
    let decodedToken = jwt_decode(token);;
    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      return null;
    }
    else {
      console.log("Valid token");
      return result
    }
  }

  //there is no token, return null
  console.log("no token in local")
  return null
}

const INITIAL_STATE = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  // token: localStorage.getItem("token") || null,
  user: verifyUser("user") || null,
  token: verifyUser("token") || null,
  isFetching: false,
  error: false,
  isLogin: false,
  loggingOut: false
};


export const AuthContext = createContext(INITIAL_STATE);



export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  useEffect(() => {
    localStorage.setItem("token", state.token)
  }, [state.token])




  // window.location.reload()


  return (
    <AuthContext.Provider
      value={
        {
          user: state.user,
          token: state.token,
          isFetching: state.isFetching,
          error: state.error,
          isLogin: state.isLogin,
          dispatch,
        }
      }>
      {children}
    </AuthContext.Provider>
  );
};
