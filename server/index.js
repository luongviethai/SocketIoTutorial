import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
	socket.on("send_message", (data) => {
		socket.broadcast.emit("receive_message", data);
	});

	socket.on("send_user", (data) => {
		socket.broadcast.emit("receive_user", data);
	});

	socket.on("disconnect", () => {
		console.log("User Disconnected", socket.id);
	});
});

server.listen(3000, () => {
	console.log("Server is running");
});
