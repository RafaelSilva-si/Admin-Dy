import React from 'react';
import { Col, FormGroup, Label } from 'reactstrap';
import SelectComp from './Select';
import PropTypes from '../../lib/utils/propTypes';

const SelectRowLabel = ({ label, labelProps, ...selectProps }) => (
	<FormGroup row>
		<Label
			{...labelProps}
			className={selectProps.required ? 'required' : ''}
			sm={3}
			for={selectProps.id}>
			{label}
		</Label>
		<Col sm={9}>
			<SelectComp {...selectProps} />
		</Col>
	</FormGroup>
);

SelectRowLabel.propTypes = {
	label: PropTypes.string.isRequired,
	labelProps: PropTypes.shape({}),
};

SelectRowLabel.defaultProps = {
	labelProps: {},
};

export default SelectRowLabel;
