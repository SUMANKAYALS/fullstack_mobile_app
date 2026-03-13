// import { Platform } from "react-native";

// export const API_URL =
//     Platform.OS === "android"
//         ? "http://10.0.2.2:3000"
//         : "http://localhost:3000";


import { Platform } from "react-native";

const LOCAL_IP = "192.168.0.3";

export const API_URL = Platform.OS === "android" ? `http://${LOCAL_IP}:5000` : `http://${LOCAL_IP}:5000`;


export const CLOUDINARY_CLOUD_NAME = "de7gxfwxm";

export const CLOUDINARY_UPLOAD_PRESET = "Mr_gigal";