import express from "express";
import passport from "passport";

import * as SearchController from '../Controllers/SearchController.js'



const router = express();

//change password:
router.post("/searchProphecy", SearchController.searchProphecy)






export default router;

