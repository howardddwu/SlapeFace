import express from "express";
import passport from "passport";

import * as RankController from "../Controllers/RankController.js";



const router = express();


router.get("/weeklyRank", RankController.getWeeklyRank )
router.get("/allRank", RankController.getAllRank )


router.put("/changeWeekPoint/:userId", RankController.changeWeekPoint )
router.put("/changeHighestPoint/:userId", RankController.changeHighestPoint )


//weekly update user points: add the week points to total points.
// router.put("/updatePoints", RankController.updatePoints )



export default router;

