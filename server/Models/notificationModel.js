import mongoose from "mongoose"


const MessageSchema = new mongoose.Schema({
  content: { type: String, default: "defualt content" },
  sender: { type: String, default: "system" },    //default: "system"
  recipient: String, //userID
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  prophecyId: { type: String, default: null }
});




// Notification Schema
// each user have only single notification 
// each notification continas a user's many messages.
const NotificationSchema = mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  // msgList: { type: Array, default: [] },
  msgList: { type: [MessageSchema], default: [] },

}, { collection: 'notification' })


const NotificationModel = mongoose.model('notification', NotificationSchema)
export default NotificationModel


