import React from 'react';
import { Badge } from 'reactstrap';
import { MdEdit } from 'react-icons/md';

import PropTypes from '../../../lib/utils/propTypes';
import Tooltip from '../Tooltip';

const Edit = ({ row, handleNavigation, route, ...restProps }) => {
	return (
		<div {...restProps}>
			<Badge
				href="#"
				color="info"
				id={`edit${row.id}`}
				onClick={() => handleNavigation(`/${route}/editar/${row.id}`)}>
				<MdEdit size={15} />
			</Badge>

			<Tooltip label="Editar" target={`edit${row.id}`} />
		</div>
	);
};

Edit.propTypes = {
	row: PropTypes.shape({ id: PropTypes.ID }).isRequired,
	handleNavigation: PropTypes.func.isRequired,
	route: PropTypes.string.isRequired,
};

export default Edit;
