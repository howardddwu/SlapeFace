"use strict";
// const nodemailer = require("nodemailer");
// const schedule = require("node-schedule");
import nodemailer from 'nodemailer'
import schedule from 'node-schedule'
function scheduleEmail(endTime,user){
    async function sendEmail(){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'slapfaceproject@gmail.com',
            pass: 'ngtwhyvnpvxxnjhp'
            }
        });
        
        const mailOptions = {
            from: 'slapfaceproject@gmail.com',
            to: user.email,
            subject: 'Reminder To Verify Prophecy',
            text: 'Hi, ' + user.displayname + ' \n it is time to verify your prophecy on Slapface.com',
        };
        
        await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
        console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }

    schedule.scheduleJob(endTime,function(){
        console.log('Email Sent');
        sendEmail()
    })
}


export default scheduleEmail
