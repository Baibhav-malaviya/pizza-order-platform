import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
import { Link } from "react-router-dom";

function Home() {
	const username = useSelector((state) => state.user.username);
	return (
		<div className="my-10 text-center ">
			<h1 className="mb-8 text-xl font-semibold md:text-3xl text-stone-700">
				The best pizza.
				<br />
				<span className="text-yellow-500">
					Straight out of the oven, straight to you.
				</span>
			</h1>
			{!(username === "") ? (
				<CreateUser />
			) : (
				<Button>
					<Link to="/menu"> Start ordering, {username} </Link>
				</Button>
			)}
		</div>
	);
}

export default Home;
