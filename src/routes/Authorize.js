/* eslint-disable no-nested-ternary */
import React from 'react';
import { Redirect } from 'react-router-dom';

const Authorize = (allowRoles, allowedRoles) => Component =>
	class AuthenticatedComponent extends React.Component {
		checkAuth = () => {
			const storedToken = localStorage.getItem('token');

			if (storedToken) {
				return true;
			}

			return false;
		};

		render() {
			return (
				<div>
					{allowRoles ? (
						this.checkAuth() && allowedRoles.includes('USER') ? (
							<Component {...this.props} />
						) : (
							<Redirect to="/login" />
						)
					) : this.checkAuth() ? (
						<Component {...this.props} />
					) : (
						<Redirect to="/login" />
					)}
				</div>
			);
		}
	};

export default Authorize;
