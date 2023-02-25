import mongoose from "mongoose"

// Prophecy Schema
const CommentSchema = mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  userDisplayName: { type: String, required: true },
  prophecyId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  parentCommentId: { type: String, required: true },
  content: { type: String, required: true },
  reply: { type: Boolean, required: true },
  createAt: { type: Date, default: Date.now },
  upVotes: { type: Array, default: [] },
}, { collection: 'comments' })


const CommentModel = mongoose.model('comments', CommentSchema)
export default CommentModel