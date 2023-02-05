import React, { createContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
import AuthReducer from "../reducers/AuthReducer";




const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);



export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  // const getUser = async () => {
  //   try {
  //     const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     setUser(data.user);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);



  return (
    <AuthContext.Provider
      value={
        {
          user: state.user,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
        }
      }>
      {children}
    </AuthContext.Provider>
  );
};
