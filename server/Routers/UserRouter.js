import express from "express";
import passport from "passport";

import * as UserController from '../Controllers/UserController.js'



const router = express();

//change password:
router.put("/changepassword/:userId", UserController.ChangePassord)

//forget password:
router.put("/forgetpassword/:userId", UserController.ForgetPassword)


//change profile info:
router.put("/editProfile/:userId", UserController.editProfile)






export default router;

