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
const noteSocketMap = [];

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

	socket.on("add_note", ({ roomId, note }) => {
		noteSocketMap.push(note);
		socket.in(roomId).emit("notes", {
			notes: noteSocketMap,
		});
	});

	socket.on("sync_note", ({ socketId, notes }) => {
		io.to(socketId).emit("notes", { notes });
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
});

server.listen(3005, () => {
	console.log("Server is running");
});
