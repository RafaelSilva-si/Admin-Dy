import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PageSpinner from '../Page/PageSpinner';
import Page404 from '../Page/Page404';

const RenderRoutes = () => {
	const permissionsRoutes = useSelector(
		state => state.enterprise.permissionsRoutes,
	);

	return (
		<React.Suspense fallback={<PageSpinner />}>
			{permissionsRoutes.length > 0 ? (
				<Switch>
					{permissionsRoutes.map(route => (
						<Route
							exact
							path={route.path}
							key={route.path}
							component={route.component}
						/>
					))}
					<Route component={Page404} />
				</Switch>
			) : (
				<PageSpinner />
			)}
		</React.Suspense>
	);
};

export default RenderRoutes;
