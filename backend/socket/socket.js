import { Server } from "socket.io";
import express from "express";
import http from "http";
import dotenv from "dotenv";

dotenv.config(); // ✅ load environment variables

const app = express();

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Configure Socket.io server with proper CORS
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Store userId -> socketId mapping
const userSocketMap = {};

// ✅ Helper function to get a user's socket ID
export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

// ✅ Handle socket connection
io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`🟢 User ${userId} connected with socket ID ${socket.id}`);
  }

  // ✅ Send list of online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ✅ Handle socket disconnection
  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
