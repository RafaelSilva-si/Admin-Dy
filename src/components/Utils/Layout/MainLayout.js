import React from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import NOTIFICATION_SYSTEM_STYLE from '../../../lib/utils/constants';
import { Content, Footer, Header, Sidebar } from './index';
import { authActions, genericsActions } from '../../../store/actions';
import PropTypes from '../../../lib/utils/propTypes';

class MainLayout extends React.Component {
	static isSidebarOpen() {
		return document
			.querySelector('.cr-sidebar')
			.classList.contains('cr-sidebar--open');
	}

	componentDidMount() {
		const { breakpoint, onCheckUser } = this.props;
		this.checkBreakpoint(breakpoint);
		onCheckUser();
	}

	componentDidUpdate(prevProps) {
		const { breakpoint, notification } = this.props;

		if (prevProps.notification !== notification) {
			const { message, level } = notification;
			this.notificationSystem.addNotification({
				message,
				level,
			});
		}

		if (prevProps.breakpoint !== breakpoint) {
			this.checkBreakpoint(breakpoint);
		}
	}

	// close sidebar when
	handleContentClick = () => {
		const { breakpoint } = this.props;
		// close sidebar if sidebar is open and screen size is less than `md`
		if (
			MainLayout.isSidebarOpen() &&
			(breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md')
		) {
			this.openSidebar('close');
		}
	};

	checkBreakpoint = breakpoint => {
		const { onSidebar } = this.props
		switch (breakpoint) {
			case 'xs':
			case 'sm':
			case 'md':
				return onSidebar(true);

			case 'lg':
			case 'xl':
			default:
				return this.openSidebar('open');
		}
	};

	openSidebar = openOrClose => {
		if (openOrClose === 'open') {
			return document
				.querySelector('.cr-sidebar')
				.classList.add('cr-sidebar--open');
		}
		return document
			.querySelector('.cr-sidebar')
			.classList.remove('cr-sidebar--open');
	};

	render() {
		const { children } = this.props;
		return (
			<main className="cr-app bg-light">
				<Sidebar />
				<Content fluid onClick={this.handleContentClick}>
					<Header />
					{children}
				</Content>

				<NotificationSystem
					dismissible={false}
					// eslint-disable-next-line no-return-assign
					ref={notificationSystem =>
						(this.notificationSystem = notificationSystem)
					}
					style={NOTIFICATION_SYSTEM_STYLE}
				/>
			</main>
		);
	}
}

const mapStateToProps = state => {
	return {
		notification: state.notification,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCheckUser: () => dispatch(authActions.checkUserStorage()),
		onSidebar: data => dispatch(genericsActions.sideBar(data)),
	};
};

MainLayout.propTypes = {
	onCheckUser: PropTypes.func.isRequired,
	notification: PropTypes.shape({
		message: PropTypes.string,
		level: PropTypes.string,
	}).isRequired,
	breakpoint: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
