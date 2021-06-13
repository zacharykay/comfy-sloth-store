import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// import {useUserContext} from './context/user_context'

// Provide route to children, Gather up all the props to pass down to children with ...rest,
const PrivateRoute = ({ children, ...rest }) => {
	const { user } = useAuth0();

	return (
		<Route
			{...rest}
			// Restrict access to manually typing in /checkout route
			render={() => {
				return user ? children : <Redirect to="/" />;
			}}
		/>
	);
};
export default PrivateRoute;
