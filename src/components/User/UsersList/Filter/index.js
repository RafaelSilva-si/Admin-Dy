import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { InputLabel, SelectLabel } from '../../../Utils';
import { ButtonsFilter, CollapseFilter } from '../../../Utils/Filter';
import { removeEmpty } from '../../../../lib/utils/functions';
import { statusList } from '../../../../lib/utils/selects';
import PropTypes from '../../../../lib/utils/propTypes';

const FilterUsers = ({
	userLabel,
	userInputProps,
	emailInputProps,
	emailLabel,
	companyInputProps,
	companyLabel,
	onSubmit,
	clearQuery,
	companies,
	statusLabel,
	statusInputProps,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: { active: 'true' },
	});

	const [value, setReactSelectValue] = useState({ selectedOption: [] });
	const [status, setStatus] = useState({ selectedOption: statusList[1] });

	const onSubmitForm = data => {
		let values = data;
		values = removeEmpty(values);
		onSubmit(values);
	};

	const handleChange = selectedOption => {
		setValue('company', selectedOption.id);
		setReactSelectValue({ selectedOption });
	};

	const handleChangeStatus = selectedOption => {
		setValue('active', selectedOption.id);
		setStatus({ selectedOption });
	};

	React.useEffect(() => {
		register({ name: 'company' });
		register({ name: 'active' });
	}, [register]);

	const clear = () => {
		setValue('company', '');
		setValue('active', statusList[1].id);
		setStatus({ selectedOption: statusList[1] });
		setReactSelectValue({ selectedOption: [] });
		clearQuery();
	};

	return (
		<div {...restProps} className="mb-3">
			<CollapseFilter open>
				<form onSubmit={handleSubmit(onSubmitForm)}>
					<Row>
						<Col xl={6} lg={12} md={12}>
							<InputLabel
								label={userLabel}
								{...userInputProps}
								innerRef={register}
							/>
						</Col>
						<Col xl={6} lg={12} md={12}>
							<InputLabel
								label={emailLabel}
								{...emailInputProps}
								innerRef={register}
							/>
						</Col>
					</Row>
					<Row>
						<Col xl={6} lg={12} md={12}>
							<SelectLabel
								label={companyLabel}
								{...companyInputProps}
								options={companies}
								onChange={handleChange}
								value={value.selectedOption}
							/>
						</Col>
						<Col xl={6} lg={12} md={12}>
							<SelectLabel
								label={statusLabel}
								{...statusInputProps}
								options={statusList}
								onChange={handleChangeStatus}
								value={status.selectedOption}
							/>
						</Col>
					</Row>
					<ButtonsFilter onClickClean={() => clear()} />
				</form>
			</CollapseFilter>
		</div>
	);
};

FilterUsers.propTypes = {
	userLabel: PropTypes.string,
	userInputProps: PropTypes.shape({}),
	emailLabel: PropTypes.string,
	emailInputProps: PropTypes.shape({}),
	companyLabel: PropTypes.string,
	companyInputProps: PropTypes.shape({}),
	statusLabel: PropTypes.string,
	statusInputProps: PropTypes.shape({}),
	onSubmit: PropTypes.func.isRequired,
	clearQuery: PropTypes.func.isRequired,
	companies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FilterUsers.defaultProps = {
	userLabel: 'Usuário',
	userInputProps: {
		name: 'username',
		id: 'username',
		placeholder: 'usuário',
	},
	emailLabel: 'Email',
	emailInputProps: {
		name: 'email',
		id: 'email',
		type: 'email',
		placeholder: 'email@email.com',
	},
	companyLabel: 'Empresa',
	companyInputProps: {
		name: 'company',
		id: 'company',
		placeholder: 'selecione a empresa',
	},
	statusLabel: 'Status',
	statusInputProps: {
		name: 'active',
		id: 'active',
		placeholder: 'selecione um status',
	},
};

export default FilterUsers;
