import React from 'react';
import { Badge } from 'reactstrap';
import { MdEdit, MdLock } from 'react-icons/md';
import { Switch, Tooltip } from '../index';
import PropTypes from '../../../lib/utils/propTypes';

const ActiveEditPermission = ({
	row,
	handleNavigation,
	handlePermissions,
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
		<Badge
			href="#"
			color="warning"
			className="ml-2"
			id={`permissions${row.id}`}
			onClick={() => handlePermissions(row)}>
			<MdLock size={15} color="#fff" />
		</Badge>
		<Tooltip label="Editar" target={`edit${row.id}`} />
		<Tooltip label="Permissões" target={`permissions${row.id}`} />
		<Tooltip
			label={row.active ? 'Desativar' : 'Ativar'}
			target={`switch${row.id}`}
		/>
	</div>
);

ActiveEditPermission.propTypes = {
	row: PropTypes.shape({ id: PropTypes.ID, active: PropTypes.bool })
		.isRequired,
	handleNavigation: PropTypes.func.isRequired,
	route: PropTypes.string.isRequired,
	changeValue: PropTypes.func.isRequired,
	handlePermissions: PropTypes.func.isRequired,
};

export default ActiveEditPermission;
