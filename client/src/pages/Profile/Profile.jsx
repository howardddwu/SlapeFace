import React from 'react'
import { Link } from "react-router-dom";
import ChangPassword from './ChangPassword';

import UserProfile from './UserProfile'

const Profile = () => {
    return (
        <div>

            <div style={{marginBottom:"30px"}}>
                <UserProfile />
            </div>


            <div style={{marginBottom:"30px"}}>
                <ChangPassword />
            </div>


            <div style={{marginBottom:"30px"}}>
                <Link className='trouble' to="/home">
                    <button className='button infoButton'>
                        Home
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default Profile