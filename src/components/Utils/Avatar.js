import React from 'react';
import classNames from 'classnames';
import PropTypes from '../../lib/utils/propTypes';
import R from '../../lib/constants/R';

const Avatar = ({
	rounded,
	circle,
	src,
	size,
	tag: Tag,
	className,
	style,
	...restProps
}) => {
	const classes = classNames(
		{ 'rounded-circle': circle, rounded },
		className,
	);
	return (
		<Tag
			src={src}
			style={{ width: size, height: size, ...style }}
			className={classes}
			{...restProps}
		/>
	);
};

Avatar.propTypes = {
	tag: PropTypes.component,
	rounded: PropTypes.bool,
	circle: PropTypes.bool,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	src: PropTypes.string,
	className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	style: PropTypes.shape({}),
};

Avatar.defaultProps = {
	tag: 'img',
	rounded: false,
	circle: true,
	size: 40,
	src: R.images.avatar,
	style: {},
	className: {},
};

export default Avatar;
