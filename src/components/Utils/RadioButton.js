import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import PropTypes from '../../lib/utils/propTypes';

const RadioButton = ({
	input,
	label,
	value,
	isSelected,
	changed,
	color,
	...restProps
}) => (
	<FormGroup {...restProps} className="RadioButton">
		<Input
			id={input.id}
			className={color}
			onChange={changed}
			name={input.name}
			value={value}
			type="radio"
			checked={isSelected}
			defaultChecked={false}
		/>
		<Label for={label.id}>{label.name}</Label>
	</FormGroup>
);

RadioButton.propTypes = {
	input: PropTypes.shape({ id: PropTypes.string, name: PropTypes.name })
		.isRequired,
	label: PropTypes.shape({ id: PropTypes.string, name: PropTypes.name })
		.isRequired,
	isSelected: PropTypes.bool.isRequired,
	color: PropTypes.string,
	changed: PropTypes.func.isRequired,
	value: PropTypes.bool.isRequired,
};

RadioButton.defaultProps = {
	color: 'primary',
};

export default RadioButton;
