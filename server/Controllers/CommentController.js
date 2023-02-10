import CommentModel from "../Models/commentModel.js";




export const createPcomment = async (req, res) => {

    const { content } = req.body
    const userId = req.params.userId;
    const prophecyId = req.params.pId;

    try {
        const comment = await new CommentModel({
            content, userId, prophecyId
        }).save()
        res.status(200).json(comment)

    } catch (err) {
        res.status(500).json(err)
    }
}


export const createCcomment = async (req, res) => {

    const { content } = req.body
    const userId = req.params.userId;
    const targetCommentId = req.params.cId;

    try {
        const comment = await new CommentModel({
            content, userId
        }).save()

        //add new created comment's id to target Comment replyArr
        CommentModel.updateOne(
            { _id: targetCommentId },
            { $push: { replyArr: comment._id.toString() } },
            function (error, success) {
                if (error) {
                    console.log(error);
                }
            }
        );
        res.status(200).json(comment)

    } catch (err) {
        res.status(500).json(err)
    }
}



//get all comments that belong to a Prophecy (new to old)
export const getAllProphecyComments = async (req, res) => {

}


//get all comments that belong to a comment (new to old)
export const getAllcommentsOfComments = async (req, res) => {

}


export const deleteComment = async (req, res) => {

}







//for testing use
export const clearCommentDB = async (req, res) => {
    try {
        await CommentModel.deleteMany({}, function(err) { 
            console.log('collection removed') 
         })
        res.status(200).json("comment DB cleared.")
    } catch (error) {
        res.status(200).json("comment DB cleared.")
    }
}


