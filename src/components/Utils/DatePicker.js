import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import moment from 'moment';
import { today } from '../../lib/utils/functions';
import PropTypes from '../../lib/utils/propTypes';

registerLocale('ptBR', ptBR);

const DatePickerComponent = ({
	startDate,
	handleChange,
	className,
	placeholderText,
	...rest
}) => {
	return (
		<div className="customDatePickerWidth">
			<DatePicker
				selected={
					startDate !== 'Invalid date'
						? new Date(moment(startDate, 'DD/MM/YYYY HH:mm Z'))
						: null
				}
				className="form-control"
				onChange={handleChange}
				locale="ptBR"
				dateFormat="dd/MM/yyyy"
				placeholderText={placeholderText}
				{...rest}
			/>
		</div>
	);
};

DatePickerComponent.propTypes = {
	startDate: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	placeholderText: PropTypes.string,
};

DatePickerComponent.defaultProps = {
	startDate: today(),
	placeholderText: 'data',
	className: '',
};

export default DatePickerComponent;
