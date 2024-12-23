import nodemailer from "nodemailer"


export const sendMail = async (loggedUser,subject, verifyLink) => {
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
  to: loggedUser?.email,   // list of receivers
  subject: subject,
  text: 'That was easy!',
  html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <script src="https://cdn.tailwindcss.com"></script> -->
    <title>Document</title>
</head>
<body style="max-width: 100vw ;width: 100vw; max-height: 100vh; color: lightblue; background-color: rgb(3, 3, 29); font-family: Verdana, Geneva, Tahoma, sans-serif; text-align: center; display: flex; flex-direction: column; gap: .2rem; padding-top: 1rem;">
    <p style="text-align: center; font-size: larger;">Email Address Verification</p>
    <p>Hi ${loggedUser?.name} <br> 
    <p>To finish setting up your</p>
    <p>account and start using</p>
    <p>wixy market-place, please verify</p>
    <p>your email address</p>
    
</p>

   <a href=${verifyLink}> <button style="width: 13rem;color: aliceblue; height: 2.8rem; background-color: rgb(20, 7, 95); margin: 0 auto; border-radius: 10px;">VerifyEmail</button></a>

    <p>This link will expire after 2 link please
    </p>
    <p>hours. To request another</p>
    <p>verification</p>
    <p><a href="https://wixy-app.onrender.com/auth">login</a> to prompt</p>
    <p>a re-send link</p>

    <p>Wixy market-place - Bayelsa Nigeria</p>
</body>
</html>
        
        `
};

transporter.sendMail(mailData, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});
}