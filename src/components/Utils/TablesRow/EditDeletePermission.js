import React from 'react';
import { Badge } from 'reactstrap';
import { MdDelete, MdEdit, MdLock } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { apiActions } from '../../../store/actions';
import PropTypes from '../../../lib/utils/propTypes';
import Tooltip from '../Tooltip';

const EditDeletePermission = ({
	row,
	handleNavigation,
	route,
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
				className="ml-2"
				id={`delete${row.id}`}
				onClick={() => {
					onSelect(row);
					dispatch(apiActions.toogleModal());
				}}>
				<MdDelete size={15} />
			</Badge>
			<Badge
				href={`/${route}/permissoes/${row.id}`}
				color="warning"
				id={`permissions${row.id}`}
				className="ml-2"
				onClick={() =>
					handleNavigation(`/${route}/permissoes/${row.id}`)
				}>
				<MdLock size={15} color="#fff" />
			</Badge>
			<Tooltip label="Editar" target={`edit${row.id}`} />
			<Tooltip label="Permissões" target={`permissions${row.id}`} />
			<Tooltip label="Deletar" target={`delete${row.id}`} />
		</div>
	);
};

EditDeletePermission.propTypes = {
	row: PropTypes.shape({ id: PropTypes.ID }).isRequired,
	handleNavigation: PropTypes.func.isRequired,
	route: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default EditDeletePermission;
