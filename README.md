# 💬 BroCode Chat App

> A real-time mobile chat application built with **React Native**, supporting 1-to-1 messaging and group chats with a clean and modern UI.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-F6C90E?style=for-the-badge)

---

## 📌 About

**BroCode** is a full-stack real-time chat application built with the MERN stack and Socket.IO. It supports both private 1-to-1 conversations and multi-user group chats — with instant message delivery, online presence indicators, and persistent chat history.

---

## 🚀 Features

- 🔐 **User Authentication** — Secure login & signup with JWT
- 💬 **Real-time 1-to-1 Chat** — Instant private messaging
- 👥 **Group Chat Support** — Room-based multi-user conversations
- 📡 **WebSocket / Socket.IO** — Persistent real-time connection
- 🟢 **Online / Offline Status** — Live presence indicators
- 📩 **Instant Message Delivery** — Zero-delay push
- 🧾 **Chat History** — Messages persisted in MongoDB
- 📱 **Responsive Mobile UI** — Clean React Native interface
- 🔔 **Push Notifications** *(optional)* — Background alerts

---

## 🛠️ Tech Stack

### Frontend
| Library | Purpose |
|---|---|
| `React Native (Expo / CLI)` | Mobile UI framework |
| `React Native Vector Icons` | Icon library |
| `Axios` | HTTP API requests |

### Backend
| Library | Purpose |
|---|---|
| `Node.js` | Server runtime |
| `Express.js` | REST API framework |
| `Socket.IO` | Real-time WebSocket communication |

### Database
| Library | Purpose |
|---|---|
| `MongoDB` | NoSQL database |
| `Mongoose` | MongoDB ODM |

---

## 📂 Project Structure

```
BroCode-Chat-App/
│
├── client/                  # React Native App
│   ├── components/          # Reusable UI components
│   ├── screens/             # App screens
│   ├── navigation/          # Stack & tab navigators
│   └── services/            # API & socket services
│
├── server/                  # Backend (Node + Express)
│   ├── controllers/         # Route handlers
│   ├── models/              # Mongoose schemas
│   ├── routes/              # REST API routes
│   ├── sockets/             # Socket.IO event handlers
│   └── config/              # DB & environment config
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/brocode-chat-app.git
cd brocode-chat-app
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npx expo start
```

---

## 🔌 Socket Connection Example

```js
import io from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});
```

---

## 📱 App Screens

| Screen | Description |
|---|---|
| 🔑 Login / Signup | JWT-based user authentication |
| 🏠 Home / Chat List | All active conversations |
| 💬 Chat Screen | 1-to-1 real-time messaging |
| 👥 Group Chat Screen | Multi-user room chat |
| 👤 Profile | User info & settings |

---

## 🧠 How It Works

```
User Auth (JWT)  →  Socket.IO Connect  →  Send Message
      ↓                                        ↓
 MongoDB Save    ←   Room Broadcast   ←   Server Receives
```

1. Users authenticate using **JWT tokens**
2. Socket.IO establishes a **persistent WebSocket connection**
3. Messages are emitted and received **in real time**
4. Group chats use **room-based socket communication**
5. All messages are **saved to MongoDB** for history

---

## 🚧 Future Improvements

- 📞 Voice & Video Calling
- 📎 File / Image Sharing
- 🧠 **AI Chat Suggestions** 🔥
- 🌙 Dark Mode
- 🔍 Search Messages
- 🛡️ End-to-End Encryption

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Suman Kayal**
🚀 Passionate Developer | MERN Stack | React Native
- GitHub: [@suman_kayal](https://github.com/SUMANKAYALS)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub — it means a lot!

---

<p align="center">Made with ❤️ by <strong>Suman Kayal</strong> · BroCode Chat App</p>
