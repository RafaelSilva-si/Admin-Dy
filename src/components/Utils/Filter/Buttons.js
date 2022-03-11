import React from 'react';
import { Button, Row } from 'reactstrap';
import PropTypes from '../../../lib/utils/propTypes';

const ButtonFilter = ({
	btnLabelSubmit,
	btnLabelClean,
	onClickClean,
	typeClean,
	...restProps
}) => (
	<Row className="justify-content-center" {...restProps}>
		<Button
			color="danger"
			type={typeClean}
			onClick={onClickClean}
			outline
			className=" col-md-2 mb-3 mr-3 ml-3">
			{btnLabelClean}
		</Button>
		<Button
			color="success"
			type="submit"
			outline
			className="col-md-2 mb-3 mr-3 ml-3">
			{btnLabelSubmit}
		</Button>
	</Row>
);

ButtonFilter.propTypes = {
	btnLabelSubmit: PropTypes.string,
	btnLabelClean: PropTypes.string,
	onClickClean: PropTypes.func.isRequired,
	typeClean: PropTypes.string,
};

ButtonFilter.defaultProps = {
	btnLabelSubmit: 'Consultar',
	btnLabelClean: 'Limpar',
	typeClean: 'reset',
};

export default ButtonFilter;
