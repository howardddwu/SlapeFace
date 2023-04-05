import express from "express"
import mongoose from "mongoose"
import prophecyModel from '../Models/prophecyModel.js'
import userModel from "../Models/userModel.js"

const router = express.Router()




//get user's all votes with user's username, displayname and pic
const getUserProphecy = async (req, res) => {

  const userId = req.params.userId

  try {
    let prophecies = await prophecyModel.find({ author: userId })
    let user = await userModel.findById(userId)
    let { username, displayname, icon } = user

    res.status(200).json(prophecies.concat({ username, displayname, icon }))

  } catch (error) {
    res.status(400).json(error)
  }
}








// Get all prophecy from DB
router.get('/getAll', async (req, res, next) => {
  prophecyModel.find((err, ProphecyData) => {
    if (err) {
      console.log(err)
    } else {
      // console.log("Data received!")
      res.end(JSON.stringify(ProphecyData))

    }
  })
})

// ADD new prophecy into DB
router.post('/add', async (req, res) => {
  const prophecyData = {
    title: req.body.title,
    description: req.body.description,
    author: mongoose.Types.ObjectId(req.body.author),
    //下面2个前端处理后添加
    //endTime: req.body.endTime,
    //verifiedTime: req.body.verifiedTime, 
    options: req.body.options,
    category: req.body.category,
  }
  const newProphecy = new prophecyModel(prophecyData)
  try {
    await newProphecy.save(async (err, newProphecyResult) => {
      console.log('New prophecy created!')
      res.end("prophecy created")
    })
  } catch (err) {
    console.log(err)
    res.end('prophecy not created!')
  }
})

// UPDATE any data in prophecy
router.patch("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id
    const updated = req.body
    const options = { new: true }

    const result = await prophecyModel.findByIdAndUpdate(
      id, updated, options
    )

    res.send(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
    res.send({ error: "prophecy doesn't exist" })
  }
})


router.get("/get/:userId", getUserProphecy)


export default router