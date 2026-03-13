import { getSocket } from "./socket"

export const testSocket = (payload: any, off: boolean = false) => {
    const socket = getSocket();

    if (!socket) {
        console.log("Socket is not connected");
        return;
    };

    if (off) {
        // turn off listing to this event
        socket.off("testSocket", payload); // payload is the callback
    } else if (typeof payload == "function") {
        socket.on("testSocket", payload); // payload as call back for this event
    } else {
        socket.emit("testSocket", payload); // sending playload as data
    }
};


export const updateProfile = (payload: any, off: boolean = false) => {
    const socket = getSocket();

    if (!socket) {
        console.log("Socket is not connected");
        return;
    };

    if (off) {
        // turn off listing to this event
        socket.off("updateProfile", payload); // payload is the callback
    } else if (typeof payload == "function") {
        socket.on("updateProfile", payload); // payload as call back for this event
    } else {
        socket.emit("updateProfile", payload); // sending playload as data
    }
};

export const getContacts = (payload: any, off: boolean = false) => {
    const socket = getSocket();

    if (!socket) {
        console.log("Socket is not connected");
        return;
    };

    if (off) {
        // turn off listing to this event
        socket.off("getContacts", payload); // payload is the callback
    } else if (typeof payload == "function") {
        socket.on("getContacts", payload); // payload as call back for this event
    } else {
        socket.emit("getContacts", payload); // sending playload as data
    }
};

export const newConversation = (payload: any, off: boolean = false) => {
    const socket = getSocket();

    if (!socket) {
        console.log("Socket is not connected");
        return;
    };

    if (off) {
        // turn off listing to this event
        socket.off("newConversation", payload); // payload is the callback
    } else if (typeof payload == "function") {
        socket.on("newConversation", payload); // payload as call back for this event
    } else {
        socket.emit("newConversation", payload); // sending playload as data
    }
};


export const getConversations = (payload: any, off: boolean = false) => {
    const socket = getSocket();

    if (!socket) {
        console.log("Socket is not connected");
        return;
    };

    if (off) {
        // turn off listing to this event
        socket.off("getConversations", payload); // payload is the callback
    } else if (typeof payload == "function") {
        socket.on("getConversations", payload); // payload as call back for this event
    } else {
        socket.emit("getConversations", payload); // sending playload as data
    }
};


export const newMessage = (payload: any, off: boolean = false) => {
    const socket = getSocket();

    if (!socket) {
        console.log("Socket is not connected");
        return;
    };

    if (off) {
        // turn off listing to this event
        socket.off("newMessage", payload); // payload is the callback
    } else if (typeof payload == "function") {
        socket.on("newMessage", payload); // payload as call back for this event
    } else {
        socket.emit("newMessage", payload); // sending playload as data
    }
};

export const getMessages = (payload: any, off: boolean = false) => {
    const socket = getSocket();

    if (!socket) {
        console.log("Socket is not connected");
        return;
    };

    if (off) {
        // turn off listing to this event
        socket.off("getMessages", payload); // payload is the callback
    } else if (typeof payload == "function") {
        socket.on("getMessages", payload); // payload as call back for this event
    } else {
        socket.emit("getMessages", payload); // sending playload as data
    }
};