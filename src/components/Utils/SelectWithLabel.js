import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from '../../lib/utils/propTypes';
import SelectComponent from './Select';

const SelectWithLabel = ({ label, labelProps, onChange, formStyle, ...selectProps }) => (
	<FormGroup style={formStyle}>
		<Label
			{...labelProps}
			className={selectProps.required ? 'required' : ''}
			for={selectProps.id}>
			{label}
		</Label>
		<SelectComponent {...selectProps} onChange={onChange} />
	</FormGroup>
);

SelectWithLabel.propTypes = {
	label: PropTypes.string.isRequired,
	labelProps: PropTypes.shape({}),
	onChange: PropTypes.func.isRequired,
	formStyle: PropTypes.style,
};

SelectWithLabel.defaultProps = {
	labelProps: {},
};

export default SelectWithLabel;
