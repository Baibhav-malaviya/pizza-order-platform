import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/order/${query}`);
		setQuery("");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search order #"
					className="w-32 px-4 py-3 text-sm font-semibold transition bg-yellow-200 rounded-full duration:300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-600 sm:focus:w-72 sm:w-62"
				/>
			</form>
		</div>
	);
}

export default SearchOrder;
