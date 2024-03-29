// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";
import {
	calcMinutesLeft,
	formatCurrency,
	formatDate,
} from "../../utils/helpers";

function Order() {
	const order = useLoaderData();
	// Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
	const {
		id,
		status,
		priority,
		priorityPrice,
		orderPrice,
		estimatedDelivery,
		cart,
	} = order;
	const deliveryIn = calcMinutesLeft(estimatedDelivery);

	return (
		<div className="px-4 py-6 space-y-8 ">
			<div className="flex flex-wrap items-center justify-between space-y-2">
				<h2 className="text-xl font-semibold">Order #{id} status</h2>

				<div className="space-x-2">
					{priority && (
						<span className="px-3 py-1 text-sm font-semibold bg-red-500 rounded-full text-red-50 ">
							Priority
						</span>
					)}
					<span className="px-3 py-1 text-sm font-semibold bg-green-500 rounded-full text-red-50">
						{status} order
					</span>
				</div>
			</div>

			<div className="flex flex-wrap items-center justify-between px-3 py-2 space-y-2 rounded-sm bg-stone-300">
				<p>
					{deliveryIn >= 0
						? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
						: "Order should have arrived"}
				</p>
				<p className="text-xs">
					(Estimated delivery: {formatDate(estimatedDelivery)})
				</p>
			</div>

			<ul className="divide-y divide-stone-500">
				{cart.map((item) => (
					<OrderItem item={item} key={item.id} />
				))}
			</ul>

			<div className="px-3 py-2 space-y-2 rounded-sm bg-stone-300">
				<p className="text-sm font-medium text-stone-600">
					Price pizza: {formatCurrency(orderPrice)}
				</p>
				{priority && (
					<p className="text-sm font-medium text-stone-600">
						Price priority: {formatCurrency(priorityPrice)}
					</p>
				)}
				<p className="font-semibold">
					To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
				</p>
			</div>
		</div>
	);
}

export async function loader({ params }) {
	const order = await getOrder(params.orderId);
	return order;
}

export default Order;
