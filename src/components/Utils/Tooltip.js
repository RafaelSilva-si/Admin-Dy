import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import PropTypes from '../../lib/utils/propTypes';

const TooltipComponent = ({
	placement,
	label,
	target,
	style,
	...restProps
}) => {
	const [tooltipOpen, setTooltipOpen] = useState(false);

	const toggle = () => setTooltipOpen(!tooltipOpen);

	return (
		<Tooltip
			placement={placement}
			isOpen={tooltipOpen}
			target={target}
			toggle={toggle}
			style={style}
			hideArrow
			{...restProps}>
			{label}
		</Tooltip>
	);
};

TooltipComponent.propTypes = {
	label: PropTypes.string.isRequired,
	placement: PropTypes.string,
	target: PropTypes.string.isRequired,
	style: PropTypes.shape({}),
};

TooltipComponent.defaultProps = {
	placement: 'bottom',
	style: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		borderRadius: 2,
		padding: '2px 4px',
		fontSize: 13,
	},
};

export default TooltipComponent;
