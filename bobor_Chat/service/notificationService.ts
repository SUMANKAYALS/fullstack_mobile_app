import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export async function registerForPushNotificationsAsync() {

    if (!Device.isDevice) {
        alert("Push notifications require a real device");
        return;
    }

    const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
        const { status } =
            await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== "granted") {
        alert("Permission not granted");
        return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;

    console.log("Push Token:", token);

    return token;
}