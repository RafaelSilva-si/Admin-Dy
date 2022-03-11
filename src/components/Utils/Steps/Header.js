import React from 'react';
import PropTypes from '../../../lib/utils/propTypes';
import Button from './ButtonHeader';

const StepsHeader = ({ headers, permission, ...restProps }) => {
	const list = items =>
		items.map((item, index) => (
			<div key={item.target} className="box-step">
				<div className="step" data-target={item.target}>
					<Button
						name={item.name}
						index={index + 1}
						disabled={permission[index]}
					/>
				</div>
				{index !== headers.length - 1 && <div className="line" />}
			</div>
		));

	return (
		<div className="bs-stepper-header" {...restProps}>
			{list(headers)}
		</div>
	);
};

StepsHeader.propTypes = {
	headers: PropTypes.arrayOf(PropTypes.object).isRequired,
	permission: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default StepsHeader;
