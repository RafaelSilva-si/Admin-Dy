import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from '../../../lib/utils/propTypes';
import bn from '../../../lib/utils/bemnames';
import Typography from '../Typography';
import { navigate } from '../../../lib/utils/navigation';

const bem = bn.create('page');

const Page = ({
	title,
	breadcrumbs,
	tag: Tag,
	className,
	children,
	parentBreadcrumbs,
	pathParent,
	...restProps
}) => {
	const classes = bem.b('px-3', className);

	return (
		<Tag className={classes} {...restProps}>
			<div className={bem.e('header')}>
				{title && typeof title === 'string' ? (
					<Typography type="h1" className={bem.e('title')}>
						{title}
					</Typography>
				) : (
					title
				)}
				{breadcrumbs && (
					<Breadcrumb className={bem.e('breadcrumb')}>
						<BreadcrumbItem
							className="breadcrumb_parent"
							onClick={() => navigate(pathParent)}>
							{parentBreadcrumbs}
						</BreadcrumbItem>
						{breadcrumbs.length &&
							breadcrumbs.map(({ name, active }) => (
								<BreadcrumbItem key={name} active={active}>
									{name}
								</BreadcrumbItem>
							))}
					</Breadcrumb>
				)}
			</div>
			{children}
		</Tag>
	);
};

Page.propTypes = {
	tag: PropTypes.component,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	parentBreadcrumbs: PropTypes.string,
	pathParent: PropTypes.string,
	breadcrumbs: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				active: PropTypes.bool,
			}),
		),
	]),
};

Page.defaultProps = {
	tag: 'div',
	title: '',
	parentBreadcrumbs: 'Home',
	pathParent: '/',
	className: '',
	breadcrumbs: false,
};

export default Page;
