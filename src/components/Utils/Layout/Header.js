import React from 'react';
import { MdCalendarToday, MdExitToApp, MdHelp, MdPersonPin } from 'react-icons/md';
import { RiMenuUnfoldLine } from 'react-icons/ri'
import {
	Button,
	ListGroup,
	ListGroupItem,
	Nav,
	Navbar,
	NavItem,
	NavLink,
	Popover,
	PopoverBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import bn from '../../../lib/utils/bemnames';
import { authActions, enterpriseActions, genericsActions } from '../../../store/actions';
import { navigate } from '../../../lib/utils/navigation';
import Avatar from '../Avatar';
import { UserCard } from '../Card';
import SelectComp from '../Select';
import PropTypes from '../../../lib/utils/propTypes';
import R from '../../../lib/constants/R';
import { getDate } from '../../../lib/utils/functions';
const bem = bn.create('header');

// const MdNotificationsActiveWithBadge = withBadge({
// 	size: 'md',
// 	color: 'primary',
// 	style: {
// 		top: -10,
// 		right: -10,
// 		display: 'inline-flex',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	children: <small>5</small>,
// })(MdNotificationsActive)

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenNotificationPopover: false,
			isNotificationConfirmed: false,
			isOpenUserCardPopover: false,
			isOpenSide: true,
		};
	}

	toggleNotificationPopover = () => {
		const {
			isOpenNotificationPopover,
			isNotificationConfirmed,
		} = this.state;

		this.setState({
			isOpenNotificationPopover: !isOpenNotificationPopover,
		});

		if (!isNotificationConfirmed) {
			this.setState({ isNotificationConfirmed: true });
		}
	};

	toggleUserCardPopover = () => {
		const { isOpenUserCardPopover } = this.state;

		this.setState({
			isOpenUserCardPopover: !isOpenUserCardPopover,
		});
	};

	handleSidebarControlButton = event => {
		event.preventDefault();
		event.stopPropagation();

		document
			.querySelector('.cr-sidebar')
			.classList.toggle('cr-sidebar--open');
		document.querySelector('.cr-header').classList.toggle('open');

		if (document.querySelector('.cr-sidebar').classList.contains('cr-sidebar--open')) {
			this.state.isOpenSide = false;
		} else {
			this.state.isOpenSide = true;
		}

		const { onSidebar } = this.props;
		onSidebar(this.state.isOpenSide)
	};

	render() {
		const {
			user,
			companies,
			select,
			onChangeCompany,
			onLogoutUser,
			isOpen
		} = this.props;

		const { isOpenUserCardPopover } = this.state;
		const day = getDate()
		return (
			<Navbar light expand className={bem.b('open')}>
				{isOpen && (
					<Nav navbar className="mr-2">
						<Button outline onClick={this.handleSidebarControlButton} className={bem.e('buttonHam')}>
							<RiMenuUnfoldLine size={20} />
						</Button>
					</Nav>
				)}
				
				<Nav style={{paddingTop: '5px'}} className={bem.e('date')}>
					<MdCalendarToday size={20} />
					<span style={{paddingLeft: '10px', fontWeight: 'bolder'}} >
						{day}
					</span>
				</Nav>

				<Nav navbar className={bem.e('nav-right')}>
					{/* <NavItem className="d-inline-flex">
						<NavLink id="Popover1" className="position-relative">
							{isNotificationConfirmed ? (
								<MdNotificationsNone
									size={25}
									className="text-secondary can-click"
									onClick={this.toggleNotificationPopover}
								/>
							) : (
								<MdNotificationsActiveWithBadge
									size={25}
									className="text-secondary can-click animated swing infinite"
									onClick={this.toggleNotificationPopover}
								/>
							)}
						</NavLink>
						<Popover
							placement="bottom"
							isOpen={this.state.isOpenNotificationPopover}
							toggle={this.toggleNotificationPopover}
							target="Popover1"
						>
							<PopoverBody>
								<Notifications notificationsData={[]} />
							</PopoverBody>
						</Popover>
					</NavItem> */}

					<NavItem>
						<NavLink id="Popover2">
							<div style={{textAlign: 'right', fontSize: '11px', paddingRight: '10px'}}>Olá,<br />
								<span 
								style={{fontWeight:'bolder', fontSize: '15px'}}>
									{user.first_name} 
								</span>
							</div>
							<Avatar
								onClick={this.toggleUserCardPopover}
								className="can-click mr-3"
								src={R.images.logo_teste}
							/>
						</NavLink>
						<Popover
							placement="bottom-end"
							isOpen={isOpenUserCardPopover}
							toggle={this.toggleUserCardPopover}
							target="Popover2"
							className="p-0 border-0"
							style={{ minWidth: 250 }}>
							{user && (
								<PopoverBody className="p-0 border-light">
									<UserCard
										title={user.first_name}
										subtitle={user.email}
										className="border-light"
										avatar={R.images.logo_teste}>
										<ListGroup flush>
											<ListGroupItem
												tag="button"
												action
												className="border-light"
												onClick={() =>
													navigate('/perfil')
												}>
												<MdPersonPin /> Perfil
											</ListGroupItem>
											{/* <ListGroupItem tag="button" action className="border-light">
												<MdSettingsApplications /> Configurações
											</ListGroupItem> */}
											<ListGroupItem
												tag="button"
												action
												className="border-light"
												onClick={() =>
													navigate('/ajuda')
												}>
												<MdHelp /> Ajuda
											</ListGroupItem>
											<ListGroupItem
												tag="button"
												action
												className="border-light"
												onClick={() => onLogoutUser()}>
												<MdExitToApp /> Sair
											</ListGroupItem>
										</ListGroup>
									</UserCard>
								</PopoverBody>
							)}
						</Popover>
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		companies: state.enterprise.companies,
		select: state.enterprise.selecCompany,
		isOpen: state.generics.isOpen
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLogoutUser: () => dispatch(authActions.logoutUser()),
		onChangeCompany: value =>
			dispatch(enterpriseActions.changeCompany(value)),
		onSidebar: data => dispatch(genericsActions.sideBar(data)),
	};
};

Header.propTypes = {
	onChangeCompany: PropTypes.func.isRequired,
	onLogoutUser: PropTypes.func.isRequired,
	companies: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	select: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]),
	user: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.shape({
			first_name: PropTypes.string,
			email: PropTypes.string,
		}),
	]).isRequired,
};

Header.defaultProps = {
	select: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
