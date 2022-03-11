import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from 'reactstrap';

const PageSpinner = ({ color = 'primary' }) => (
	<div className="cr-page-spinner">
		<Spinner color={color} />
	</div>
);

PageSpinner.propTypes = {
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'danger',
		'warning',
		'info',
		'light',
		'dark',
	]),
};

PageSpinner.defaultProps = {
	color: 'primary',
};

export default PageSpinner;
