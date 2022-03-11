import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { MdSettings } from 'react-icons/md';
import PropTypes from '../../../lib/utils/propTypes';
// import SelectLabel from '../SelectWithLabel';
import InputWithLabel from '../InputWithLabel';

const SelectConfigurator = ({
	label,
	options,
	disabled,
	openConfigurator,
	value,
	...configuratorSelectProps
}) => {
	return (
		<Row className="align-items-center">
			<Col xl={11} lg={11} md={11}>
				{/* <SelectLabel
					label={label}
					{...configuratorSelectProps}
					options={options}
					isDisabled={disabled}
					fieldName="desc_tela"
					fieldValue="id"
				/> */}
				<InputWithLabel
					label={label}
					value={value}
					disabled
					{...configuratorSelectProps}
				/>
			</Col>
			<Col xl={1} lg={1} md={1} className="mb-0">
				<Button
					outline
					type="button"
					onClick={openConfigurator}
					disabled={disabled}>
					<MdSettings />
				</Button>
			</Col>
		</Row>
	);
};

SelectConfigurator.propTypes = {
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	disabled: PropTypes.bool,
	openConfigurator: PropTypes.func.isRequired,
	value: PropTypes.string,
};

SelectConfigurator.defaultProps = { disabled: true, value: '' };

export default SelectConfigurator;
