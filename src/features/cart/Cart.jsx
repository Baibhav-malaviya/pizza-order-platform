import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
// const fakeCart = [
// 	{
// 		pizzaId: 12,
// 		name: "Mediterranean",
// 		quantity: 2,
// 		unitPrice: 16,
// 		totalPrice: 32,
// 	},
// 	{
// 		pizzaId: 6,
// 		name: "Vegetale",
// 		quantity: 1,
// 		unitPrice: 13,
// 		totalPrice: 13,
// 	},
// 	{
// 		pizzaId: 11,
// 		name: "Spinach and Mushroom",
// 		quantity: 1,
// 		unitPrice: 15,
// 		totalPrice: 15,
// 	},
// ];

function Cart() {
	const dispatch = useDispatch();

	const { cart } = useSelector((state) => state.cart);
	const username = useSelector((store) => store.user.username);

	const handleClearCart = (e) => {
		e.preventDefault();
		dispatch(clearCart());
	};

	// const cart = fakeCart;
	return (
		<div className="px-4 py-3">
			<Link to="/menu" className="hover:underline">
				&larr; Back to menu
			</Link>

			<h2 className="text-xl font-semibold mt-7">Your cart,{username}</h2>
			{cart.length === 0 ? (
				<p className="flex items-center min-h-48">
					Start adding to the cart:{" "}
					<Link
						to="/menu"
						className="px-3 py-2 ml-5 border border-yellow-600 rounded hover:underline"
					>
						&larr; Back to menu
					</Link>
				</p>
			) : (
				<ul className="mt-3 border-b divide-y divide-stone-300">
					{cart.map((item) => (
						<CartItem item={item} key={item.pizzaId} />
					))}
				</ul>
			)}

			{cart.length > 0 && (
				<div className="mt-6 space-x-2">
					<Button type="small">
						<Link to="/order/new">Order pizzas</Link>
					</Button>
					<Button type="small" onClick={(e) => handleClearCart(e)}>
						Clear cart
					</Button>
				</div>
			)}
		</div>
	);
}

export default Cart;
