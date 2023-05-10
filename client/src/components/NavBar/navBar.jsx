import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "./navBar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge } from "antd";

import { AuthContext } from "../../context/AuthProvider";
import * as AuthAction from "../../actions/AuthAction";
import io from "socket.io-client";

const NavBar = ({ socket, length }) => {
  const { isFetching, dispatch, user, token } = useContext(AuthContext);

  const [click, setClick] = useState(false);

  //fetch notification messages via socket
  const unreadMsg = (notifications) => {
    if (notifications) {
      console.log("notifications:    " + notifications.length);

      let unread = notifications.filter((item) => item.read === false);
      return unread.length;
    }
    return 0;
  };

  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);

  const createTest = () => {
    const data = {
      sender: "system",
      recipient: user._id,
      // recipient: '63e73bf3d900c49ddabddfd3',
      content: " this is a test notification",
    };
    socket?.emit("new-message", data);
  };

  const [socketTmp, setSocket] = useState(socket);
  const [msgList, setMsgList] = useState(null);

  // useEffect(() => {
  //     console.log(user)
  //     if (user) {
  //         setSocket(io(process.env.REACT_APP_API_URL));
  //     }
  // }, []);

  // useEffect(() => {
  //     console.log(socket)
  //     if (!socket){
  //         console.log("no socket")
  //         return
  //     }

  //     if (user) {
  //         socket.emit('join', { userId: user._id });
  //         socket.on("loginFetch", function (data) {
  //             setMsgList(data.msgList)
  //             setCount(data.msgList.length)
  //         })
  //     }
  // }, [socket]);

  const handleLogout = async () => {
    await AuthAction.logOut(token, dispatch);
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <span className="navbar-logo">
          <Link className="nav-links" to="/" onClick={closeMobileMenu}>
            SlapeFace
          </Link>
        </span>

        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>

        {checkValidUser(user) ? (
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* <li className="listItem">
                <img
                  src={user.photos[0].value}
                  alt=""
                  className="avatar"
                />
              </li> */}

            <li className="nav-links menu-links greeting">
              Hi, {user.username}
            </li>

            <Link
              to="/"
              className="nav-links menu-links"
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            <Link
              to="/profile"
              className="nav-links menu-links"
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
            <Link
              to="/news"
              className="nav-links menu-links disabled"
              onClick={closeMobileMenu}
            >
              News
            </Link>
            <Link
              to="/rank"
              className="nav-links menu-links disabled"
              onClick={closeMobileMenu}
            >
              Rank
            </Link>

            <Link
              to="/notifications"
              className="nav-links menu-links"
              onClick={closeMobileMenu}
            >
              <div className=" nav-icon">
                <Badge count={length ? length : 0}>
                  {/* <NotificationsNoneIcon className="nav-notification" onClick={createTest} /> */}
                  <NotificationsNoneIcon className="nav-notification" />
                </Badge>

                {/* {
                                notifications.length > 0 &&
                                <div className="counter">{notifications.length}</div>
                            } */}
              </div>
            </Link>

            <Link
              className="nav-links menu-links"
              onClick={handleLogout}
              to="/login"
            >
              LogOut
            </Link>
          </ul>
        ) : (
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <Link
              className="nav-links menu-links"
              to="/login"
              onClick={closeMobileMenu}
            >
              Login
            </Link>

            <Link
              className="nav-links menu-links"
              to="/signup"
              onClick={closeMobileMenu}
            >
              Signup
            </Link>
            <Link
              to="/news"
              className="nav-links menu-links disabled"
              onClick={closeMobileMenu}
            >
              News
            </Link>
            <Link
              to="/rank"
              className="nav-links menu-links disabled"
              onClick={closeMobileMenu}
            >
              Rank
            </Link>
          </ul>
        )}
      </nav>
    </>
  );
};

export default NavBar;

const checkValidUser = (user) => {
  try {
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
