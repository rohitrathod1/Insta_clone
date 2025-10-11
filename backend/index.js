import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";


dotenv.config();

// Port setup
const PORT = process.env.PORT || 3000;


const __dirname = path.resolve();
console.log("Current Directory:", __dirname);


app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));


const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));


app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);


const frontendPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendPath));


app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


server.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
