import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';

import Square from './pages/Square/Square';
import Auth from './pages/Auth/Auth';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';

import { AuthContext } from './context/AuthProvider';
import * as AuthAction from './actions/AuthAction';
import * as NoAction from './actions/NotificationAction';

import Rank from './pages/Rank/Rank';
import Profile from './pages/Profile/Profile';
import GoogleAuth from './pages/Auth/GoogleAuth';
import Guidance from './components/BeginnerGuidance/Guidance.jsx';
import NavBar from './components/NavBar/navBar';
import Notification from './pages/Notification/Notification';


function App() {

  const { user, token, isLogin, dispatch } = useContext(AuthContext)


  const verifyUser = useCallback(async () => {

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


  const connectSocket = async () => {

  }

  const [socket, setSocket] = useState(null);
  const [msgList, setMsgList] = useState([])
  const [unread, setUnread] = useState(0)

  //fetch notification messages via socket
  const unreadMsg = (notifications) => {
    if (notifications) {
      let unread = notifications.filter((item) => item.read === false)
      setUnread(unread.length)
    }
    else {
      setUnread(0)
    };
  }

  useEffect(() => {
    if (user) {
      setSocket(io(process.env.REACT_APP_API_URL));
    }
  }, [user]);

  useEffect(() => {

    if (!socket) {
      console.log("no socket")
      return
    }

    if (user) {
      socket.emit('join', { userId: user._id });

      NoAction.setSocket(socket, dispatch);

      socket.on("loginFetch", function (data) {
        setMsgList(data.msgList)
        unreadMsg(data.msgList)
      })

      socket.on("new-notification", function (data) {
        setMsgList(data.msgList)
        unreadMsg(data.msgList)
      })
    }
  }, [socket]);




  // if no logged user go to explore page ==> "/"
  // if there is user jump to user's home page ==?> "/home"

  return (
    <div className="App">

      <NavBar length={unread} socket={socket} />


      <Routes >

        <Route
          exact
          path="/"
          // element={checkValidUser(user) ? <Home user={user} /> : <Navigate to="/login" />}
          // element={ <Square/>}
          element={user ? <Navigate to="/home" /> : <Square />}
        />

        {/* <Route
          exact
          path="/"
          // element={checkValidUser(user) ? <Home user={user} /> : <Navigate to="/login" />}
          // element={ <Square/>}
          element={user ? (user.notfirstLogin ? <Navigate to="/home" /> : <Navigate to="/newUserSetting" />) : <Square />}
        /> */}

        {/* <Route
          exact
          path="/home"
          // element={ <Home /> }
          element={user ? <Home /> : <Navigate to="/login" />}
        /> */}

        <Route
          exact
          path="/home"
          // element={ <Home /> }
          element={user ? (user.notfirstLogin ? <Home /> : <Navigate to="/newUserSetting" />) : <Navigate to="/login" />}
        />

        <Route
          exact
          path="/newUserSetting"
          // element={ <Auth />}
          element={user ? (user.notfirstLogin ? <Home /> : <Guidance />) : <Navigate to="/login" />}
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
          element={user ? <Profile socket={socket}/> : <Navigate to="/login" />}
        />

        <Route
          exact
          path="/dashboard"
          // element={ <Home /> }
          element={<GoogleAuth />}
        />

        <Route
          exact
          path="/notifications"
          element={user ?
            <Notification notifications={msgList} socket={socket} setUnread={setUnread} setMsgList={setMsgList}/>
            : 
            <Navigate to="/home" />}
        />

      </Routes>



    </div>
  );
}

export default App;
