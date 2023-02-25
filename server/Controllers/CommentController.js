
import express from "express"
import mongoose from "mongoose"
import commentModel from '../Models/commentModel.js'

const router = express.Router()

// Get all comments from DB
router.get('/getAll', async (req, res, next) => {
  commentModel.find((err, CommentData) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Data received!")
      res.end(JSON.stringify(CommentData))

    }
  })
})

//DELETE COMMENTS FROM DB
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id
    const data = await commentModel.findByIdAndDelete(id)
    res.end('Comment has been deleted')
  } catch (error) {
    res.status(400).json({ message: error.message })
    res.end("Post doesn't exist")
  }
})

//DELETE Replies FROM DB
router.delete("/deleteReplies/:parentid", async (req, res) => {
  try {
    const query = { 'parentCommentId': req.params.parentid }
    console.log(query)
    const data = await commentModel.deleteMany(query)
    console.log(data)
    res.send(data.deletedCount + 'Replies has been deleted')
  } catch (error) {
    res.status(400).json({ message: error.message })
    res.send("Post doesn't exist")
  }
})

//UPDATE/EDIT COMMENTS FROM DB
router.patch("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id
    const updatedComment = req.body
    const options = { new: true }

    const result = await commentModel.findByIdAndUpdate(
      id, updatedComment, options
    )

    res.send(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
    res.send({ error: "Post doesn't exist" })
  }
})



// ADD comments into DB
router.post('/add', async (req, res) => {

  const userComment = {
    userId: mongoose.Types.ObjectId(req.body.userId),
    userDisplayName: req.body.userDisplayName,
    prophecyId: mongoose.Types.ObjectId(req.body.prophecyId),
    parentCommentId: req.body.parentCommentId,
    content: req.body.content,
    reply: req.body.reply
  }
  const newComment = new commentModel(userComment)
  try {
    await newComment.save(async (err, newCommentResult) => {
      console.log('New comment created!')
      res.end("comment created")
    })
  } catch (err) {
    console.log(err)
    res.end('Comment not added!')
  }
})


export default router

