import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hasedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hasedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hasedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "409551860b01c2",
        pass: "87de92629ac797",
        //TODO : add these credentials to env file
      },
    });

    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${hasedToken}`
        : `${process.env.DOMAIN}/resetpassword?id=${userId}`;

    const mailOptions = {
      from: "idineshxd25@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset Password",
      html: `<p>Click <a href="${link}">here</a> to ${
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"
      }</p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
