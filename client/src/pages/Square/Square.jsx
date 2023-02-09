import React from 'react'
import { Link } from "react-router-dom";


const Square = () => {

  
  return (
    <div>

      <h1>
        Display this page when no user logged in. ("/")
      </h1>


      <Link className='trouble' to="/login">
        <button className='button infoButton'>
          Sign in
        </button>
      </Link>
    </div>

  )
}

export default Square