import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import Square from './pages/Square/Square';
import Auth from './pages/Auth/Auth';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';

function App() {


  // if no logged user go to explore page ==> "/"
  // if there is user jump to user's home page ==?> "/home"

  return (
    <div className="App">

      <Routes>

        <Route
          exact
          path="/"
          // element={checkValidUser(user) ? <Home user={user} /> : <Navigate to="/login" />}
          element={ <Square/>}
        />

        <Route
          exact
          path="/home"
          element={ <Home /> }
        />

        <Route
          exact
          path="/login"
          element={ <Auth />}
        />
        <Route
          exact
          path="/signup"
          element={ <Register />}
        />

      </Routes>



    </div>
  );
}

export default App;
