import nodemailer from "nodemailer"
import { returnPage } from "./returnPage.mjs";


export const sendMail = async (loggedUser,subject, verifyLink, status) => {
    const transporter = nodemailer.createTransport({
port: 465,               // true for 465, false for other ports
host: "smtp.gmail.com",
   auth: {
        user: 'michaelisraelmike@gmail.com',
        pass: 'phkp kuni wiqp qqnb',
     },
secure: true,
});
const mailData = {from: 'Wixy-marketplace',  // sender address
  from: "wixy-app",
  to: loggedUser?.email,   // list of receivers
  subject: subject,
  text: 'That was easy!',
  html: returnPage(loggedUser?.name, verifyLink, status)
};

transporter.sendMail(mailData, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});
}