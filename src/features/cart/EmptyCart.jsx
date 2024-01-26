import { Link } from "react-router-dom";

function EmptyCart() {
	return (
		<div className="relative flex flex-col items-center justify-center h-96 ">
			<Link to="/menu" className="absolute top-10 left-2 hover:underline">
				&larr; Back to menu
			</Link>

			<p>Your cart is still empty. Start adding some pizzas :)</p>
		</div>
	);
}

export default EmptyCart;
