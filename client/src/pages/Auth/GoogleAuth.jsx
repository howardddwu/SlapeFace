import React, { useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import * as AuthAction from "../../actions/AuthAction"
import { AuthContext } from '../../context/AuthProvider';


const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 48,
        }}
        spin
    />
);

const GoogleAuth = () => {

    const navigate = useNavigate();

    const { isFetching, dispatch } = useContext(AuthContext);

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    const logInGoogle = async () => {
        //try to get token if there is
        let decodedToken, expDate, userID, token;
        try {
            token = urlParams.get('token');
            decodedToken = jwt_decode(token);
            userID = decodedToken._id
            expDate = decodedToken.exp * 1000

        } catch (error) {
            //No valid user, navigate to login page:
            navigate("/login");
        }

        let currentDate = new Date();

        if (expDate < currentDate.getTime()) {
            navigate("/login");
        }

        //valid token, use userId to fetch user info to finish login
        const ifErr = await AuthAction.GoogleLogIn(userID, { TOKEN: token }, dispatch)
        if (ifErr) {
            navigate("/login");
        }
        else {
            navigate("/");
        }
    }



    useEffect(
        () => { logInGoogle() },
        []
    )


    return (
        <div style={{ width: '100%', marginTop: '35%', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Spin indicator={antIcon} />
        </div>
    )
}

export default GoogleAuth