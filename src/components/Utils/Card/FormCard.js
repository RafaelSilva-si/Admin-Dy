import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import PropTypes from '../../../lib/utils/propTypes';
import bn from '../../../lib/utils/bemnames';

const bem = bn.create('card');

const FormCard = ({ title, children, ...restProps }) => (
	<Card className={bem.b('')} {...restProps}>
		<CardBody>{children}</CardBody>
	</Card>
);

FormCard.propTypes = {
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
	children: PropTypes.node.isRequired,
};

FormCard.defaultProps = {};

export default FormCard;
