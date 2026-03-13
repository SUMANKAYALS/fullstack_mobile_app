// import { Platform } from "react-native";

// export const API_URL =
//     Platform.OS === "android"
//         ? "http://10.0.2.2:3000"
//         : "http://localhost:3000";


import { Platform } from "react-native";

// const LOCAL_IP = "192.168.0.3";

// export const API_URL = Platform.OS === "android" ? `http://${LOCAL_IP}:5000` : `http://${LOCAL_IP}:5000`;


const LOCAL_IP = "192.168.0.3";

const LOCAL_API = `http://${LOCAL_IP}:5000`;
const RENDER_API = "https://fullstack-mobile-app-backend.onrender.com";

export const API_URL = __DEV__ ? LOCAL_API : RENDER_API;


export const CLOUDINARY_CLOUD_NAME = "de7gxfwxm";

export const CLOUDINARY_UPLOAD_PRESET = "Mr_gigal";