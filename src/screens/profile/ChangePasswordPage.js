import React from 'react';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Page from '../../components/Utils/Page/Page';
import Form from '../../components/Profile/ChangePasswordForm';
import PropTypes from '../../lib/utils/propTypes';
import { navigateBack } from '../../lib/utils/navigation';
import { notificationActions, usersActions } from '../../store/actions';

import R from '../../lib/constants/R';

class ChangePasswordPage extends React.Component {
	constructor(props) {
		super(props);

		this.submit = this.submit.bind(this);
	}

	submit = data => {
		const { onAddNotification, onChangePassword } = this.props;

		if (data.password !== data.confirm_password) {
			onAddNotification(R.strings.error.passwordError, 'error');
		} else {
			onChangePassword({ password: data.password });
		}
	};

	render() {
		return (
			<Page
				className="change-password"
				title="Alterar Senha"
				parentBreadcrumbs="Perfil"
				pathParent="/perfil"
				breadcrumbs={[{ name: 'Alterar Senha', active: true }]}>
				<Row className="justify-content-center">
					<Col xl={8} lg={12} md={12}>
						<Form
							handleNavigation={() => navigateBack()}
							onSubmit={data => this.submit(data)}
						/>
					</Col>
				</Row>
			</Page>
		);
	}
}

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onChangePassword: data => dispatch(usersActions.changePassword(data)),
	};
};

ChangePasswordPage.propTypes = {
	onChangePassword: PropTypes.func.isRequired,
	onAddNotification: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);
