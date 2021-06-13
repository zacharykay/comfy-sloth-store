import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
	CLEAR_CART,
	COUNT_CART_TOTALS
} from '../actions';

const getLocalStorage = () => {
	let cart = localStorage.getItem('react-comfy-sloth-store-cart');
	// Check for existing Cart in LocalStorage otherwise set cart state value to empty array, returns either parsed cart object or []
	if (cart) {
		return JSON.parse(localStorage.getItem('react-comfy-sloth-store-cart'));
	} else {
		return [];
	}
};

const initialState = {
	cart: getLocalStorage(),
	total_items: 0,
	total_amount: 0,
	shipping_fee: 1995
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(reducer, initialState);

	// Add Item to Cart
	const addToCart = (id, color, amount, product) => {
		dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
	};

	// Remove Item from Cart
	const removeItem = (id) => {
		dispatch({ type: REMOVE_CART_ITEM, payload: id });
	};
	// Toggle Item Amount
	const toggleAmount = (id, value) => {
		dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
	};
	// Clear Cart Items
	const clearCart = () => {
		dispatch({ type: CLEAR_CART });
	};

	useEffect(
		() => {
			localStorage.setItem(
				'react-comfy-sloth-store-cart',
				JSON.stringify(state.cart)
			);
			dispatch({ type: COUNT_CART_TOTALS });
		},
		[ state.cart ]
	);

	return (
		<CartContext.Provider
			value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
};
// make sure use
export const useCartContext = () => {
	return useContext(CartContext);
};
