import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
	const [messageRecieved, setMessageRecieved] = useState<string[]>([]);
	const [listUsers, setListUsers] = useState<string[]>([]);

	const [message, setMessage] = useState("");
	const [userActived, setUserActived] = useState("");
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
	});

	const mousePositionRef = useRef({
		x: 0,
		y: 0,
	});

	// useEffect(() => {
	// 	socket.on("receive_message", (data) => {
	// 		setMessageRecieved((pre) => [...pre, data.message]);
	// 	});
	// }, []);

	useEffect(() => {
		socket.on("receive_user", (data) => {
			setListUsers((pre) => [...pre, data.user]);
		});
	}, []);

	const handleSendMessage = () => {
		setMessageRecieved((pre) => [...pre, message]);
		socket.emit("send_message", {
			message,
		});
	};

	const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value);
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		setPosition({ x: e.clientX, y: e.clientY });
		mousePositionRef.current = {
			x: e.clientX,
			y: e.clientY,
		};
	};

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setUserActived(e.target.value);
		socket.emit("send_user", {
			user: e.target.value,
		});
		setListUsers((pre) => [...pre, e.target.value]);
	};

	return (
		<div
			style={{ width: "1000px", height: "800px", border: "1px solid black" }}
			// onMouseMove={handleMouseMove}
		>
			{/* <input
				placeholder="Message..."
				value={message}
				onChange={handleChangeMessage}
			/>
			<button onClick={handleSendMessage}>Send Message</button>
			{messageRecieved.map((message, index) => (
				<div key={index}>{message}</div>
			))} */}
			<select value={userActived} onChange={handleSelect}>
				<option value={"user1"}>User 1</option>
				<option value={"user2"}>User 2</option>
				<option value={"user3"}>User 3</option>
			</select>

			{listUsers.map((user, index) => (
				<div key={index}>{user}</div>
			))}
		</div>
	);
}

export default App;
