import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { STATE_LOGIN, STATE_SIGNUP } from './components/AuthForm';

import {
	EmptyLayout,
	LayoutRoute,
	MainLayout,
	RenderRoutes,
} from './components/Utils/Layout';
import AuthPage from './screens/auth/AuthPage';
import './styles/reduction.scss';
import PropTypes from './lib/utils/propTypes';

export const hist = createBrowserHistory({ forceRefresh: true });

const getBasename = () => `/${process.env.PUBLIC_URL.split('/').pop()}`;

class App extends React.Component {
	componentDidMount() {}

	render() {
		const { breakpoint } = this.props;

		return (
			<BrowserRouter basename={getBasename()}>
				<Switch history={hist}>
					<LayoutRoute
						exact
						path="/login"
						layout={EmptyLayout}
						component={props => (
							<AuthPage {...props} authState={STATE_LOGIN} />
						)}
					/>
					<LayoutRoute
						exact
						path="/signup"
						layout={EmptyLayout}
						component={props => (
							<AuthPage {...props} authState={STATE_SIGNUP} />
						)}
					/>

					<MainLayout breakpoint={breakpoint}>
						<RenderRoutes />
					</MainLayout>
				</Switch>
			</BrowserRouter>
		);
	}
}

App.propTypes = {
	breakpoint: PropTypes.string.isRequired,
};

const query = ({ width }) => {
	if (width < 575) {
		return { breakpoint: 'xs' };
	}

	if (width > 576 && width < 767) {
		return { breakpoint: 'sm' };
	}

	if (width > 768 && width < 991) {
		return { breakpoint: 'md' };
	}

	if (width > 992 && width < 1199) {
		return { breakpoint: 'lg' };
	}

	if (width > 1200) {
		return { breakpoint: 'xl' };
	}

	return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
