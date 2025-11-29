import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this to another service or use host/port
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({
  subject,
  text,
  html,
}: {
  subject: string;
  text: string;
  html?: string;
}) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO, // Send to yourself
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
};
