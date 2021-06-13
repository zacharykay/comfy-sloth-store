import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
	// Double Destructure Properties
	const {
		filters: {
			text,
			category,
			company,
			color,
			min_price,
			max_price,
			price,
			shipping
		},
		updateFilters,
		clearFilters,
		all_products
	} = useFilterContext();

	const categories = getUniqueValues(all_products, 'category');
	const companies = getUniqueValues(all_products, 'company');
	const colors = getUniqueValues(all_products, 'colors');

	return (
		<Wrapper>
			<div className="content">
				{/* Avoid default action of refreshing page when form is submitted */}
				<form onSubmit={(e) => e.preventDefault()}>
					{/* Search Input */}
					<div className="form-control">
						{/* name must match name in state */}
						<input
							type="text"
							name="text"
							placeholder="search"
							className="search-input"
							value={text}
							onChange={updateFilters}
						/>
					</div>
					{/* End Search Input */}

					{/* Categories */}
					<div className="form-control">
						<h5>category</h5>
						<div>
							{categories.map((cat, index) => {
								return (
									<button
										key={index}
										type="button"
										className={`${category === cat.toLowerCase()
											? 'active'
											: null}`}
										onClick={updateFilters}
										name="category"
									>
										{cat}
									</button>
								);
							})}
						</div>
					</div>
					{/* End Categories */}

					{/* Companies */}
					<div className="form-control">
						<h5>company</h5>
						<select
							name="company"
							value={company}
							className="company"
							onChange={updateFilters}
						>
							{companies.map((comp, index) => {
								return (
									<option key={index} value={comp}>
										{comp}
									</option>
								);
							})}
						</select>
					</div>
					{/* End of Companies */}

					{/* Colors */}
					<div className="form-control">
						<h5>colors</h5>
						<div className="colors">
							{colors.map((col, index) => {
								if (col === 'all') {
									return (
										<button
											key={index}
											name="color"
											data-color="all"
											className={`${color === 'all'
												? 'all-btn active'
												: 'all-btn'}`}
											onClick={updateFilters}
										>
											all
										</button>
									);
								}
								return (
									<button
										key={index}
										name="color"
										style={{ background: col }}
										className={`${color === col
											? 'active color-btn'
											: 'color-btn'}`}
										// HTML Attribute data-'' where '' can be anything, used for targetting when value is not an option such as in a button
										// Accessed in JS with dataset.''(e.target.dataset.color)
										data-color={col}
										onClick={updateFilters}
									>
										{color === col ? <FaCheck /> : null}
									</button>
								);
							})}
						</div>
					</div>
					{/* End of Colors */}

					{/* Price */}
					<div className="form-control">
						<h5>price</h5>
						<p className="price">{formatPrice(price)}</p>
						<input
							type="range"
							name="price"
							onChange={updateFilters}
							min={min_price}
							max={max_price}
							// Value is used to track state or currently selected value
							// Muse change price to number in filter_context because when sliding becomes a string
							value={price}
						/>
					</div>
					{/* End of Price */}

					{/* Shipping */}
					<div className="form-control shipping">
						<label htmlFor="shipping">free shipping</label>
						<input
							type="checkbox"
							name="shipping"
							id="shipping"
							checked={shipping}
							onChange={updateFilters}
						/>
					</div>
					{/* End of Shipping */}
				</form>
				<button type="button" className="clear-btn" onClick={clearFilters}>
					clear filters
				</button>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.form-control {
		margin-bottom: 1.25rem;
		h5 {
			margin-bottom: 0.5rem;
		}
	}
	.search-input {
		padding: 0.5rem;
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		letter-spacing: var(--spacing);
	}
	.search-input::placeholder {
		text-transform: capitalize;
	}

	button {
		display: block;
		margin: 0.25em 0;
		padding: 0.25rem 0;
		text-transform: capitalize;
		background: transparent;
		border: none;
		border-bottom: 1px solid transparent;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}
	.active {
		border-color: var(--clr-grey-5);
	}
	.company {
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		padding: 0.25rem;
	}
	.colors {
		display: flex;
		align-items: center;
	}
	.color-btn {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.5rem;
			color: var(--clr-white);
		}
	}
	.all-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.5rem;
		opacity: 0.5;
	}
	.active {
		opacity: 1;
	}
	.all-btn .active {
		text-decoration: underline;
	}
	.price {
		margin-bottom: 0.25rem;
	}
	.shipping {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		text-transform: capitalize;
		column-gap: 0.5rem;
		font-size: 1rem;
	}
	.clear-btn {
		background: var(--clr-red-dark);
		color: var(--clr-white);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.content {
			position: sticky;
			top: 1rem;
		}
	}
`;

export default Filters;
