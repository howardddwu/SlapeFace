import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useCallback, useEffect, useState } from 'react';

import Square from './pages/Square/Square';
import Auth from './pages/Auth/Auth';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';

import { AuthContext } from './context/AuthProvider';
import * as AuthAction from './actions/AuthAction';
import Rank from './pages/Rank/Rank';
import Profile from './pages/Profile/Profile';

function App() {

  const { user, token, isLogin, dispatch } = useContext(AuthContext)


  const verifyUser = useCallback(async () => {

    console.log("verifyUser")
    console.log(isLogin)
    if (token) {
      console.log("refresh")
      const iferr = await AuthAction.refreshToken(token, dispatch)
      console.log("t for error, f for success ", iferr)

      if (iferr) {
        //logout(clean user data) and exit function
        return
      }
      setTimeout(verifyUser, 5 * 60 * 1000)
    }

  }, [token])

  useEffect(() => {
    verifyUser()
  }, [user])




  // if no logged user go to explore page ==> "/"
  // if there is user jump to user's home page ==?> "/home"

  return (
    <div className="App">

      <Routes >

        <Route
          exact
          path="/"
          // element={checkValidUser(user) ? <Home user={user} /> : <Navigate to="/login" />}
          // element={ <Square/>}
          element={user ? <Navigate to="/home" /> : <Square />}
        />

        <Route
          exact
          path="/home"
          // element={ <Home /> }
          element={user ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          exact
          path="/login"
          // element={ <Auth />}
          element={user ? <Navigate to="/home" /> : <Auth />}
        />
        <Route
          exact
          path="/signup"
          // element={<Register />}
          element={user ? <Navigate to="/home" /> : <Register />}
        />

        <Route
          exact
          path="/ranking"
          element={<Rank />}
        />

        <Route
          exact
          path="/profile"
          // element={ <Home /> }
          element={user ? <Profile /> : <Navigate to="/login" />}
        />

      </Routes>



    </div>
  );
}

export default App;
