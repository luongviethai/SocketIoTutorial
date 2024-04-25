import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Room() {
	const [clients, setClients] = useState<
		[{ socketId: string; username: string }] | []
	>([]);
	const socket = io("http://localhost:3005");
	const location = useLocation();
	const { roomId } = useParams();

	useEffect(() => {
		socket.emit("join", {
			roomId,
			username: location.state?.username,
		});

		socket.on("joined", ({ clients, username, socketId }) => {
			setClients(clients);
		});

		socket.on("disconnected", ({ socketId, username }) => {
			setClients((prev) => {
				return prev.filter((client) => client.socketId !== socketId);
			});
		});

		return () => {
			socket.disconnect();
			socket.off("joined");
			socket.off("disconnected");
		};
	}, []);

	return (
		<div style={{ display: "flex", width: "100%", height: "100%" }}>
			<div style={{ width: "200px", height: "100%" }}>
				<div
					style={{
						borderBottom: "1px solid black",
						padding: "12px",
						textAlign: "center",
					}}
				>
					Room
				</div>
				<div
					style={{
						borderBottom: "1px solid black",
						padding: "12px",
						textAlign: "center",
					}}
				>
					Members
				</div>
				{clients.map((client) => (
					<div
						key={client.socketId}
						style={{ padding: "12px", borderBottom: "1px solid black" }}
					>
						{client.username}
					</div>
				))}
			</div>
			<div style={{ flex: "1", border: "1px solid black" }}></div>
		</div>
	);
}

export default Room;
