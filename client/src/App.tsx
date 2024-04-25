import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Room from "./components/Room";
import "./App.css";
function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/room/:roomId" element={<Room />} />
		</Routes>
	);
}

export default App;
