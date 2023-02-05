import express from "express";
import passport from "passport";

import * as AuthController from '../Controllers/AuthController.js'



const router = express();

//regular sign up and login:
router.post('/register', AuthController.checkAlreadyRegistered, AuthController.signUp, passport.authenticate("local"), AuthController.login)
router.post('/login', passport.authenticate("local"), AuthController.login)

router.post('/refreshToken', AuthController.refreshToken)
router.get("/myProfile", passport.authenticate("jwt", { session: false }), AuthController.getMyInfo)
router.get("/logout", passport.authenticate("jwt", { session: false }), AuthController.logOut )


export default router;

