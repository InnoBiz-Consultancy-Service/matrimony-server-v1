// src/app/modules/mail/mail.service.ts
import { transporter } from "../../../config/mailer";
import AppError from "../../../errors/AppError";
import User from "../user/user.model";
import { IMailPayload } from "./sendMail.interface";
import { Mail } from "./sendMail.model";

const sendMail = async (emails: string[], payload: IMailPayload, senderEmail: string, senderId: string) => {
  const { subject, body } = payload;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails,
    subject,
    html: `<p>${body}</p>`,
  };

  await transporter.sendMail(mailOptions);

 
  await Mail.create({
    subject,
    body,
    senderEmail: senderEmail,
    senderId: senderId,
    recipients: emails,
  });

  return { success: true, senderEmail: senderEmail, recipients: emails };
};


const sendMailToSingleUser = async (email: string, payload: IMailPayload, senderEmail: string, senderId: string) => {
  const user = await User.findOne({ email, isVerified: true });

  if (!user) {
    throw new AppError(404, "Verified user not found");
  }

  return await sendMail([email], payload, senderEmail, senderId);
};


const sendMailToAllUsers = async (payload: IMailPayload, senderEmail: string, senderId: string) => {
  const users = await User.find({ isVerified: true }).select("email");

  const emails = users.map((u) => u.email);
  if (emails.length === 0) {
    throw new AppError(404, "No verified users found");
  }

  return await sendMail(emails, payload, senderEmail, senderId);
};


const getAllMails = async () => {
  return await Mail.find()
    .populate("senderId", "name email")
    .sort({ createdAt: -1 });
};

export const MailService = {
  sendMailToSingleUser,
  sendMailToAllUsers,
  getAllMails,
};
