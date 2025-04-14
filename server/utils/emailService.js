import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email provider
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-email-password', // Replace with your email password
    },
  });

  const verificationLink = `http://localhost:3000/verify?token=${token}`;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Verify Your Account',
    html: `<p>Please verify your account by clicking the link below:</p>
           <a href="${verificationLink}">${verificationLink}</a>`,
  };

  await transporter.sendMail(mailOptions);
};