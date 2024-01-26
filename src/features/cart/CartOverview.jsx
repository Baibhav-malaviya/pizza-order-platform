import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { formatCurrency } from "../../utils/helpers";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
	const totalCartQuantity = useSelector(getTotalCartQuantity); //This is the convention to put the db function in the slice
	const totalCartPrice = useSelector(getTotalCartPrice); //This is the convention to put the db function in the slice
	// This is the actual callback (state) => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)

	if (!totalCartQuantity) return null;

	return (
		<div className="flex items-center justify-between p-4 text-sm md:text-base bg-stone-800 text-stone-200">
			<p className="space-x-4 sm:space-x-6 text-stone-300">
				<span>{totalCartQuantity} pizzas</span>
				<span>{formatCurrency(totalCartPrice)}</span>
			</p>
			<Link to="/cart">Open cart &rarr;</Link>
		</div>
	);
}

export default CartOverview;
