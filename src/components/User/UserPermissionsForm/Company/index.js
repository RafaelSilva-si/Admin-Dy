import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from '../../../../lib/utils/propTypes';
import { Checkbox, Typography } from '../../../Utils';

const CompanyPermissions = ({
	company,
	indexCompany,
	changeValue,
	...restProps
}) => {
	const list = submodules =>
		submodules.map((mod, indexSub) => (
			<Col xl={4} lg={4} md={6} xs={6} className="mt-3" key={mod.name}>
				<Checkbox
					label={mod.name}
					defaultChecked={mod.group ? mod.group : mod.status}
					onChange={() => changeValue(mod, indexSub, indexCompany)}
					disabled={mod.group}
				/>
			</Col>
		));

	return (
		<div className="mb-5" {...restProps}>
			<Typography type="h5">{company.name}</Typography>
			<Row>{list(company.submodules)}</Row>
		</div>
	);
};

CompanyPermissions.propTypes = {
	changeValue: PropTypes.func.isRequired,
	indexCompany: PropTypes.number.isRequired,
	company: PropTypes.shape({
		name: PropTypes.name,
		submodules: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
};

export default CompanyPermissions;
