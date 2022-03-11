import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from '../../../lib/utils/propTypes';

const LayoutRoute = ({ component: Component, layout: Layout, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			!localStorage.getItem('token') ? (
				<Layout>
					<Component {...props} />
				</Layout>
			) : (
				<Redirect to="/" />
			)
		}
	/>
);

LayoutRoute.propTypes = {
	component: PropTypes.component.isRequired,
	layout: PropTypes.component.isRequired,
};

export default LayoutRoute;
