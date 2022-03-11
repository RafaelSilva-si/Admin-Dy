import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import Card from '../../Utils/Card/FormCard';
import { Checkbox, InputLabel, SelectLabel } from '../../Utils';

const FormUser = ({
	userLabel,
	userInputProps,
	emailLabel,
	emailInputProps,
	firstNameLabel,
	firstNameInputProps,
	lastNameLabel,
	lastNameInputProps,
	companyLabel,
	companyInputProps,
	interLoginLabel,
	interLoginInputProps,
	extraIdLabel,
	extraIdInputProps,
	groupLabel,
	groupInputProps,
	activeLabel,
	activeInputProps,
	typeLabel,
	typeInputProps,
	passwordLabel,
	passwordInputProps,
	confirmLabel,
	confirmInputProps,
	btnLabelSubmit,
	btnLabelCancel,
	handleNavigation,
	onSubmit,
	user,
	edit,
	companiesList,
	groups,
	representatives,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: user,
	});
	const [companies, setCompanyValue] = useState({
		selectedOption: user.companies,
	});

	let extraId = '';
	if (user.group) {
		if (user.group.id === 5 && user.extra_id) {
			const value = parseInt(user.extra_id, 10);
			extraId = representatives.find(x => x.id === value);
		}
	}

	const [representative, setRepresentative] = useState({
		selectedOption: extraId,
	});

	const [group, setGroupValue] = useState({ selectedOption: user.group });

	const handleMultiChange = selectedOption => {
		setValue('companies', selectedOption);
		setCompanyValue({ selectedOption });
	};

	const handleChange = selectedOption => {
		setValue('group.id', selectedOption.id);
		setGroupValue({ selectedOption });
	};

	const handleChangeRepresentative = selectedOption => {
		setValue(
			'extra_id',
			selectedOption !== null ? selectedOption.id : selectedOption,
		);
		setRepresentative({ selectedOption });
	};

	React.useEffect(() => {
		register({ name: 'companies' }, { required: true });
		register({ name: 'group.id' });
		register({ name: 'extra_id' });
	}, [register]);

	return (
		<Card title="Nova usuário">
			<form onSubmit={handleSubmit(onSubmit)} {...restProps}>
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
						<InputLabel
							label={firstNameLabel}
							{...firstNameInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={6} lg={12} md={12}>
						<InputLabel
							label={lastNameLabel}
							{...lastNameInputProps}
							innerRef={register}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={6} lg={12} md={12}>
						<SelectLabel
							label={companyLabel}
							{...companyInputProps}
							options={companiesList}
							value={companies.selectedOption}
							onChange={handleMultiChange}
						/>
					</Col>
					<Col xl={6} lg={12} md={12}>
						{/* <InputLabel
							label={extraIdLabel}
							{...extraIdInputProps}
							innerRef={register}
						/> */}
						<SelectLabel
							label={groupLabel}
							{...groupInputProps}
							options={groups}
							onChange={handleChange}
							value={group.selectedOption}
						/>
					</Col>
				</Row>
				{group.selectedOption && (
					<Row>
						{group.selectedOption.id === 5 && (
							<Col xl={6} lg={12} md={12}>
								<SelectLabel
									label={extraIdLabel}
									{...extraIdInputProps}
									options={representatives}
									value={representative.selectedOption}
									onChange={handleChangeRepresentative}
									isClearable
								/>
							</Col>
						)}
					</Row>
				)}
				{/* <Row>
					<Col xl={6} lg={12} md={12}>
						<SelectLabel
							label={groupLabel}
							{...groupInputProps}
							options={groups}
							onChange={handleChange}
							value={group.selectedOption}
						/>
					</Col>
				</Row> */}
				<Row>
					{/* <Col xl={4} lg={12} md={12}>
						<Checkbox
							{...interLoginInputProps}
							innerRef={register}
							label={interLoginLabel}
						/>
					</Col> */}
					<Col xl={4} lg={12} md={12}>
						<Checkbox
							{...activeInputProps}
							innerRef={register}
							label={activeLabel}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<Checkbox
							{...typeInputProps}
							innerRef={register}
							label={typeLabel}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={6} lg={12} md={12}>
						<InputLabel
							label={passwordLabel}
							required={!edit}
							{...passwordInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={6} lg={12} md={12}>
						<InputLabel
							required={!edit}
							label={confirmLabel}
							{...confirmInputProps}
							innerRef={register}
						/>
					</Col>
				</Row>
				<Button
					color="danger"
					outline
					className="float-left col-md-2 mt-3"
					onClick={() => handleNavigation()}>
					{btnLabelCancel}
				</Button>
				<Button
					color="success"
					outline
					type="submit"
					className="float-right col-md-2 mt-3">
					{btnLabelSubmit}
				</Button>
			</form>
		</Card>
	);
};

FormUser.propTypes = {
	userLabel: PropTypes.string,
	userInputProps: PropTypes.shape({}),
	emailLabel: PropTypes.string,
	emailInputProps: PropTypes.shape({}),
	firstNameLabel: PropTypes.string,
	firstNameInputProps: PropTypes.shape({}),
	lastNameLabel: PropTypes.string,
	lastNameInputProps: PropTypes.shape({}),
	companyLabel: PropTypes.string,
	companyInputProps: PropTypes.shape({}),
	interLoginLabel: PropTypes.string,
	interLoginInputProps: PropTypes.shape({}),
	extraIdLabel: PropTypes.string,
	extraIdInputProps: PropTypes.shape({}),
	groupLabel: PropTypes.string,
	groupInputProps: PropTypes.shape({}),
	typeLabel: PropTypes.string,
	typeInputProps: PropTypes.shape({}),
	activeLabel: PropTypes.string,
	activeInputProps: PropTypes.shape({}),
	passwordLabel: PropTypes.string,
	passwordInputProps: PropTypes.shape({}),
	confirmLabel: PropTypes.string,
	confirmInputProps: PropTypes.shape({}),
	btnLabelSubmit: PropTypes.string,
	btnLabelCancel: PropTypes.string,
	handleNavigation: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	edit: PropTypes.bool.isRequired,
	companiesList: PropTypes.arrayOf(PropTypes.object).isRequired,
	user: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.shape({ group: PropTypes.object }),
	]).isRequired,
	groups: PropTypes.arrayOf(PropTypes.object).isRequired,
	representatives: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FormUser.defaultProps = {
	userLabel: 'Usuário',
	userInputProps: {
		name: 'username',
		id: 'username',
		placeholder: 'usuário',
		required: true,
	},
	emailLabel: 'Email',
	emailInputProps: {
		name: 'email',
		id: 'email',
		type: 'email',
		placeholder: 'email@email.com',
		required: true,
	},
	lastNameLabel: 'Sobrenome',
	lastNameInputProps: {
		name: 'last_name',
		id: 'last_name',
		placeholder: 'sobrenome',
	},
	firstNameLabel: 'Nome',
	firstNameInputProps: {
		name: 'first_name',
		id: 'first_name',
		placeholder: 'nome',
		required: true,
	},
	companyLabel: 'Empresa',
	companyInputProps: {
		name: 'company',
		id: 'company',
		placeholder: 'selecione a empresa',
		required: true,
		isMulti: 'true',
	},
	interLoginLabel: 'Usuário AD',
	interLoginInputProps: {
		name: 'internal_login',
		id: 'internalLogin',
	},
	extraIdLabel: 'Representante ERP',
	extraIdInputProps: {
		type: 'number',
		name: 'extra_id',
		id: 'extra_id',
		placeholder: 'selecione um representante',
	},
	groupLabel: 'Grupo de permissões',
	groupInputProps: {
		name: 'group',
		id: 'group',
		placeholder: 'selecione o grupo de permissões',
	},
	typeLabel: 'Administrador',
	typeInputProps: {
		name: 'is_superuser',
		id: 'is_superuser',
	},
	activeLabel: 'Ativo',
	activeInputProps: {
		name: 'active',
		id: 'active',
	},
	passwordLabel: 'Senha',
	passwordInputProps: {
		name: 'password',
		id: 'password',
		type: 'password',
		placeholder: 'senha',
	},
	confirmLabel: 'Confirmar Senha',
	confirmInputProps: {
		name: 'confirm_password',
		id: 'confirm_password',
		type: 'password',
		placeholder: 'confirmar senha',
	},
	btnLabelSubmit: 'Salvar',
	btnLabelCancel: 'Cancelar',
};

export default FormUser;
