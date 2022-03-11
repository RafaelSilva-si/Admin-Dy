import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from '../../../lib/utils/propTypes';
import { apiActions } from '../../../store/actions';

const NavItemComponent = ({ number, title, ...restProps }) => {
	const activeTab = useSelector(state => state.api.tab);
	const dispatch = useDispatch();

	const toggle = tab => {
		if (activeTab !== tab) dispatch(apiActions.setTab(tab));
	};

	return (
		<NavItem {...restProps}>
			<NavLink
				className={classnames({ active: activeTab === number })}
				onClick={() => {
					toggle(number);
				}}>
				{title}
			</NavLink>
		</NavItem>
	);
};

NavItemComponent.propTypes = {
	number: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
};

export default NavItemComponent;
