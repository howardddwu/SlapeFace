import express from "express";
import passport from "passport";

import * as SearchController from '../Controllers/SearchController.js'



const router = express();

//change password:
router.post("/searchProphecy", SearchController.searchProphecy)



router.get("/searchProphecyByID/:id", SearchController.searchProphecyByID)



export default router;

