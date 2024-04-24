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

	const gameRef = useRef(null);

	// useEffect(() => {
	// 	socket.on("receive_message", (data) => {
	// 		setMessageRecieved((pre) => [...pre, data.message]);
	// 	});
	// }, []);

	useEffect(() => {
		const context = gameRef.current?.getContext("2d");
		socket.on("position", (data) => {
			setPosition(data);
			// context.clearRect(0, 0, gameRef.current?.width, gameRef.current?.height);
			// context.fillRect(data.x, data.y, 20, 20);
		});
	}, []);

	console.log("position", position);

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
	};

	return (
		<div
			style={{
				width: "1000px",
				height: "800px",
				border: "1px solid black",
			}}
		>
			<canvas
				ref={gameRef}
				width="640"
				height="480"
				style={{ border: "1px solid black" }}
			></canvas>
			<p>
				<button onClick={() => handleClickDirection("right")}>Right</button>
				<button onClick={() => handleClickDirection("left")}>Left</button>
				<button onClick={() => handleClickDirection("up")}>Up</button>
				<button onClick={() => handleClickDirection("down")}>Down</button>
			</p>

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
	);
}

export default App;
