import React from 'react';
import moment from 'moment';
import { FormGroup, InputGroup, InputGroupAddon, Label } from 'reactstrap';
import PropTypes from '../../lib/utils/propTypes';
import DatePicker from './DatePicker';

const DataPickerBetween = ({
	middleText,
	firstOnChange,
	firstSelect,
	secondOnChange,
	secondSelect,
	label,
	first,
	second,
	firstPlaceholder,
	secondPlaceholder,
	required,
	...rest
}) => (
	<FormGroup {...rest}>
		<Label className={required ? 'required' : ''}>{label}</Label>
		<InputGroup>
			<DatePicker
				handleChange={firstOnChange}
				startDate={firstSelect}
				maxDate={new Date(moment(secondSelect, 'DD/MM/YYYY HH:mm Z'))}
				placeholderText={firstPlaceholder}
				required={required}
				{...first}
			/>
			<InputGroupAddon addonType="prepend">{middleText}</InputGroupAddon>
			<DatePicker
				handleChange={secondOnChange}
				startDate={secondSelect}
				minDate={new Date(moment(firstSelect, 'DD/MM/YYYY HH:mm Z'))}
				placeholderText={secondPlaceholder}
				required={required}
				{...second}
			/>
		</InputGroup>
	</FormGroup>
);

DataPickerBetween.propTypes = {
	middleText: PropTypes.string,
	firstOnChange: PropTypes.func.isRequired,
	firstSelect: PropTypes.date.isRequired,
	secondOnChange: PropTypes.func.isRequired,
	secondSelect: PropTypes.date.isRequired,
	label: PropTypes.string.isRequired,
	firstPlaceholder: PropTypes.string,
	secondPlaceholder: PropTypes.string,
	first: PropTypes.shape({}),
	second: PropTypes.shape({}),
	required: PropTypes.bool,
};

DataPickerBetween.defaultProps = {
	middleText: 'até',
	firstPlaceholder: 'início',
	secondPlaceholder: 'fim',
	first: {},
	second: {},
	required: false,
};

export default DataPickerBetween;
