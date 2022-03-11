import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import UsersList from '../../components/User/UsersList';
import { navigate } from '../../lib/utils/navigation';
import { apiActions, usersActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveEditPermission from '../../components/Utils/TablesRow/ActiveEditPermission';
import { commaSeparatedString } from '../../lib/utils/functions';
import PropTypes from '../../lib/utils/propTypes';

const handleNavigationPermission = row => {
	const data = {
		grupo: row.group ? row.group.id : null,
		usuario: row.id,
	};

	const query = queryString.stringify(data, { skipNull: true });

	navigate(`/usuarios/permissoes?${query}`);
};

class UsersPage extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactiveUser } = this.props;

		this.state = {
			columns: [
				{
					name: 'Id',
					selector: 'id',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Nome',
					selector: 'name',
					cell: row => `${row.first_name} ${row.last_name}`,
					sortable: true,
					width: '25%',
				},
				{
					name: 'Email',
					selector: 'email',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Empresa',
					selector: 'company',
					sortable: true,
					cell: row => commaSeparatedString(row.companies),
					width: '25%',
				},
				{
					name: 'Ações',
					selector: 'is_active',
					width: '15%',
					cell: row => (
						<ActiveEditPermission
							row={row}
							route="usuarios"
							handleNavigation={page => navigate(page)}
							handlePermissions={value =>
								handleNavigationPermission(value)
							}
							changeValue={user => onActiveDesactiveUser(user)}
						/>
					),
				},
			],
		};
	}

	async componentDidMount() {
		const { onGetListUsers, onClearQuery } = this.props;
		await onClearQuery();
		await onGetListUsers('active=true');
	}

	render() {
		const {
			onGetListUsers,
			onClearQuery,
			list,
			loading,
			companies,
		} = this.props;

		const { columns } = this.state;

		return (
			<Page
				className="users"
				title="Usuários"
				breadcrumbs={[{ name: 'Usuários', active: true }]}>
				<LoadingContent loading={false}>
					<UsersList
						data={list || []}
						columns={columns}
						companies={companies || []}
						loadingFilter={loading}
						cleanFilter={() => {
							onClearQuery();
							onGetListUsers('active=true');
						}}
						handleNavigation={page => navigate(page)}
						onSubmitFilter={data =>
							onGetListUsers(
								queryString.stringify(data, { skipNull: true }),
							)
						}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.api.loading,
	list: state.user.list,
	companies: state.enterprise.companies,
});

const mapDispatchToProps = dispatch => ({
	onGetListUsers: query => dispatch(usersActions.getListUsers(query)),
	onClearQuery: () => dispatch(apiActions.setQueryFilter('')),
	onActiveDesactiveUser: user =>
		dispatch(usersActions.activeDesactiveUser(user)),
});

UsersPage.propTypes = {
	onActiveDesactiveUser: PropTypes.func.isRequired,
	onClearQuery: PropTypes.func.isRequired,
	onGetListUsers: PropTypes.func.isRequired,
	companies: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
