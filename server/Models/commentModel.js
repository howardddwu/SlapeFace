import mongoose from "mongoose"



const CommentSchema = mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  prophecyId: { type: mongoose.Schema.Types.ObjectId},
  replyArr: { type: Array},
  upVotes: { type: Array },
},  { timestamps: true })


const CommentModel = mongoose.model('comments', CommentSchema)
export default CommentModel