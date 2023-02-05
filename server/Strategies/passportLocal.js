import userModel from "../Models/userModel.js";
import passport from "passport";
import bcrypt from "bcrypt"
import { Strategy as localStrategy } from "passport-local";



passport.use(new localStrategy(userModel.authenticate()))


passport.serializeUser(userModel.serializeUser())
passport.deserializeUser(userModel.deserializeUser())
















