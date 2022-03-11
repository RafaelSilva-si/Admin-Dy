import React, { useState } from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import R from '../../lib/constants/R';
import PropTypes from '../../lib/utils/propTypes';

const SelectCom = ({ options, loadOptions, ...rest }) => {
	const [text, setText] = useState('');
	const loading = useSelector(state => state.api.loading);

	const get = input => {
		if (input.length > 3) {
			setText(input);
			loadOptions(input);
		}
	};

	const renderText = () => {
		if (text.length > 3 && options.length === 0) {
			return 'Sem opções';
		}
		return 'Digite mais de 3 caracteres para buscar opções...';
	};

	return (
		<div className="select">
			<Select
				onInputChange={get}
				options={options || []}
				isLoading={loading}
				noOptionsMessage={() => renderText()}
				getOptionLabel={option => option.name}
				getOptionValue={option => option.id}
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
};

SelectCom.propTypes = {
	options: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
	loadOptions: PropTypes.func.isRequired,
};

export default SelectCom;
