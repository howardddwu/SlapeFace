import jwt from "jsonwebtoken";
import passport from "passport";


export const COOKIE_OPTIONS = {
    httpOnly: true,
    // secure: false,
    signed: true,
    maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
    sameSite: "none",
}



export const getToken = (userId) => {
    return jwt.sign(userId, process.env.JWT_SECRET, {
        expiresIn: eval(process.env.SESSION_EXPIRY),
    })
}

export const getRefreshToken = userId => {
    const refreshToken = jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
    })
    return refreshToken
}


export const verifyUser = passport.authenticate("jwt", { session: false })

