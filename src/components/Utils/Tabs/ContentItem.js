import React from 'react';
import { TabPane } from 'reactstrap';
import PropTypes from '../../../lib/utils/propTypes';

const ContentItem = ({ number, children, ...restProps }) => (
	<TabPane tabId={number} {...restProps}>
		{children}
	</TabPane>
);

ContentItem.propTypes = {
	number: PropTypes.number.isRequired,
	children: PropTypes.node.isRequired,
};

export default ContentItem;
