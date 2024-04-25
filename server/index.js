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

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
	return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
		(socketId) => {
			return {
				socketId,
				username: userSocketMap[socketId],
			};
		}
	);
};

io.on("connection", (socket) => {
	socket.on("send_message", (data) => {
		socket.broadcast.emit("receive_message", data);
	});

	socket.on("join", ({ roomId, username }) => {
		userSocketMap[socket.id] = username;
		socket.join(roomId);
		const clients = getAllConnectedClients(roomId);
		clients.forEach(({ socketId }) => {
			io.to(socketId).emit("joined", {
				clients,
				username,
				socketId: socket.id,
			});
		});
	});

	socket.on("disconnecting", () => {
		const rooms = [...socket.rooms];
		// leave all the room
		rooms.forEach((roomId) => {
			socket.in(roomId).emit("disconnected", {
				socketId: socket.id,
				username: userSocketMap[socket.id],
			});
		});

		delete userSocketMap[socket.id];
		socket.leave();
	});

	// socket.on("disconnect", () => {
	// 	console.log("User Disconnected", socket.id);
	// });
});

server.listen(3005, () => {
	console.log("Server is running");
});
