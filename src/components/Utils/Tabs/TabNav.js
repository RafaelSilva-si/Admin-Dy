import React from 'react';
import { Nav } from 'reactstrap';
import bn from '../../../lib/utils/bemnames';
import PropTypes from '../../../lib/utils/propTypes';

const bem = bn.create('tab');

const TabNav = ({ children, ...restProps }) => (
	<Nav tabs {...restProps} className={bem.b('')}>
		{children}
	</Nav>
);

TabNav.propTypes = {
	children: PropTypes.node.isRequired,
};

export default TabNav;
