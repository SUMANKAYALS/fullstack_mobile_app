import { UserProps } from "../types";
import Jwt from "jsonwebtoken";
import transpoter from "./nodemailer";
export const generatedToken = (user: UserProps) => {
    const payload = {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }
    };

    return Jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "30d"
    });
};


export const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

//send Mail
// export const sendMail = async (email: string, subject: string, otp: string) => {
//     await transpoter.sendMail({
//         from: `"Babbar" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: subject,
//         html: `<h2>Your ${subject}is : <b><i>${otp}</i></b></h2><p>Valid for 5 minutes.</p>`,
//     });
// };

export const sendMail = async (
    email: string,
    subject: string,
    otp: string
) => {

    const htmlTemplate = `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px;">
    
    <div style="max-width:500px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 5px 20px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background:#4f46e5; padding:20px; text-align:center;">
        <img 
          src="https://res.cloudinary.com/de7gxfwxm/image/upload/v1772637757/new_app_logo_three_ozsw63.png"
          width="60"
          alt="logo"
        />
        <h2 style="color:white; margin-top:10px;">Chat Verification</h2>
      </div>

      <!-- Body -->
      <div style="padding:30px; text-align:center;">
        
        <h3 style="color:#333;">Email Verification</h3>

        <p style="color:#666; font-size:15px;">
          Use the OTP below to verify your email address.
        </p>

        <!-- OTP BOX -->
        <div style="
          font-size:32px;
          font-weight:bold;
          letter-spacing:6px;
          margin:25px 0;
          color:#4f46e5;
        ">
          ${otp}
        </div>

        <p style="color:#888; font-size:14px;">
          This OTP is valid for <b>5 minutes</b>.
        </p>

        <p style="color:#999; font-size:13px;">
          If you didn’t request this, please ignore this email.
        </p>

      </div>

      <!-- Footer -->
      <div style="
        background:#f9fafb;
        text-align:center;
        padding:15px;
        font-size:12px;
        color:#888;
      ">
        © ${new Date().getFullYear()} Babbar Chat. All rights reserved.
      </div>

    </div>

  </div>
  `;

    await transpoter.sendMail({
        from: `"Babbar Chat" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html: htmlTemplate,
    });
};