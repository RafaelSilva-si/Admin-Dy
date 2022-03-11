import React from 'react';
import { Input, Label } from 'reactstrap';
import PropTypes from '../../lib/utils/propTypes';

const Checkbox = ({ label, ...inputProps }) => (
	<div className="pretty p-default p-curve  p-smooth">
		<Input type="checkbox" {...inputProps} />
		<div className="state p-primary">
			<Label>{label}</Label>
		</div>
	</div>
);

Checkbox.propTypes = {
	label: PropTypes.string.isRequired,
};

export default Checkbox;
