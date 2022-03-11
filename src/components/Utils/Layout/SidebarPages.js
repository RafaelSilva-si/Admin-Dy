import React from 'react';
import { MdKeyboardArrowDown, MdLens } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Collapse, NavItem, NavLink as BSNavLink } from 'reactstrap';
import PropTypes from '../../../lib/utils/propTypes';
import bn from '../../../lib/utils/bemnames';

const bem = bn.create('sidebar');

const SidebarPage = ({
	isOpen,
	pageContents,
	namePages,
	IconPage,
	click,
	...restProps
}) => (
	<div {...restProps} style={{ display: 'contents' }}>
		<NavItem className={bem.e('nav-item')} onClick={click(namePages)}>
			<BSNavLink className={bem.e('nav-item-collapse')}>
				<div className="d-flex">
					<IconPage className={bem.e('nav-item-icon')} />
					<span className="nav-name">{namePages}</span>
				</div>
				<MdKeyboardArrowDown
					className={bem.e('nav-item-icon')}
					style={{
						padding: 0,
						transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
						transitionDuration: '0.3s',
						transitionProperty: 'transform',
					}}
				/>
			</BSNavLink>
		</NavItem>
		<Collapse isOpen={isOpen}>
			{pageContents.map(({ to, name, exact, IconSub }, index) => (
				
				<>
					<NavItem key={name} className={bem.e('nav-item nav-sub-item')}>
						<BSNavLink
							id={`navItem-${name}-${index}`}
							tag={NavLink}
							to={to}
							activeClassName="active"
							exact={exact}>
							<IconSub className={bem.e('nav-item-icon icon-small')} />
							<span className="">{name}</span>
						</BSNavLink>
					</NavItem>

				</>

			))}
		</Collapse>
	</div>
);

SidebarPage.propTypes = {
	namePages: PropTypes.string.isRequired,
	isOpen: PropTypes.bool,
	IconPage: PropTypes.elementType.isRequired,
	pageContents: PropTypes.arrayOf(PropTypes.object).isRequired,
	click: PropTypes.func.isRequired,
};

SidebarPage.defaultProps = {
	isOpen: false,
};

export default SidebarPage;
