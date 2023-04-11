import mongoose from "mongoose";

// Prophecy Schema
const ProphecySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: mongoose.SchemaTypes.ObjectId, required: true },
    createdTime: { type: Date, default: Date.now },
    endTime: { type: Date, require: true }, //要改！
    verifiedTime: { type: Date, default: Date.now }, //require: true }, //要改！！
    isVerified: { type: Boolean, default: false },
    options: {
      type: mongoose.SchemaTypes.Mixed,
      option: String,
      VoterId: {
        type: mongoose.SchemaType.ObjectId,
        ref: "users",
      },
      required: true,
    },
    result: { type: Number, default: -1 },
    category: { type: Array, required: true },
    pic: { type: String },
    numUser: { type: Number, default: 0 },
  },
  { collection: "prophecies" }
);

const ProphecyModel = mongoose.model("prophecies", ProphecySchema);
export default ProphecyModel;
