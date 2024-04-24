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

let position = {
	x: 0,
	y: 0,
};

io.on("connection", (socket) => {
	socket.on("send_message", (data) => {
		socket.broadcast.emit("receive_message", data);
	});
	socket.on("move", (data) => {
		switch (data) {
			case "left":
				position.x -= 5;
				socket.broadcast.emit("position", position);
				break;
			case "right":
				position.x += 5;
				socket.broadcast.emit("position", position);
				break;
			case "up":
				position.y -= 5;
				socket.broadcast.emit("position", position);
				break;
			case "down":
				position.y += 5;
				socket.broadcast.emit("position", position);
				break;
		}
	});

	socket.on("disconnect", () => {
		console.log("User Disconnected", socket.id);
	});
});

server.listen(3000, () => {
	console.log("Server is running");
});
