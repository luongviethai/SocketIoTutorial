import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
	const [username, setUsername] = useState("");
	const [roomId, setRoomId] = useState("");
	const navigate = useNavigate();

	const handleJoinRoom = () => {
		navigate(`/room/${roomId}`, {
			state: {
				username,
			},
		});
	};

	const handleChangeRoomId = (e: React.ChangeEvent<HTMLInputElement>) =>
		setRoomId(e.target.value);

	const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) =>
		setUsername(e.target.value);

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					width: "500px",
					height: "300px",
					border: "1px solid black",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: "12px",
				}}
			>
				<p>Enter the ROOM ID</p>
				<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
					<input
						placeholder="Room ID"
						value={roomId}
						onChange={handleChangeRoomId}
					/>
					<input
						placeholder="User Name"
						onChange={handleChangeUserName}
						value={username}
					/>
				</div>
				<button onClick={handleJoinRoom}>Join</button>
			</div>
		</div>
	);
}

export default Home;
