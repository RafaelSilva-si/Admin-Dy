import React from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import AuthForm from '../../components/AuthForm';
import PropTypes from '../../lib/utils/propTypes';
import NOTIFICATION_SYSTEM_STYLE from '../../lib/utils/constants';
import R from '../../lib/constants/R';
import { authActions } from '../../store/actions';

class AuthPage extends React.Component {
	componentDidUpdate(prevProps) {
		const { notification } = this.props;
		if (prevProps.notification !== notification) {
			const { message, level } = notification;
			this.notificationSystem.addNotification({
				message,
				level,
			});
		}
	}

	showNotification = () => {
		this.notificationSystem.addNotification({
			message: R.strings.error.fieldsRequired,
			level: 'error',
		});
	};

	onSubmit = data => {
		const { onTryAuth } = this.props;
		onTryAuth(data);
	};

	render() {
		const { loading } = this.props;

		return (
			<div id="login-page">
				<div className="container">
					<div className="screen">
						<div className="screen__content">
							<AuthForm
								onSubmit={this.onSubmit}
								showNotification={this.showNotification}
								loading={loading}
							/>
						</div>
					</div>
				</div>
				<NotificationSystem
					dismissible={false}
					// eslint-disable-next-line no-return-assign
					ref={notificationSystem =>
						(this.notificationSystem = notificationSystem)
					}
					style={NOTIFICATION_SYSTEM_STYLE}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.api.loading,
		notification: state.notification,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAuth: authData => dispatch(authActions.loginUserAction(authData)),
	};
};

AuthPage.propTypes = {
	onTryAuth: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	notification: PropTypes.shape({
		message: PropTypes.string,
		level: PropTypes.string,
	}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
