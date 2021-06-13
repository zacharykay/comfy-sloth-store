export const formatPrice = (number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(number / 100);
};

export const getUniqueValues = (data, type) => {
	let unique = data.map((item) => {
		return item[type];
	});
	if (type === 'colors') {
		// .flat() allows access to deeper array elements, colors is sub-level array
		unique = unique.flat();
	}

	// console.log(new Set(unique));

	// Set only allows unique values, getting rid of repition in array
	// new creates a new instance of the built-in object type(Set)
	return [ 'all', ...new Set(unique) ];
};
