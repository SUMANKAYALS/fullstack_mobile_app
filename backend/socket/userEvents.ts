import { Socket, Server as SocketIOServer } from "socket.io";
import user from "../model/user";
import { generatedToken } from "../utility/token";



export function registerUserEvents(io: SocketIOServer, socket: Socket) {
    socket.on("testSocket", (data) => {
        console.log("Client sent:", data);

        socket.emit("testSocket", {
            msg: "realtime test",
        });
    });

    socket.on("updateProfile", async (data: { name?: string; avatar?: string }) => {
        console.log("updateprofile event", data);


        const userId = socket.data.userId;
        if (!userId) {
            return socket.emit("updateProfile", {
                success: false,
                msg: "Unauthorized",
            });
        };

        try {
            const updatedUser = await user.findByIdAndUpdate(userId, { name: data.name, avatar: data.avatar }, { new: true });

            if (!updatedUser) {
                return socket.emit("updateProfile", {
                    success: false,
                    msg: "User not found",
                });
            };


            // gen token with updated value
            const newToken = generatedToken(updatedUser);
            socket.emit("updateProfile", {
                success: true,
                data: { token: newToken },
                msg: "Profile updated successfilly",
            })
        } catch (error) {
            console.log("Error updating profile: ", error);
            socket.emit("updateProfile", {
                success: false,
                msg: "Error updating profile",
            });
        };
    });
    socket.on("getContacts", async () => {
        try {
            const currentUserId = socket.data.userId;
            if (!currentUserId) {
                socket.emit("getContacts", {
                    success: false,
                    msg: "Unauthrized",
                });
                return;
            }

            const users = await user.find(
                { _id: { $ne: currentUserId } },
                { password: 0 } // exlude password field
            ).lean(); // will fetch js objects

            const contacts = users.map((u) => ({
                id: u._id.toString(),
                name: u.name || "Unknown",
                email: u.email || "",
                avatar: u.avatar || "",
            }));


            socket.emit("getContacts", {
                success: true,
                data: contacts,
            });
        } catch (error) {
            console.log("getContacts error: ", error);
            socket.emit("getContacts", {
                success: false,
                msg: "Failed to fetch contacts"
            });
        }
    });
}
