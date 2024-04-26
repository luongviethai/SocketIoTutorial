import { useState } from "react";
import Draggable from "react-draggable";

function Comment(props) {
	const { note, status } = props;
	const [show, setShow] = useState(false);
	const [value, setValue] = useState("");
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleClick = () => {
		if (status === "mouse") {
			setShow(!show);
		}
	};

	const handleChangeValue = (e) => {
		setValue(e.target.value);
	};

	const handleKeyDown = (e) => {};

	const handleDrag = (e, ui) => {
		setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
	};

	return (
		<Draggable onDrag={handleDrag} position={position}>
			<div
				style={{
					width: "30px",
					height: "30px",
					position: "absolute",
					top: note.x,
					left: note.y,
				}}
				onClick={handleClick}
			>
				<div
					style={{
						position: "relative",
						width: "100%",
						height: "100%",
						border: "1px solid black",
						borderRadius: "50%",
					}}
				>
					{show && (
						<div
							style={{
								position: "absolute",
								height: "100px",
								border: "1p solid black",
								top: "30px",
							}}
						>
							<input
								value={value}
								onChange={handleChangeValue}
								onKeyDown={handleKeyDown}
							/>
						</div>
					)}
				</div>
			</div>
		</Draggable>
	);
}

export default Comment;
