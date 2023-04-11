import userModel from "../Models/userModel.js";
import passport from "passport";
import bcrypt from "bcrypt"
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as localStrategy } from "passport-local";

import dotenv from 'dotenv'
dotenv.config()

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


passport.use(new localStrategy(userModel.authenticate()))


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },

        //define callback function
        function (accessToken, refreshToken, profile, done) {
            userModel.findOne({
                providerUserId: profile.id
            }, function (err, user) {
                if (err) {
                    return done(err);
                }

                //No user was found... so create a new user with values from google profile
                if (!user) {
                    //build username
                    const randomID = makeid(5)
                    const mailAddr = profile.emails[0].value
                    const index = mailAddr.indexOf("@")
                    const newName = mailAddr.substring(0, index) + randomID;

                    userModel.register(
                        {
                            username: newName,
                            email: profile.emails[0].value,
                            displayname: profile.displayName ? profile.displayName : newName,
                            provider: 'google',
                            providerUserId: profile.id,
                            // providerProfile: profile._json
                        },
                        makeid(9),
                        function (err, user) {
                            if (err)
                                console.log(err)
                            return done(err, user);
                        }
                    )
                }

                //found user. Return
                else {
                    return done(err, user);
                }
            });
        }
    )
)

passport.serializeUser(userModel.serializeUser())
passport.deserializeUser(userModel.deserializeUser())
















