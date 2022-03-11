import React from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../../lib/utils/propTypes';
import Card from '../../../Utils/Card/FormCard';
import { ButtonLoading, InputLabel } from '../../../Utils';

const FormProfile = ({
	userInputProps,
	userLabel,
	emailLabel,
	emailInputProps,
	firstNameInputProps,
	firstNameLabel,
	lastNameInputProps,
	lastNameLabel,
	btnLabel,
	user,
	onSubmit,
	...restProps
}) => {
	const { register, handleSubmit } = useForm({
		defaultValues: user,
	});

	return (
		<Card title="Dados" {...restProps}>
			<form onSubmit={handleSubmit(onSubmit)}>
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
				<InputLabel
					label={firstNameLabel}
					{...firstNameInputProps}
					innerRef={register}
				/>
				<InputLabel
					label={lastNameLabel}
					{...lastNameInputProps}
					innerRef={register}
				/>

				<ButtonLoading
					color="success"
					className="float-right col-md-2 mt-3"
					label={btnLabel}
				/>
			</form>
		</Card>
	);
};

FormProfile.propTypes = {
	userLabel: PropTypes.string,
	userInputProps: PropTypes.shape({}),
	emailLabel: PropTypes.string,
	emailInputProps: PropTypes.shape({}),
	firstNameLabel: PropTypes.string,
	firstNameInputProps: PropTypes.shape({}),
	lastNameLabel: PropTypes.string,
	lastNameInputProps: PropTypes.shape({}),
	btnLabel: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	user: PropTypes.PropTypes.shape({}).isRequired,
};

FormProfile.defaultProps = {
	userLabel: 'Usuário',
	userInputProps: {
		plaintext: true,
		readOnly: true,
		id: 'user',
		name: 'username',
	},
	emailLabel: 'Email',
	emailInputProps: {
		plaintext: true,
		readOnly: true,
		id: 'email',
		name: 'email',
	},
	firstNameLabel: 'Nome',
	firstNameInputProps: {
		name: 'first_name',
		id: 'first_name',
		placeholder: 'nome',
		required: true,
	},
	lastNameLabel: 'Sobrenome',
	lastNameInputProps: {
		name: 'last_name',
		id: 'last_name',
		placeholder: 'sobrenome',
	},
	btnLabel: 'Salvar',
};

export default FormProfile;
