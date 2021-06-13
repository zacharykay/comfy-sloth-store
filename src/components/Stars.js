import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars, reviews }) => {
	const filledStars = Array.from({ length: 5 }, (_, index) => {
		// First argument in callback not important because all elements in array are undefined since only given length property, index is the important part
		const number = index + 0.5;
		return (
			<span key={index}>
				{/* Each item ran thru array is double tested for the 1st vs. 2nd condition, and if 1st is false then 2nd vs. 3rd condition, returns the component on each run thru array which returns true due to the written order of logical conditions */}
				{stars >= index + 1 ? (
					<BsStarFill />
				) : stars >= number ? (
					<BsStarHalf />
				) : (
					<BsStar />
				)}
			</span>
		);
	});

	return (
		<Wrapper>
			<div className="stars">{filledStars}</div>

			<p className="reviews">({reviews} customer reviews)</p>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	span {
		color: #ffb900;
		font-size: 1rem;
		margin-right: 0.25rem;
	}
	p {
		margin-left: 0.5rem;
		margin-bottom: 0;
	}
	margin-bottom: 0.5rem;
`;
export default Stars;
