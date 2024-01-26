import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { remove } from "./cartSlice";

function DeleteItem({ pizzaId }) {
	const dispatch = useDispatch();
	return (
		<Button type="small" onClick={() => dispatch(remove(pizzaId))}>
			Delete
		</Button>
	);
}

export default DeleteItem;
