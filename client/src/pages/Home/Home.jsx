import React from 'react'
import { useState, useContext } from 'react'


import { AuthContext } from '../../context/AuthProvider';
import * as AuthAction from "../../actions/AuthAction"
import { myInfo } from '../../API/AuthAPI';


const Home = () => {

  const { isFetching, dispatch, user, token } = useContext(AuthContext);

  const handleLogout = async() => {
    await AuthAction.logOut(token, dispatch)
    // window.location.reload()
  }

  const refreshToken = async() => {
    await AuthAction.refreshToken(token, dispatch)
  }


  const handleMyInfo = async() => {
    
    const res = await myInfo(token);
    console.log(res)
    // window.location.reload()
  }


  return (
    <div>

      <h1>User's home page</h1>
      {user &&
        <div>
          <h3>User Info:</h3>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      }

      <button
        className='button infoButton'
        onClick={handleLogout}>Log Out
      </button>
      {/* <button
        className='button infoButton'
        onClick={refreshToken}>Refresh Token
      </button> */}
      <button
        className='button infoButton'
        onClick={handleMyInfo}>My Info
      </button>

    </div>
  )
}

export default Home