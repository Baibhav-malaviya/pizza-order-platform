import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { add, getPizzaQuantityById } from "../cart/cartSlice";
import Button from "../../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import UpdateItem from "../cart/UpdateItem";

function MenuItem({ pizza }) {
	const {
		id: pizzaId,
		name,
		unitPrice,
		ingredients,
		soldOut,
		imageUrl,
	} = pizza;

	const dispatch = useDispatch();
	const pizzaQuantityById = useSelector(getPizzaQuantityById(pizzaId));

	const isInCart = pizzaQuantityById > 0;

	const newItem = {
		pizzaId,
		name,
		unitPrice,
		totalPrice: unitPrice * 1,
		quantity: 1,
	};

	const handleAdd = (e) => {
		e.preventDefault();
		dispatch(add(newItem));
	};

	return (
		<li className="flex gap-4 py-2">
			<img
				src={imageUrl}
				alt={name}
				className={`h-24 ${soldOut ? "grayscale opacity-70" : ""}`}
			/>
			<div className="flex flex-col grow">
				<p className="font-medium">{name}</p>
				<p className="text-sm italic capitalize">{ingredients.join(", ")}</p>
				<div className="flex items-center justify-between mt-auto">
					{!soldOut ? (
						<p className="text-sm ">{formatCurrency(unitPrice)}</p>
					) : (
						<p className="text-sm font-medium uppercase text-stone-500">
							Sold out
						</p>
					)}
					{isInCart && (
						<div className="flex items-center gap-2">
							<UpdateItem id={pizzaId} quantity={pizzaQuantityById} />
							<DeleteItem pizzaId={pizzaId} />
						</div>
					)}
					{!soldOut && !isInCart && (
						<Button type="small" onClick={(e) => handleAdd(e)}>
							Add to cart
						</Button>
					)}
				</div>
			</div>
		</li>
	);
}

export default MenuItem;
