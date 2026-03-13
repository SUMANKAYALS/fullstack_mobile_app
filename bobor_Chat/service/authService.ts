import { API_URL } from "@/constants";
import axios from "axios"

export const login = async (
    email: string,
    password: string
): Promise<{ token: string }> => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
        });
        return response.data;
    } catch (error: any) {
        console.log("got Error: ", error);
        const msg = error?.response?.data?.msg || "Login failed";
        throw new Error(msg);
    }
};


export const register = async (
    email: string,
    password: string,
    name: string,
    avatar?: string | null,
): Promise<{ token: string }> => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            email,
            password,
            name,
            avatar
        });
        return response.data;
    } catch (error: any) {
        console.log("got Error: ", error);
        const msg = error?.response?.data?.msg || "Registration failed";
        throw new Error(msg);
    }
};


// // VERIFY OTP
// export const verifyOtp = async (
//     email: string,
//     otp: string
// ): Promise<{ token: string }> => {

//     try {

//         const response = await axios.post(`${API_URL}/auth/verifyOtp`, {
//             email,
//             otp
//         });

//         return response.data;

//     } catch (error: any) {

//         console.log("Verify OTP Error:", error);

//         const msg =
//             error?.response?.data?.msg || "OTP verification failed";

//         throw new Error(msg);

//     }

// };


// // RESEND OTP
// export const resendOtp = async (
//     email: string
// ): Promise<{ msg: string }> => {

//     try {

//         const response = await axios.post(`${API_URL}/auth/resendOtp`, {
//             email
//         });

//         return response.data;

//     } catch (error: any) {

//         console.log("Resend OTP Error:", error);

//         const msg =
//             error?.response?.data?.msg || "Failed to resend OTP";

//         throw new Error(msg);

//     }

// };