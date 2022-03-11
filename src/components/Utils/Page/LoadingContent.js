import React from 'react';
import PageSpinner from './PageSpinner';
import PropTypes from '../../../lib/utils/propTypes';

const LoadingContent = ({ children, loading }) => (
	<div>{loading ? <PageSpinner /> : <div>{children}</div>}</div>
);

LoadingContent.propTypes = {
	children: PropTypes.node.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default LoadingContent;
