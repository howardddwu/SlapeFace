import express from "express"
import mongoose from "mongoose"
import prophecyModel from '../Models/prophecyModel.js'

const router = express.Router()

// Get all prophecy from DB
router.get('/getAll', async (req, res, next) => {
  prophecyModel.find((err, ProphecyData) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Data received!")
      res.end(JSON.stringify(ProphecyData))

    }
  })
})

// ADD new prophecy into DB
router.post('/add', async (req, res) => {
  console.log(req)
  const prophecyData = {
    title: req.body.title,
    description: req.body.description,
    author: mongoose.Types.ObjectId(req.body.author),
    //下面2个前端处理后添加
    //endTime: req.body.endTime,
    //verifiedTime: req.body.verifiedTime, 
    isVerified: req.body.isVerified,
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


export default router