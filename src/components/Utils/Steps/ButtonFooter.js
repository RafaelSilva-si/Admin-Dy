import React from 'react';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import PropTypes from '../../../lib/utils/propTypes';
import ButtonLoading from './ButtonLoading';

const ButtonFooter = ({
	labelCancel,
	labelSubmit,
	labelBack,
	back,
	save,
	labelNext,
	onCancel,
	onSubmit1,
	onSubmit2,
	onBack,
	next,
	...restProps
}) => {
	const loadingSubmit = useSelector(state => state.salesFlow.loading);
	const type = useSelector(state => state.salesFlow.typeButton);

	return (
		<div {...restProps}>
			{back && (
				<Button
					color="danger"
					outline
					type="button"
					className="float-left col-md-2 mt-3 mr-2"
					onClick={onBack}>
					{labelBack}
				</Button>
			)}
			<Button
				color="danger"
				outline
				type="button"
				className="float-left col-md-2 mt-3"
				onClick={onCancel}>
				{labelCancel}
			</Button>
			{save && (
				<div>
					{next && (
						<ButtonLoading
							label={labelNext}
							loading={loadingSubmit && !type}
							disabled={loadingSubmit && type}
							color="success"
							className="float-right col-md-2 mt-3 ml-2"
							onClick={onSubmit1}
						/>
					)}
					<ButtonLoading
						label={labelSubmit}
						color="success"
						className="float-right col-md-2 mt-3"
						onClick={onSubmit2}
						disabled={loadingSubmit && !type}
						loading={loadingSubmit && type}
					/>
				</div>
			)}
		</div>
	);
};

ButtonFooter.propTypes = {
	// eslint-disable-next-line react/require-default-props
	onSubmit2: PropTypes.func,
	labelCancel: PropTypes.string,
	onCancel: PropTypes.func.isRequired,
	labelSubmit: PropTypes.string,
	labelNext: PropTypes.string,
	labelBack: PropTypes.string,
	// eslint-disable-next-line react/require-default-props
	onSubmit1: PropTypes.func,
	// eslint-disable-next-line react/require-default-props
	onBack: PropTypes.func,
	back: PropTypes.bool,
	save: PropTypes.bool,
	next: PropTypes.bool,
};

ButtonFooter.defaultProps = {
	labelCancel: 'Cancelar',
	labelSubmit: 'Salvar',
	labelNext: 'Salvar e avançar',
	labelBack: 'Voltar',
	back: false,
	save: true,
	next: true,
};

export default ButtonFooter;
