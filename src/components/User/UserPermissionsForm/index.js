import React from 'react';
import { Form, Row } from 'reactstrap';
import { MdInfoOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import PropTypes from '../../../lib/utils/propTypes';
import Card from '../../Utils/Card/FormCard';
import { ButtonsCancelSubmit, Typography } from '../../Utils';
import { ContentItem, NavItem, TabContent, TabNav } from '../../Utils/Tabs';
import CompanyPermissions from './Company';

const FormUser = ({
	btnLabelSubmit,
	btnLabelCancel,
	handleNavigation,
	permissions,
	onSubmit,
	...restProps
}) => {
	const copy = permissions;

	const activeTab = useSelector(state => state.api.tab);

	const changeValue = (mod, indexMod, indexCompany) => {
		copy[activeTab - 1].modules[indexCompany].submodules[
			indexMod
		].status = !mod.status;
	};

	const companys = itens =>
		itens.map((item, key) => (
			<CompanyPermissions
				key={item.module}
				company={item}
				indexCompany={key}
				changeValue={changeValue}
			/>
		));

	const submit = () => {
		onSubmit(copy);
	};

	return (
		<Card title="Configurar Permissões" {...restProps}>
			<Row className="ml-2">
				<MdInfoOutline size={15} className="mr-1 mb-3" />
				<Typography type="small" className="mb-3">
					Todos botões desabilitados são permissões referentes ao
					grupo.
				</Typography>
			</Row>
			<Form>
				{copy.length && (
					<div>
						<TabNav>
							{copy.map((item, key) => (
								<NavItem
									key={item.company.id}
									number={key + 1}
									title={item.company.name}
								/>
							))}
						</TabNav>
						<TabContent>
							{copy.map((item, key) => (
								<ContentItem
									number={key + 1}
									key={item.company.id}
									className="mt-5 ml-2">
									{companys(item.modules)}
								</ContentItem>
							))}
						</TabContent>
					</div>
				)}
				<ButtonsCancelSubmit
					labelSubmit={btnLabelSubmit}
					onSubmit={() => submit()}
					labelCancel={btnLabelCancel}
					onCancel={() => handleNavigation()}
				/>
			</Form>
		</Card>
	);
};

FormUser.propTypes = {
	btnLabelSubmit: PropTypes.string,
	btnLabelCancel: PropTypes.string,
	handleNavigation: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	permissions: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object).isRequired,
	]).isRequired,
};

FormUser.defaultProps = {
	btnLabelSubmit: 'Salvar',
	btnLabelCancel: 'Cancelar',
};

export default FormUser;
