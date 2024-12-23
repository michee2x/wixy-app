import nodemailer from "nodemailer"

export const sendMail = async (NewsLetterTemplate, endUser, subject) => {
    const transporter = nodemailer.createTransport({
port: 465,               // true for 465, false for other ports
host: "smtp.gmail.com",
   auth: {
        user: 'michaelisraelmike@gmail.com',
        pass: 'qqho eejt yhiu oqoh',
     },
secure: true,
});
const mailData = {from: 'Wixy-marketplace',  // sender address
  to: endUser,   // list of receivers
  subject: subject,
  text: 'That was easy!',
  html: NewsLetterTemplate
};

transporter.sendMail(mailData, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});
}