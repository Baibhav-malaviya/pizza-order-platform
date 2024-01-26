import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../ui/Button";
import { updateName } from "./userSlice";

function CreateUser() {
	const dispatch = useDispatch();
	const { username: name } = useSelector((state) => state.user);
	const [username, setUsername] = useState(name);
	const navigate = useNavigate();
	function handleSubmit(e) {
		e.preventDefault();
		if (!username) return;
		dispatch(updateName(username));
		navigate("/menu");
	}

	return (
		<form onSubmit={handleSubmit}>
			<p className="mb-4 text-sm text-stone-600 md:text-base">
				👋 Welcome! Please start by telling us your name:
			</p>

			<input
				type="text"
				placeholder="Your full name"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className="mb-8 w-72 input"
			/>

			{username && (
				<div>
					<Button>Start ordering</Button>
				</div>
			)}
		</form>
	);
}

export default CreateUser;
