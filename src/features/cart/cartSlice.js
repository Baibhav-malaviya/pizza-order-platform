import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: [],
	// cart: [
	// 	{
	// 		pizzaId: 12,
	// 		name: "Mediterranean",
	// 		quantity: 2,
	// 		unitPrice: 16,
	// 		totalPrice: 32,
	// 	},
	// ],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		add(state, action) {
			//! action.payload = newItem
			state.cart.push(action.payload);
		},
		remove(state, action) {
			//!action.payload = id
			state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
		},
		increaseItemQuantity(state, action) {
			//id = action.payload
			state.cart.some((item) => {
				if (item.pizzaId === action.payload) {
					item.quantity += 1;
					item.totalPrice = item.quantity * item.unitPrice;
				}
			});
		},
		decreaseItemQuantity(state, action) {
			state.cart.some((item) => {
				if (item.pizzaId === action.payload) {
					item.quantity -= 1;
					item.totalPrice = item.quantity * item.unitPrice;
				}

				if (item.quantity === 0) cartSlice.caseReducers.remove(state, action);
			});
		},
		clearCart(state) {
			state.cart = [];
		},
	},
});

export const {
	add,
	remove,
	increaseItemQuantity,
	decreaseItemQuantity,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQuantity = (state) =>
	state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
	state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getPizzaQuantityById = (id) => (state) =>
	state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
