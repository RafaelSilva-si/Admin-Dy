import React from 'react';
import { Badge } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Switch, Tooltip } from '../index';
import PropTypes from '../../../lib/utils/propTypes';
import { apiActions } from '../../../store/actions';

const ActiveDeleteEdit = ({
	row,
	handleNavigation,
	route,
	changeValue,
	onSelect,
	...restProps
}) => {
	const dispatch = useDispatch();

	return (
		<div {...restProps}>
			<Badge
				href={`/${route}/editar/${row.id}`}
				color="info"
				id={`edit${row.id}`}
				onClick={() => handleNavigation(`/${route}/editar/${row.id}`)}>
				<MdEdit size={15} />
			</Badge>
			<Badge
				href="#"
				color="danger"
				className="ml-2 mr-2"
				id={`delete${row.id}`}
				onClick={() => {
					onSelect(row);
					dispatch(apiActions.toogleModal());
				}}>
				<MdDelete size={15} />
			</Badge>
			<Switch
				defaultChecked={row.status}
				onChange={() => changeValue(row)}
				id={`switch${row.id}`}
			/>
			<Tooltip label="Editar" target={`edit${row.id}`} />
			<Tooltip label="Deletar" target={`delete${row.id}`} />
			<Tooltip
				label={row.status ? 'Desativar' : 'Ativar'}
				target={`switch${row.id}`}
			/>
		</div>
	);
};

ActiveDeleteEdit.propTypes = {
	row: PropTypes.shape({ id: PropTypes.ID, status: PropTypes.bool })
		.isRequired,
	handleNavigation: PropTypes.func.isRequired,
	route: PropTypes.string.isRequired,
	changeValue: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default ActiveDeleteEdit;
