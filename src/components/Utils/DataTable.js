import React from 'react';
import DataTable from 'react-data-table-component';
import PropTypes from '../../lib/utils/propTypes';
import PageSpinner from './Page/PageSpinner';

const DataTableComponent = ({
	noHeader,
	columns,
	data,
	pagination,
	style,
	striped,
	highlightOnHover,
	noDataComponent,
	className,
	paginationComponentOptions,
	loading,
	...restProps
}) => (
	<DataTable
		noHeader={noHeader}
		columns={columns}
		className={className}
		data={data}
		pagination={pagination}
		style={{ marginBottom: pagination ? 100 : 120, ...style }}
		striped={striped}
		highlightOnHover={highlightOnHover}
		noDataComponent={noDataComponent}
		paginationComponentOptions={paginationComponentOptions}
		progressPending={loading}
		progressComponent={<PageSpinner />}
		{...restProps}
	/>
);

DataTableComponent.propTypes = {
	noHeader: PropTypes.bool,
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	pagination: PropTypes.bool,
	striped: PropTypes.bool,
	highlightOnHover: PropTypes.bool,
	noDataComponent: PropTypes.string,
	className: PropTypes.string,
	paginationComponentOptions: PropTypes.shape({}),
	loading: PropTypes.bool,
	style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

DataTableComponent.defaultProps = {
	noHeader: true,
	pagination: true,
	highlightOnHover: true,
	striped: true,
	noDataComponent: 'Sem registros para exibir.',
	className: 'datatable-component',
	paginationComponentOptions: {
		rowsPerPageText: 'Itens por página:',
		rangeSeparatorText: 'of',
		noRowsPerPage: false,
	},
	loading: false,
	style: '',
};

export default DataTableComponent;
