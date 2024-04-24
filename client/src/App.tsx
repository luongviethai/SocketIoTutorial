import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
	const [messageRecieved, setMessageRecieved] = useState<string[]>([]);

	const [message, setMessage] = useState("");
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
	});

	// useEffect(() => {
	// 	socket.on("receive_message", (data) => {
	// 		setMessageRecieved((pre) => [...pre, data.message]);
	// 	});
	// }, []);

	useEffect(() => {
		socket.on("position", (data) => {
			console.log('data', data)
			setPosition(data);
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

	const handleClickDirection = (
		direction: "right" | "left" | "up" | "down"
	) => {
		socket.emit("move", direction);
		switch (direction) {
			case "left":
				setPosition({x: position.x - 5, y: position.y});
				break;
			case "right":
				setPosition({x: position.x + 5, y: position.y});
				break;
			case "up":
				setPosition({x: position.x, y: position.y - 5});
				break;
			case "down":
				setPosition({x: position.x, y: position.y + 5});
				break;
		}
	};

	return (
		<>
		<div
			style={{
				width: "1000px",
				height: "500px",
				border: "1px solid black",
				position: 'relative'
			}}
		>
		<div style={{width: '30px', height: '30px', borderRadius: '50%', background: 'blue', position: 'absolute', top: position.y, left: position.x}} />
		

			{/* <input
				placeholder="Message..."
				value={message}
				onChange={handleChangeMessage}
			/>
			<button onClick={handleSendMessage}>Send Message</button>
			{messageRecieved.map((message, index) => (
				<div key={index}>{message}</div>
			))} */}
		</div>
			<p>
			<button onClick={() => handleClickDirection("right")}>Right</button>
			<button onClick={() => handleClickDirection("left")}>Left</button>
			<button onClick={() => handleClickDirection("up")}>Up</button>
			<button onClick={() => handleClickDirection("down")}>Down</button>
		</p>
		</>
		
	);
}

export default App;
