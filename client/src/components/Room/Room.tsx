import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

function Room() {
	const userManagementRef = useRef(null);
	const [clients, setClients] = useState<
		[{ socketId: string; username: string }] | []
	>([]);
	const [notes, setNotes] = useState<{ id: string; x: number; y: number }[]>(
		[]
	);
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
			socket.emit("sync_note", {
				socketId,
				notes,
			});
		});

		socket.on("notes", ({ notes }) => {
			setNotes(notes);
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

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const postionRef = userManagementRef.current?.getBoundingClientRect();
		socket.emit("add_note", {
			roomId,
			note: {
				id: uuidv4(),
				x: e.clientY,
				y: e.clientX - postionRef.right,
			},
		});
	};

	const renderNotes = useMemo(
		() =>
			_.map(notes, (note) => (
				<div
					key={note.id}
					style={{
						width: "30px",
						height: "30px",
						border: "1px solid black",
						borderRadius: "50%",
						position: "absolute",
						top: note.x,
						left: note.y,
					}}
				/>
			)),
		[notes]
	);

	const renderClients = useMemo(
		() =>
			_.map(clients, (client) => (
				<div
					key={client.socketId}
					style={{ padding: "12px", borderBottom: "1px solid black" }}
				>
					{`${client.username} ${
						location.state?.username === client.username ? "(Me)" : ""
					}`}
				</div>
			)),
		[clients, location.state?.username]
	);

	return (
		<div style={{ display: "flex", width: "100%", height: "100%" }}>
			<div style={{ width: "200px", height: "100%" }} ref={userManagementRef}>
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
				{renderClients}
			</div>
			<div
				style={{ flex: "1", border: "1px solid black", position: "relative" }}
				onClick={handleClick}
			>
				{renderNotes}
			</div>
		</div>
	);
}

export default Room;
