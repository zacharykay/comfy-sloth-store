import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS
} from '../actions';

const filter_reducer = (state, action) => {
	if (action.type === LOAD_PRODUCTS) {
		let maxPrice = action.payload.map((p) => {
			return p.price;
		});
		// Must use spread because can't perform Math.max() on an array
		maxPrice = Math.max(...maxPrice);

		// Must use spread to copy the same product values from action.payload instead of pointing to same location in memory (instead of simply using action.payload)
		// This enables possiblity of clearing filter and returning to all products
		return {
			...state,
			all_products: [ ...action.payload ],
			filtered_products: [ ...action.payload ],
			filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
		};
	}

	if (action.type === SET_GRIDVIEW) {
		return {
			...state,
			grid_view: true
		};
	}
	if (action.type === SET_LISTVIEW) {
		return {
			...state,
			grid_view: false
		};
	}

	if (action.type === UPDATE_SORT) {
		return { ...state, sort: action.payload };
	}

	if (action.type === SORT_PRODUCTS) {
		const { sort, filtered_products } = state;
		let tempProducts = [ ...filtered_products ];
		if (sort === 'price-lowest') {
			tempProducts = tempProducts.sort((a, b) => {
				return a.price - b.price;
			});
		}
		if (sort === 'price-highest') {
			tempProducts = tempProducts.sort((a, b) => {
				return b.price - a.price;
			});
		}
		if (sort === 'name-a') {
			tempProducts = tempProducts.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});
		}
		if (sort === 'name-z') {
			tempProducts = tempProducts.sort((a, b) => {
				return b.name.localeCompare(a.name);
			});
		}

		return { ...state, filtered_products: tempProducts };
	}

	if (action.type === UPDATE_FILTERS) {
		const { name, value } = action.payload;
		return { ...state, filters: { ...state.filters, [name]: value } }; // Dynamic JS Property Naming, form 'names' must match exactly to do this
	}

	if (action.type === FILTER_PRODUCTS) {
		const { all_products } = state;
		const { text, category, company, color, price, shipping } = state.filters;

		// Fresh set of data from all_products, returns all products if no filtering applied
		// Filtering must always start with default data being returned (copy of original data with spread)
		// Instead of being based on previously applied filtered data,
		// ** Each change to filtering relies on entire original data set **
		let tempProducts = [ ...all_products ];

		// ** Filtering **

		// Text
		if (text) {
			// If any text is typed in search box
			tempProducts = tempProducts.filter((product) => {
				// Alternatively use .startsWith(text)
				return product.name.toLowerCase().includes(text);
			});
		}

		// Category
		if (category !== 'all') {
			tempProducts = tempProducts.filter((product) => {
				return product.category === category;
			});
		}

		// Company
		if (company !== 'all') {
			tempProducts = tempProducts.filter((product) => {
				return product.company === company;
			});
		}

		// Colors
		if (color !== 'all') {
			tempProducts = tempProducts.filter((product) => {
				return product.colors.find((col) => col === color);
			});
		}

		// Price
		tempProducts = tempProducts.filter((product) => {
			return product.price <= price;
		});

		// Shipping
		if (shipping) {
			tempProducts = tempProducts.filter((product) => {
				return product.shipping === true;
			});
		}

		return { ...state, filtered_products: tempProducts };
	}

	if (action.type === CLEAR_FILTERS) {
		return {
			...state,
			filters: {
				...state.filters,
				text: '',
				company: 'all',
				category: 'all',
				color: 'all',
				price: state.filters.max_price,
				shipping: false
			}
		};
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
