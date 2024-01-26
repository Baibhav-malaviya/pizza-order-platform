import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import Input from "../../ui/Input";
import store from "../../store";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
	/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
		str
	);

function CreateOrder() {
	const [withPriority, setWithPriority] = useState(false);
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	const formErrors = useActionData();

	const cart = useSelector((state) => state.cart.cart);
	const dispatch = useDispatch();

	const {
		username,
		address,
		status: addressStatus,
		error: addressError,
		position,
	} = useSelector((state) => state.user);

	const isLoadingAddress = addressStatus === "loading";

	const totalCartPrice = useSelector(getTotalCartPrice);
	const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

	const totalPrice = totalCartPrice + priorityPrice;

	if (totalPrice === 0) return <EmptyCart />;

	return (
		<div className="px-4 py-6 ">
			<h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

			{/* <Form method="POST" action= "/order/new"> */}
			<Form method="POST" className="space-y-4">
				<div>
					{" "}
					<Input
						type="text"
						name="customer"
						required
						label="Full Name: "
						placeholder="Enter your name"
						width="w-full"
						defaultValue={username}
						disabled
					/>
				</div>
				<div>
					{" "}
					<Input
						type="tel"
						name="phone"
						required
						label="Phone number: "
						placeholder="Phone number"
						width="w-full"
					/>
				</div>
				{formErrors?.phone && (
					<p className="p-2 text-xs font-semibold text-red-600 rounded bg-red-500/20">
						**{formErrors?.phone}
					</p>
				)}
				<div>
					{" "}
					<div className="flex items-center justify-between">
						{" "}
						<Input
							type="text"
							name="address"
							required
							label="Address: "
							placeholder="Enter you address..."
							width="w-full"
							defaultValue={address}
							disabled={isLoadingAddress}
						/>
						{!position.latitude && !position.longitude && (
							<span className="mt-2 ml-2">
								<Button
									type="small"
									onClick={(e) => {
										e.preventDefault();
										dispatch(fetchAddress());
									}}
									disabled={isLoadingAddress}
								>
									Get
								</Button>
							</span>
						)}
					</div>
					{addressError && (
						<p className="p-2 text-xs font-semibold text-red-600 rounded bg-red-500/20">
							**{addressError}
						</p>
					)}
				</div>

				{/* <div className="mb-5">
					<label>First Name</label>
					<input type="text" name="customer" required className="input" />
				</div>

				<div>
					<label>Phone number</label>
					<div>
						<input type="tel" name="phone" required className="input" />
					</div>
				</div>
	

				<p>{formErrors?.phone}</p>
				<div>
					<label>Address</label>
					<div>
						<input type="text" name="address" required className="input" />
					</div>
				</div> */}

				<div>
					<input
						type="checkbox"
						name="priority"
						id="priority"
						value={withPriority}
						onChange={(e) => setWithPriority(e.target.checked)}
						className="h-6 accent-yellow-500 aspect-square focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-offset-2"
					/>
					<label htmlFor="priority" className="ml-6">
						Want to yo give your order priority?
					</label>
				</div>

				<div>
					<input type="hidden" name="cart" value={JSON.stringify(cart)} />
					{/* <input
						type="hidden"
						name="position"
						value={
							position.latitude && position.longitude
								? `${position.latitude}, ${position.longitude}`
								: ""
						}
					/> */}
					{/* // This input type is hidden, this input field is sending the cart array to the action  */}
					<Button disabled={isSubmitting || isLoadingAddress}>
						{isSubmitting
							? "Placing order..."
							: `Order now for ${formatCurrency(totalPrice)}`}
					</Button>
				</div>
			</Form>
		</div>
	);
}

export async function action({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const order = {
		...data,
		cart: JSON.parse(data.cart),
		priority: data.priority === "true",
	};

	const errors = {};

	if (!isValidPhone(order.phone))
		errors.phone =
			"Please enter a valid phone number, we might need it to contact you";

	if (Object.keys(errors).length > 0) return errors;

	const newOrder = await createOrder(order);

	//we are using dispatch directly with store because useDispatch is a hook which is only available in components not in regular function
	store.dispatch(clearCart());

	return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
