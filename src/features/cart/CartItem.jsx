import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { getPizzaQuantityById, remove } from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import UpdateItem from "./UpdateItem";
function CartItem({ item }) {
	const { pizzaId, name, quantity, totalPrice } = item;
	const dispatch = useDispatch();

	const pizzaQuantityById = useSelector(getPizzaQuantityById(pizzaId));

	const handleRemove = (e) => {
		e.preventDefault();
		dispatch(remove(pizzaId));
	};

	return (
		<li className="items-center justify-between py-3 md:flex">
			<p>
				{quantity}&times; {name}
			</p>
			<div className="flex items-center justify-between space-x-2">
				<p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
				<UpdateItem id={pizzaId} quantity={pizzaQuantityById} />
				<Button type="small" onClick={(e) => handleRemove(e)}>
					Delete
				</Button>
			</div>
		</li>
	);
}

export default CartItem;
