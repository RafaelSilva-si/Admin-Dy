import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/User/UserPermissionsForm';
import { navigateBack } from '../../lib/utils/navigation';
import { usersActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

const queryString = require('query-string');

class UserPermissionsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};
	}

	async componentDidMount() {
		const { onGetUser, location } = this.props;

		const parsed = queryString.parse(location.search);

		this.setState({
			id: parsed.usuario,
		});

		if (parsed.usuario) {
			await onGetUser(parsed);
		}
	}

	render() {
		const { loading, permissions, onUpdatePermission } = this.props;

		const { id } = this.state;

		return (
			<Page
				className="user-permissions"
				title="Permissões"
				parentBreadcrumbs="Usuários"
				pathParent="/usuarios"
				breadcrumbs={[{ name: 'Permissões usuário', active: true }]}>
				<LoadingContent loading={loading}>
					<Form
						permissions={permissions}
						onSubmit={data => onUpdatePermission(data, id)}
						handleNavigation={() => navigateBack()}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.api.loading,
	permissions: state.user.permission,
});

const mapDispatchToProps = dispatch => ({
	onGetUser: data => dispatch(usersActions.getUserPermission(data)),
	onUpdatePermission: (data, id) =>
		dispatch(usersActions.updateUserPermission(data, id)),
});

UserPermissionsPage.propTypes = {
	onGetUser: PropTypes.func.isRequired,
	onUpdatePermission: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	location: PropTypes.shape({
		search: PropTypes.string,
	}).isRequired,
	permissions: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(UserPermissionsPage);
