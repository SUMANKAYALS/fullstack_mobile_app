import { Request, Response } from "express";
import User from "../model/user";
import bcrypt from "bcrypt";
import { generatedToken } from "../utility/token";


// register 

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name, avatar } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ success: false, msg: "User already exists" });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // const otp = generateOtp();
        user = new User({
            email,
            password: hashedPassword,
            name,
            avatar: avatar || "",
            // otp,
            // otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
            // isVerified: false,
        });


        await user.save();

        // res.status(201).json({
        //     success: true,
        //     msg: "User registered successfully",
        // });
        // await sendMail(email, "Email Verification OTP", otp);
        const token = generatedToken(user);

        res.status(201).json({
            success: true,
            msg: "User registered successfully",
            token
        });

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ success: false, msg: "Server error" })
    }
};


// // otp verification mail

// export const verifyOtp = async (req: Request, res: Response) => {

//     const { email, otp } = req.body;

//     try {

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({
//                 msg: "User not found"
//             });
//         }

//         if (user.otp !== otp) {
//             return res.status(400).json({
//                 msg: "Invalid OTP"
//             });
//         }

//         if (user.otpExpiry && user.otpExpiry < new Date()) {
//             return res.status(400).json({
//                 msg: "OTP expired"
//             });
//         }

//         user.isVerified = true;
//         user.otp = undefined;
//         user.otpExpiry = undefined;

//         await user.save();

//         const token = generatedToken(user);

//         res.json({
//             success: true,
//             msg: "Email verified successfully",
//             token
//         });

//     } catch (error) {

//         res.status(500).json({
//             msg: "Server error"
//         });

//     }

// };

// // resendOtp route

// export const resendOtp = async (req: Request, res: Response) => {

//     const { email } = req.body;

//     try {

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 msg: "User not found"
//             });
//         }

//         if (user.isVerified) {
//             return res.status(400).json({
//                 success: false,
//                 msg: "User already verified"
//             });
//         }

//         const otp = generateOtp();

//         user.otp = otp;
//         user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

//         await user.save();

//         await sendMail(email, "Resend OTP", otp);

//         res.json({
//             success: true,
//             msg: "OTP resent successfully"
//         });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             success: false,
//             msg: "Server error"
//         });

//     }

// };

// login route

export const loginUser = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                success: false,
                msg: "Invalid email or password"
            });
            return;
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({
                success: false,
                msg: "Invalid email or password"
            });
            return;
        }

        // // check email verification
        // if (!user.isVerified) {
        //     res.status(400).json({
        //         success: false,
        //         msg: "Please verify your email first"
        //     });
        //     return;
        // }

        const token = generatedToken(user);

        res.json({
            success: true,
            msg: "Login successful",
            token
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            msg: "Server error"
        });

    }

};