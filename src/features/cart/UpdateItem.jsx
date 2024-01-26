import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { increaseItemQuantity, decreaseItemQuantity } from "./cartSlice";
function UpdateItem({ id, quantity }) {
	const dispatch = useDispatch();
	return (
		<div className="flex gap-3">
			<Button type="round" onClick={() => dispatch(decreaseItemQuantity(id))}>
				-
			</Button>
			<span>{quantity}</span>
			<Button type="round" onClick={() => dispatch(increaseItemQuantity(id))}>
				+
			</Button>
		</div>
	);
}

export default UpdateItem;
