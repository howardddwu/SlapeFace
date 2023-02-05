import userModel from "../Models/userModel.js";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import dotenv from 'dotenv';
dotenv.config();

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET



// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // Check against the DB only if necessary.
    // This can be avoided if you don't want to fetch user details in each request.
    userModel.findOne({ _id: jwt_payload._id }, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
        // or you could create a new account
      }
    })
  })
)






