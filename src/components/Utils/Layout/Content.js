import React from 'react';
import { Container } from 'reactstrap';
import bn from '../../../lib/utils/bemnames';
import PropTypes from '../../../lib/utils/propTypes';

const bem = bn.create('content');

const Content = ({ tag: Tag, className, ...restProps }) => {
	const classes = bem.b(className);

	return <Tag className={classes} {...restProps} />;
};

Content.propTypes = {
	tag: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	className: PropTypes.string,
};

Content.defaultProps = {
	tag: Container,
	className: '',
};

export default Content;
