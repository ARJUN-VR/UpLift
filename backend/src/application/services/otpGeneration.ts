import { configKeys } from "../../frameworks/database/mongoDb/config";
import nodemailer from 'nodemailer';

const sendOTP = async (email:string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: configKeys.MAIL_USERNAME,
      pass: configKeys.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, 
    },
  });

  const otp :number = Math.floor(Math.random()*10000)


  const mailOptions = {
    from: 'arjarjun2004@gmail.com',
    to: `${email}`,
    subject: 'Reset password -UpLift',
    text: `Your OTP for changing password is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return otp
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export default sendOTP;
