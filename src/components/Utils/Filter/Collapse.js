import React from 'react';
import { Card, CardBody, CardHeader, Col, Collapse } from 'reactstrap';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { apiActions } from '../../../store/actions';
import PropTypes from '../../../lib/utils/propTypes';

const CollapseFilter = ({ children, title, ...restProps }) => {
	const isOpen = useSelector(state => state.api.filter);
	const dispatch = useDispatch();

	return (
		<Card {...restProps}>
			<CardHeader
				onClick={() => dispatch(apiActions.toogleFilter())}
				style={{ borderBottom: isOpen ? 'inherit' : 0 }}>
				{title}
				{!isOpen ? (
					<MdExpandMore size={25} className="float-right" />
				) : (
					<MdExpandLess size={25} className="float-right" />
				)}
			</CardHeader>
			<Collapse isOpen={isOpen}>
				<CardBody>
					<Col>{children}</Col>
				</CardBody>
			</Collapse>
		</Card>
	);
};

CollapseFilter.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node.isRequired,
};

CollapseFilter.defaultProps = {
	title: 'Filtro',
};

export default CollapseFilter;
