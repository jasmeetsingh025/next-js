import nodemailer from 'nodemailer';
import User from '@/src/modules/userModel';
import bcryptjs from 'bcryptjs';
import { EmailType } from '@/src/helpers/constants';

//* In this File we will create a function to send email
//* and it will be used for verification and password reset,
//* and other purposes as well like welcome email
//* We will use nodemailer to send emails

export const sendEmail = async ({
  email,
  emailType,
  userID,
}: {
  email: string;
  emailType: EmailType;
  userID?: string;
}) => {
  try {
    //* Create hash Token
    const token = await bcryptjs.hash(userID?.toString()!, 10);

    //# Using the email type we will send different types of emails
    if (emailType === EmailType.VERIFICATION) {
      await User.findByIdAndUpdate(userID, {
        verificationToken: token,
        verificationTokenExpiry: Date.now() + 3600000, // 1 hour
        isVerified: false,
      });
    } else if (emailType === EmailType.PASSWORD_RESET) {
      await User.findByIdAndUpdate(userID, {
        passwordResetToken: token,
        passwordResetTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    //# Create a transporter
    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '41a6fce04f278a',
        pass: '433ccb542003b1',
      },
    });

    const mailOptions = {
      from: 'jasmeet8022@gmail.com',
      to: email,
      subject:
        emailType === EmailType.VERIFICATION
          ? 'Verify your email'
          : 'Reset your password',
      text:
        emailType === EmailType.VERIFICATION
          ? `Click on the link to verify your email: ${process.env.NEXT_PUBLIC_BASE_URL}/verifyemail/${token}`
          : `Click on the link to reset your password: ${process.env.NEXT_PUBLIC_BASE_URL}/resetpassword/${token}`,
      html:
        emailType === EmailType.VERIFICATION
          ? `<p>Click on the link to verify your email:</p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/verifyemail?token=${token}">Verify Email</a>`
          : `<p>Click on the link to reset your password:</p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/resetpassword?token=${token}">Reset Password</a>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    console.log('Email sent successfully:', mailResponse);
    return mailResponse;
  } catch (error: any) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};
