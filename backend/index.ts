import express from "express";
import http from "http";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes"
import { intializeSocket } from "./socket/socket";
config();



const app = express();
app.use(express.json());

app.use(cors());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);


// listen to socket event

intializeSocket(server);



const run = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log("Server is running on port ", PORT);
        })
    } catch (error) {
        console.log("Failed to start server due to database connection error: ", error);
    }
}

run();