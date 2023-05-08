
import NotificationModel from "../Models/notificationModel.js";
import mongoose from 'mongoose';

const sockets = (socket) => {


    //when user login, send the user's message data to this user's page
    socket.on('join', async function (data) {
        if (data.userId) {
            await socket.join(data.userId);

            let notifications = await NotificationModel.findOneAndUpdate(
                { userId: data.userId },
                {},
                { upsert: true, new: true }
            );

            // socket.to(data.userId).emit('loginFetch', notifications);
            socket.emit('loginFetch', notifications);
            // socket.in(data.userId).emit('loginFetch', notifications);


        }
    });


    //when system send new messafe to user
    socket.on('new-message', async (data) => {

        //build new message:
        const { sender, recipient, content, prophecyId, prophecyInfo } = data;
        let msg = {
            recipient: recipient,
            sender: sender,
            content: content,
            createdAt: new Date(),
            read: false,
            prophecyId: prophecyId ? prophecyId : null,
            prophecyInfo: prophecyInfo
        }

        // console.log(prophecyInfo)

        // Save the message to the database
        let res = {}
        NotificationModel.findOneAndUpdate(
            { userId: mongoose.Types.ObjectId(recipient) },
            { $push: { msgList: msg } },
            { new: true },
            function (error, success) {
                if (error) {
                    console.log(error);
                }
                else {
                    res = success
                    // Emit the new message to the recipient
                    socket.to(recipient).emit('new-notification', success);
                }
            }
        );

    });

    //when user mark a message as read or unread
    socket.on('read-msg', async (data) => {

        //build new message:
        const { userId, msgId, newUpdate } = data;

        // Save the message to the database
        NotificationModel.findOneAndUpdate(
            { userId: mongoose.Types.ObjectId(userId), 'msgList._id': msgId },
            { $set: { "msgList.$": newUpdate } },
            { new: true },
            function (error, success) {
                if (error) {
                    console.log(error);
                }

            }
        );

    });

    //when user mark a message as read or unread
    socket.on('delete-msg', async (data) => {

        //build new message:
        const { userId, deleteID } = data;

        // Save the message to the database
        // NotificationModel.findOneAndUpdate(
        //     { userId: mongoose.Types.ObjectId(userId)},
        //     { $pull: { 'msgList': mongoose.Types.ObjectId(deleteID) } },
        //     { new: true },
        //     function (error, success) {
        //         if (error) {
        //             console.log(error);
        //         }
        //         else{
        //         }

        //     }
        // );


        await NotificationModel.findOneAndUpdate(
            { userId: userId },
            { $pull: { msgList: { _id: deleteID } } },
            { safe: true, multi: false }
          );


    });



    // const msgController = new MsgController(socket)
    // const roomController = new RoomController(socket)


    // //listen for message event:
    // socket.on('send-message', msgController.sendMessage)


    // //listen for join room event:
    // socket.on('join-room', roomController.joinRoom)
    // socket.on('new-room-created', roomController.newRoomCreated)

    // //listen for room removed event:
    // socket.on('room-removed', roomController.roomRemove)


    // socket.on('disconnect', (data)=>{
    //     console.log("disconnect.")
    // })
}

export default sockets;
