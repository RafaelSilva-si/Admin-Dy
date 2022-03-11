import React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import PropTypes from '../../lib/utils/propTypes';

const InputRowLabel = ({ label, labelProps, ...inputProps }) => (
	<FormGroup row>
		<Label
			{...labelProps}
			className={inputProps.required ? 'required' : ''}
			sm={3}
			for={inputProps.id}>
			{label}
		</Label>
		<Col sm={9}>
			<Input {...inputProps} />
		</Col>
	</FormGroup>
);

InputRowLabel.propTypes = {
	label: PropTypes.string.isRequired,
	labelProps: PropTypes.shape({}),
};

InputRowLabel.defaultProps = {
	labelProps: {},
};

export default InputRowLabel;
