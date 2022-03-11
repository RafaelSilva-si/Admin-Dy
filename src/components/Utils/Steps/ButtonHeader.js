import React from 'react';
import PropTypes from '../../../lib/utils/propTypes';
import Typography from '../Typography';

const ButtonHeader = ({ name, index, ...restProps }) => {
	return (
		<button className="step-trigger" {...restProps} type="button">
			<Typography type="span" className="bs-stepper-circle">
				{index}
			</Typography>
			<Typography type="span" className="bs-stepper-label">
				{name}
			</Typography>
		</button>
	);
};

ButtonHeader.propTypes = {
	name: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
};

export default ButtonHeader;
