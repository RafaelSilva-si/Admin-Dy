import React from 'react';
import { Input, Label } from 'reactstrap';
import PropTypes from '../../lib/utils/propTypes';

const Switch = ({ label, ...inputProps }) => (
	<div className="pretty p-switch p-fill p-smooth">
		<Input type="checkbox" {...inputProps} />
		<div className="state p-success">
			<Label>{label}</Label>
		</div>
	</div>
);

Switch.propTypes = {
	label: PropTypes.string,
};

Switch.defaultProps = {
	label: '',
};

export default Switch;
