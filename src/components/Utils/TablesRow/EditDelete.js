import React from 'react';
import { Badge } from 'reactstrap';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import PropTypes from '../../../lib/utils/propTypes';
import Tooltip from '../Tooltip';
import { apiActions } from '../../../store/actions';

const EditDelete = ({
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
				href="#"
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
			<Tooltip label="Editar" target={`edit${row.id}`} />
			<Tooltip label="Deletar" target={`delete${row.id}`} />
		</div>
	);
};

EditDelete.propTypes = {
	row: PropTypes.shape({ id: PropTypes.ID }).isRequired,
	handleNavigation: PropTypes.func.isRequired,
	route: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default EditDelete;
