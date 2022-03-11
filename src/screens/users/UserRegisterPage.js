import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/User/UserRegisterForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	groupsActions,
	notificationActions,
	usersActions,
	genericsActions,
} from '../../store/actions';
import R from '../../lib/constants/R';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class UserRegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount() {
		const {
			onGetUser,
			onGetGroups,
			onGetRepresentatives,
			match,
		} = this.props;

		await onGetGroups();
		await onGetRepresentatives();

		const { id } = match.params;

		this.setState({
			id,
		});

		if (id) {
			await onGetUser(id);
		}
	}

	onSubmit = data => {
		const { onEditUser, onAddNotification, onAddUser } = this.props;
		const { id } = this.state;
		const values = data;
		if (id) {
			if (data.password === '') {
				delete values.password;
			} else if (data.password !== data.confirm_password) {
				onAddNotification(R.strings.error.passwordError, 'error');
				return;
			}
			onEditUser(values, id);
		} else {
			if (data.password !== data.confirm_password) {
				onAddNotification(R.strings.error.passwordError, 'error');
				return;
			}

			onAddUser(data);
		}
	};

	render() {
		const { id } = this.state;

		const {
			user,
			loading,
			companies,
			groups,
			representatives,
		} = this.props;

		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Usuários"
				pathParent="/usuarios"
				breadcrumbs={[
					{
						name: id ? 'Editar usuário' : 'Adicionar usuário',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? !user : loading}>
					<Form
						user={user}
						companiesList={companies || []}
						groups={groups || []}
						edit={!!id}
						representatives={representatives}
						onSubmit={data => this.onSubmit(data)}
						handleNavigation={() => navigateBack()}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.api.loading,
		user: state.user.user,
		companies: state.enterprise.companies,
		groups: state.group.list,
		representatives: state.generics.representatives,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetUser: id => dispatch(usersActions.getUser(id)),
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onGetGroups: () => dispatch(groupsActions.getListGroups('')),
		onGetRepresentatives: () =>
			dispatch(genericsActions.getRepresentatives()),
		onAddUser: data => dispatch(usersActions.addUser(data)),
		onEditUser: (data, id) => dispatch(usersActions.editUser(data, id)),
	};
};

UserRegisterPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
	onAddUser: PropTypes.func.isRequired,
	onEditUser: PropTypes.func.isRequired,
	onGetGroups: PropTypes.func.isRequired,
	onGetRepresentatives: PropTypes.func.isRequired,
	onGetUser: PropTypes.func.isRequired,
	companies: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	groups: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	representatives: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
	user: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterPage);
