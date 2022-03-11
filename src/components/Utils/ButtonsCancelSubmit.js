import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from '../../lib/utils/propTypes';
import ButtonLoading from './ButtonLoading';

const ButtonsCancelSubmit = ({
	labelCancel,
	labelSubmit,
	onCancel,
	onSubmit,
	...restProps
}) => (
	<div {...restProps}>
		<Button
			color="danger"
			outline
			type="button"
			className="float-left col-md-2 mt-3"
			onClick={onCancel}>
			{labelCancel}
		</Button>
		<ButtonLoading
			label={labelSubmit}
			color="success"
			className="float-right col-md-2 mt-3"
			onClick={onSubmit}
		/>
	</div>
);

ButtonsCancelSubmit.propTypes = {
	labelCancel: PropTypes.string,
	onCancel: PropTypes.func.isRequired,
	labelSubmit: PropTypes.string,
	// eslint-disable-next-line react/require-default-props
	onSubmit: PropTypes.func,
};

ButtonsCancelSubmit.defaultProps = {
	labelCancel: 'Cancelar',
	labelSubmit: 'Salvar',
};

export default ButtonsCancelSubmit;
