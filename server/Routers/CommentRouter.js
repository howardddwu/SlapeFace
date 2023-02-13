import express from "express";
import passport from "passport";

import * as CommentController from '../Controllers/CommentController.js'



const router = express();

//comment to prophecy:
// router.post('/pComment/:userId/:pId', passport.authenticate("jwt", { session: false }), CommentController.createPcomment)
router.post('/pComment/:userId/:pId', CommentController.createPcomment)

//comment to comment:
// router.post('/cComment/:userId/:cId', passport.authenticate("jwt", { session: false }), CommentController.createCcomment)
router.post('/cComment/:userId/:cId',  CommentController.createCcomment)


router.delete('/clearAll',  CommentController.clearCommentDB)

export default router;

