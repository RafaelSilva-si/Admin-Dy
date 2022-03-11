import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import PropTypes from '../../lib/utils/propTypes';

const InputWithLabel = ({ label, labelProps, ...inputProps }) => (
	<FormGroup>
		<Label
			{...labelProps}
			className={inputProps.required ? 'required' : ''}
			for={inputProps.id}>
			{label}
		</Label>
		<Input {...inputProps} />
	</FormGroup>
);

InputWithLabel.propTypes = {
	label: PropTypes.string.isRequired,
	labelProps: PropTypes.shape({}),
};

InputWithLabel.defaultProps = {
	labelProps: {},
};

export default InputWithLabel;
