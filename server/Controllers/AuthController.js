import passport from "passport";
import jwt from "jsonwebtoken";

import userModel from "../Models/userModel.js";
import { COOKIE_OPTIONS, getToken, getRefreshToken } from "../Strategies/token.js";



/**************************************************
* function to check if user is already registered *
***************************************************/
export const checkAlreadyRegistered = async (req, res, next) => {

    const { email, username } = req.body

    // logic to find user by username and eamil
    // if found any, return 400
    try {
        const userFoundByEmail = await userModel.findOne({ email })
        const userFoundByUsername = await userModel.findOne({ username })
        if (userFoundByEmail || userFoundByUsername) {
            return res.status(400).json({ message: "Email or username was used." })
        }
    } catch (err) {
        res.status(500).json({ message: err })
    }

    next();
}


/***************************************
* function to register a regular user  *
****************************************/
export const signUp = async (req, res, next) => {
    const { username, password, email } = req.body

    try {
        await userModel.register(
            new userModel({ username: username, email: email }),
            password
        )

    } catch (error) {
        res.status(500).json(error)
    }

    next();
}


/******************
* REGULAR LOGIN   *
********************/
export const login = async (req, res) => {
    //get user info from header
    const token = getToken({ _id: req.user._id })
    const refreshToken = getRefreshToken({ _id: req.user._id })

    try {
        const user = await userModel.findById(req.user._id)
        user.refreshToken.push({ refreshToken });
        await user.save();

        //due to COOKIE_OPTIONS, this creates a signed cookie and can be accessed in req.signedCookies 
        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
        res.status(200).json({ success: true, token, user })
    } catch (error) {
        res.status(500).json(error)
    }

}

/***************
*  LOG OUT  *
****************/
export const logOut = async (req, res) => {

    //get current token from header 
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies

    try {
        const user = await userModel.findById(req.user._id);
        const tokenIndex = user.refreshToken.findIndex(
            item => item.refreshToken === refreshToken
        )
        if (tokenIndex !== -1) {
            user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
        };
        await user.save();

        req.logout()
        // console.log(req.user)

        res.clearCookie("refreshToken", COOKIE_OPTIONS)
        res.status(200).json({ logOut: true })

    } catch (error) {
        res.status(500).json(error)
    }

}



/******************************
*  Send current user profile  *
*******************************/
export const getMyInfo = (req, res) => {

    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json(error)
    }
}





export const refreshToken = (req, res, next) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies


    if (refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const userId = payload._id
            userModel.findOne({ _id: userId }).then(
                user => {
                    if (user) {
                        // Find the refresh token against the user record in database
                        const tokenIndex = user.refreshToken.findIndex(
                            item => item.refreshToken === refreshToken
                        )

                        if (tokenIndex === -1) {
                            res.statusCode = 401
                            res.send("Unauthorized")
                        } else {
                            const token = getToken({ _id: userId })
                            // If the refresh token exists, then create new one and replace it.
                            const newRefreshToken = getRefreshToken({ _id: userId })
                            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
                            user.save((err, user) => {
                                if (err) {
                                    res.statusCode = 500
                                    res.send(err)
                                } else {
                                    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                                    res.send({ success: true, token })
                                }
                            })
                        }
                    } else {
                        res.statusCode = 401
                        res.send("Unauthorized")
                    }
                },
                err => next(err)
            )
        } catch (err) {
            res.statusCode = 401
            res.send("Unauthorized")
        }
    } else {
        res.statusCode = 401
        res.send("Unauthorized")
    }
}

