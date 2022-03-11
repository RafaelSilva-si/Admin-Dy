import { MdBuild, MdDashboard, MdApps, MdDeliveryDining, MdPointOfSale, MdListAlt } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';

export const navItems = [
	{
		to: '/',
		name: 'Dashboard',
		exact: true,
		Icon: MdDashboard,
	},
];

export const navAux = [
	{
		to: '/usuarios',
		name: 'Clientes',
		exact: false,
		IconSub: FaUserAlt,
		id: 138,
	},
	
];

export const navAplic = [
	{
		to: '/products',
		name: 'Produtos',
		exact: false,
		IconSub: MdListAlt,
		id: 141,
	},
	{
		to: '/sales',
		name: 'Vendas',
		exact: false,
		IconSub: MdPointOfSale,
		id: 141,
	},
	{
		to: '/delivery',
		name: 'Pedidos',
		exact: false,
		IconSub: MdDeliveryDining,
		id: 141,
	},
];

export const routes = [
	{
		name: 'Aplicações',
		icon: MdApps,
		submodules: navAplic,
	},
	{
		name: 'Auxiliares',
		icon: MdBuild,
		submodules: navAux,
	},
	
	
];
