import React from 'react';
import PropTypes from '../../lib/utils/propTypes';

const SourceLink = props => (
	/* eslint-disable jsx-a11y/anchor-has-content */
	// eslint-disable-next-line react/destructuring-assignment
	<a href={props.link} target="_blank" rel="noopener noreferrer" {...props} />
);

SourceLink.propTypes = {
	link: PropTypes.string,
};

SourceLink.defaultProps = {
	link: '',
};

export default SourceLink;
