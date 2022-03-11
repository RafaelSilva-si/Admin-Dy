import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem, Button, NavLink as BSNavLink } from 'reactstrap';
import PulseLoader from 'react-spinners/PulseLoader';
import bn from '../../../lib/utils/bemnames';
import { navItems } from '../../../routes/menu';
import R from '../../../lib/constants/R';
import SidebarPage from './SidebarPages';
import SourceLink from '../SourceLink';
import PropTypes from '../../../lib/utils/propTypes';
import { MdMenuOpen } from 'react-icons/md';
import { genericsActions } from '../../../store/actions';
import Logo  from '../../Utils/logo';


const sidebarBackground = {
	// backgroundImage: `url("${R.images.sidebar}")`,
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
};



const bem = bn.create('sidebar');

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenSistema: false,
			isOpenSide: true,
		};
	}

	handleSidebarControlButton = event => {
		event.preventDefault();
		event.stopPropagation();
		document
			.querySelector('.cr-sidebar')
			.classList.toggle('cr-sidebar--open');
		document.querySelector('.cr-header').classList.toggle('open');


		if(document.querySelector('.cr-sidebar').classList.contains('cr-sidebar--open')){
			this.state.isOpenSide = false;
		} else {
			this.state.isOpenSide = true;
		}

		const {onSidebar} = this.props;
		onSidebar(this.state.isOpenSide)
	};

	handleClick = name => () => {
		this.setState(prevState => {
			const isOpen = prevState[`isOpen${name}`];

			return {
				[`isOpen${name}`]: !isOpen,
			};
		});
	};

	modulePermission = modules => {
		return modules.map(item => {
			return (
				<SidebarPage
					key={item.route.name}
					// eslint-disable-next-line react/destructuring-assignment
					isOpen={this.state[`isOpen${item.route.name}`]}
					namePages={item.route.name}
					click={name => this.handleClick(name)}
					pageContents={item.submodules}
					IconPage={item.route.icon}
				/>
			);
		});
	};

	
	render() {
		const { modules, permissionsMenu, user } = this.props;
		return (
			<aside className={bem.b()} data-image={R.images.sidebar}>
				<div
					className={bem.e('background')}
					style={sidebarBackground}
				/>

				<div className={bem.e('content')}>
					<div className={bem.e('up')}>
						<Navbar>
							<SourceLink className="navbar-brand nav-logo d-flex">
								<Logo />
							</SourceLink>
							<div>
								<Button outline onClick={this.handleSidebarControlButton}>
									<MdMenuOpen size={20} />
								</Button>
							</div>
						</Navbar>
						<div className={bem.e('profile')}>
							<p>{user.first_name} {user.last_name}</p>
							<img className={bem.e('imgProfile')} src={R.images.logo_teste}/>
						</div>
					</div>
					{modules.length > 0 ? (
						<div>
							<Nav vertical>
								{navItems.map(
									({ to, name, exact, Icon }, index) => (
										<NavItem
											key={name}
											className={bem.e('nav-item')}>
											<BSNavLink
												id={`navItem-${name}-${index}`}
												tag={NavLink}
												to={to}
												activeClassName="active"
												exact={exact}>
												<Icon
													className={bem.e(
														'nav-item-icon',
													)}
												/>
												<span className="nav-name">
													{name}
												</span>
											</BSNavLink>
										</NavItem>
									),
								)}
								{this.modulePermission(permissionsMenu)}
							</Nav>
						</div>
					) : (
						<div align="center" className="mt-4">
							<PulseLoader color="#fff" />
						</div>
					)}
				</div>
			</aside>
		);
	}
}

const mapStateToProps = state => {
	return {
		modules: state.enterprise.modulesCompany,
		permissionsMenu: state.enterprise.permissionsMenu,
		user: state.auth.user
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSidebar: data => dispatch(genericsActions.sideBar(data)),
	};
};

Sidebar.propTypes = {
	permissionsMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
	modules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
