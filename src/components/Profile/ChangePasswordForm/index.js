import React from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import Card from '../../Utils/Card/FormCard';
import { ButtonsCancelSubmit, InputLabel } from '../../Utils';

const FormProfile = ({
	passwordLabel,
	passwordInputProps,
	passwordConfirmLabel,
	passwordConfirmInputProps,
	handleNavigation,
	onSubmit,
	...restProps
}) => {
	const { register, handleSubmit } = useForm();

	return (
		<Card title="Nova senha">
			<form onSubmit={handleSubmit(onSubmit)} {...restProps}>
				<Row>
					<Col xl={6} lg={12} md={12}>
						<InputLabel
							label={passwordLabel}
							{...passwordInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={6} lg={12} md={12}>
						<InputLabel
							label={passwordConfirmLabel}
							{...passwordConfirmInputProps}
							innerRef={register}
						/>
					</Col>
				</Row>
				<ButtonsCancelSubmit onCancel={() => handleNavigation()} />
			</form>
		</Card>
	);
};

FormProfile.propTypes = {
	passwordLabel: PropTypes.string,
	passwordInputProps: PropTypes.shape({}),
	passwordConfirmLabel: PropTypes.string,
	passwordConfirmInputProps: PropTypes.shape({}),
	handleNavigation: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

FormProfile.defaultProps = {
	passwordLabel: 'Senha',
	passwordInputProps: {
		name: 'password',
		id: 'password',
		type: 'password',
		placeholder: 'senha',
		required: true,
	},
	passwordConfirmLabel: 'Confirmar Senha',
	passwordConfirmInputProps: {
		name: 'confirm_password',
		id: 'confirm_password',
		type: 'password',
		placeholder: 'confirmar senha',
		required: true,
	},
};

export default FormProfile;
