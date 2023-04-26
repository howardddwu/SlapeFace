import React, { createContext, useState, useEffect, useReducer } from "react";
import { useCallback } from "react";
import jwt_decode from 'jwt-decode';
import AuthReducer from "../reducers/AuthReducer";



const verifyUser = (string) => {
  //assign result with "user" or "token" accordingly
  let result = localStorage.getItem(string);
  if (string === "user") {
    try {
      result = JSON.parse(localStorage.getItem("user"))
    } catch (error) {
      return null;
    }
  }

  // get token from local
  let token = localStorage.getItem("token");

  //if there is token, check if token valid
  if (token && token.length > 5 && token!=="undefined") {
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
  loggingOut: false,
  socket: null
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
          socket: state.socket,
          dispatch,
        }
      }>
      {children}
    </AuthContext.Provider>
  );
};
