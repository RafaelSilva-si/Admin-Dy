import React from 'react';
import { Switch, Tooltip } from '../index';
import PropTypes from '../../../lib/utils/propTypes';

const Active = ({ row, changeValue, ...restProps }) => (
	<div {...restProps}>
		<Switch
			defaultChecked={row.status}
			onChange={() => changeValue(row)}
			id={`switch${row.item}${row.id}`}
		/>
		<Tooltip
			label={row.status ? 'Desativar' : 'Ativar'}
			target={`switch${row.item}${row.id}`}
		/>
	</div>
);

Active.propTypes = {
	row: PropTypes.shape({
		item: PropTypes.ID,
		id: PropTypes.number,
		status: PropTypes.bool,
	}).isRequired,
	changeValue: PropTypes.func.isRequired,
};

export default Active;
