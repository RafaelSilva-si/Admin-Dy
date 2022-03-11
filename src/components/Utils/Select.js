import React from 'react';
import ReactSelect from 'react-select';
import R from '../../lib/constants/R';
import PropTypes from '../../lib/utils/propTypes';

export const Select = ({ options, fieldName, fieldValue, ...rest }) => (
	<div className="select">
		<ReactSelect
			options={options}
			noOptionsMessage={() => 'Sem opções'}
			getOptionLabel={option => option[fieldName]}
			getOptionValue={option => option[fieldValue]}
			styles={{
				control: (base, state) => ({
					...base,
					'&:hover': { borderColor: 'none' },
					border: state.isFocused
						? `1px solid ${R.colors.colorPrimary}`
						: '1px solid lightgray',
					boxShadow: state.isFocused
						? `0px 0px 5px${R.colors.colorPrimary}`
						: 0,
				}),
			}}
			{...rest}
		/>
	</div>
);

Select.propTypes = {
	options: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
	fieldName: PropTypes.string,
	fieldValue: PropTypes.string,
};

Select.defaultProps = {
	options: [],
	fieldName: 'name',
	fieldValue: 'id',
};

export default Select;
