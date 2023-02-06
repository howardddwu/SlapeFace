import mongoose from "mongoose"

// Prophecy Schema
const ProphecySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now }, //require: true }, //要改！
  verifiedTime: { type: Date, default: Date.now }, //require: true }, //要改！！
  isVerified: { type: Boolean, required: true },
  options: { type: Array, required: true },
  result: { type: Number, default: -1 },
  category: { type: String, required: true },
  pic: { type: String },
  numUser: { type: Number, default: 0 },
}, { collection: 'prophecies' })


const ProphecyModel = mongoose.model('prophecies', ProphecySchema)
export default ProphecyModel