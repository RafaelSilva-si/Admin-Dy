import React from 'react';
import { TabContent } from 'reactstrap';
import { useSelector } from 'react-redux';
import PropTypes from '../../../lib/utils/propTypes';

const TabContentComponent = ({ children, ...restProps }) => {
	const activeTab = useSelector(state => state.api.tab);

	return (
		<TabContent activeTab={activeTab} {...restProps}>
			{children}
		</TabContent>
	);
};

TabContentComponent.propTypes = {
	children: PropTypes.node.isRequired,
};

export default TabContentComponent;
