import { useState, useContext } from 'react'

import "./Register.css"
import * as AuthAPI from "../../API/AuthAPI.js"
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthProvider';
import * as AuthAction from "../../actions/AuthAction"

const Register = () => {

  const { isFetching, dispatch, user } = useContext(AuthContext);


  const initData = {
    email: "",
    username: "",
    displayname: "",
    password: "",
    confirmPassword: ""
  }

  const [formData, setData] = useState(initData);

  const changeData = (e) => {
    setData(
      { ...formData, [e.target.name]: e.target.value }
    )
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (checkForm()) {
      const ifErr = await AuthAction.signUp(formData, dispatch)
      if(ifErr)
        setBadInfo(8)
    }
  }



  const [badInfo, setBadInfo] = useState(0);
  const checkForm = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (formData.email.length === 0) {
      setBadInfo(1)
      return false;
    }
    else if (!re.test(formData.email)) {
      setBadInfo(6)
      return false;
    }
    if (formData.username.length === 0) {
      setBadInfo(2)
      return false;
    }
    if (formData.displayname.length === 0) {
      setBadInfo(7)
      return false;
    }
    else if ((formData.password.length === 0)) {
      setBadInfo(3)
      return false;
    }
    else if ((formData.confirmPassword.length === 0)) {
      setBadInfo(4)
      return false;
    }
    else if (formData.password !== formData.confirmPassword) {
      setBadInfo(5)
      return false;
    }
    return true;
  }

  //=====================================================================================
  return (
    <div className="auth">
      <div className="authContainer">

        <form className="infoForm authform">
          <span className='authTitle' style={{ marginBottom: "10px" }}>User Signup</span>
          <span className='authDesc' style={{ marginBottom: "7px" }}>Enter your infomation to create your own account!</span>

          {badInfo === 1 &&
            <span className='authDesc failAuth'>Email cannot be empty!</span>
          }
          {badInfo === 2 &&
            <span className='authDesc failAuth'>Username cannot be empty!</span>
          }
          {badInfo === 3 &&
            <span className='authDesc failAuth'>Password cannot be empty!</span>
          }
          {badInfo === 4 &&
            <span className='authDesc failAuth' style={{ width: "80%" }}>Please enter the confirmPassword!</span>
          }
          {badInfo === 5 &&
            <span className='authDesc failAuth' style={{ width: "80%" }}>Comfirm password is wrong. Confirm the Password again!</span>
          }
          {badInfo === 6 &&
            <span className='authDesc failAuth'>Invalid E-mail form!</span>
          }
          {badInfo === 7 &&
            <span className='authDesc failAuth'>Display Name cannot be empty!</span>
          }
          {badInfo === 8 &&
            <span className='authDesc failAuth'>Username or Email has been used already.</span>
          }

          <div className='infoInputWraper'>
            <input
              className="infoInput"
              required
              type="email"
              placeholder='E-mail'
              value={formData.email}
              name="email"
              onChange={changeData} />
          </div>

          <div className='infoInputWraper'>

            <input
              className="infoInput"
              required
              type="text"
              placeholder='username'
              value={formData.username}
              name="username"
              onChange={changeData} />
          </div>

          <div className='infoInputWraper'>

            <input
              className="infoInput"
              required
              type="text"
              placeholder='displayname'
              value={formData.displayname}
              name="displayname"
              onChange={changeData} />
          </div>


          <div className='infoInputWraper'>

            <input
              className="infoInput"
              required
              type="password"
              placeholder='password'
              value={formData.password}
              name="password"
              onChange={changeData} />
          </div>


          <div className='infoInputWraper'>

            <input
              className="infoInput"
              required
              type="password"
              placeholder='confirm password'
              value={formData.confirmPassword}
              name="confirmPassword"
              onChange={changeData} />
          </div>
          <span className='trouble'>
            <Link className='trouble' to="/login">Already had a account? Log in!</Link>
          </span>
          <br />
          <span style={{ display: "none" }}>
            error
          </span>

          <button
            className='button infoButton'
            onClick={handleSubmit}>Submit
          </button>

        </form>
      </div>
    </div>
  )
}

export default Register