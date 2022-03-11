import React from 'react';
import { Badge } from 'reactstrap';
import { MdEdit } from 'react-icons/md';
import { Switch, Tooltip } from '../index';
import PropTypes from '../../../lib/utils/propTypes';

const ActiveEdit = ({
	row,
	handleNavigation,

	route,
	changeValue,
	...restProps
}) => (
	<div {...restProps}>
		<Switch
			defaultChecked={row.active}
			onChange={() => changeValue(row)}
			id={`switch${row.id}`}
		/>
		<Badge
			href={`/${route}/editar/${row.id}`}
			color="info"
			id={`edit${row.id}`}
			onClick={() => handleNavigation(`/${route}/editar/${row.id}`)}>
			<MdEdit size={15} />
		</Badge>

		<Tooltip label="Editar" target={`edit${row.id}`} />

		<Tooltip
			label={row.active ? 'Desativar' : 'Ativar'}
			target={`switch${row.id}`}
		/>
	</div>
);

ActiveEdit.propTypes = {
	row: PropTypes.shape({ id: PropTypes.ID, active: PropTypes.bool })
		.isRequired,
	handleNavigation: PropTypes.func.isRequired,
	route: PropTypes.string.isRequired,
	changeValue: PropTypes.func.isRequired,
};

export default ActiveEdit;
