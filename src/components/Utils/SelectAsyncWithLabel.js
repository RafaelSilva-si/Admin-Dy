import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from '../../lib/utils/propTypes';
import Select from './SelectAsync';

const SelectWithLabel = ({ label, labelProps, onChange, ...selectProps }) => (
	<FormGroup>
		<Label
			{...labelProps}
			className={selectProps.required ? 'required' : ''}
			for={selectProps.id}>
			{label}
		</Label>
		<Select {...selectProps} onChange={onChange} />
	</FormGroup>
);

SelectWithLabel.propTypes = {
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	labelProps: PropTypes.shape({}),
};

SelectWithLabel.defaultProps = {
	labelProps: {},
};

export default SelectWithLabel;
