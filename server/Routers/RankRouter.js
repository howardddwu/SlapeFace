import express from "express";
import passport from "passport";

import * as RankController from "../Controllers/RankController.js";



const router = express();


router.get("/weeklyRank", RankController.getWeeklyRank )
router.get("/allRank", RankController.getAllRank )


router.put("/changeWeekPoint/:userId", RankController.changeWeekPoint )
router.put("/changeHighestPoint/:userId", RankController.changeHighestPoint )


export default router;

