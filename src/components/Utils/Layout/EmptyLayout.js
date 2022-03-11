import React from 'react';
import Content from './Content';
import PropTypes from '../../../lib/utils/propTypes';

const EmptyLayout = ({ children, ...restProps }) => (
	<main className="cr-app bg-light" {...restProps}>
		<Content fluid>{children}</Content>
	</main>
);

EmptyLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default EmptyLayout;
