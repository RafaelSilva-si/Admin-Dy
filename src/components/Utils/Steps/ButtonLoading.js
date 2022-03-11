import React from 'react';
import { Button } from 'reactstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from '../../../lib/utils/propTypes';

const ButtonLoading = ({ label, loading, disabled, ...btnProps }) => {
	return (
		<Button disabled={disabled} outline={!loading} {...btnProps}>
			{!loading ? (
				label
			) : (
				<ClipLoader size={15} color="#FFF" loading={loading} />
			)}
		</Button>
	);
};

ButtonLoading.propTypes = {
	label: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	disabled: PropTypes.bool.isRequired,
};

export default ButtonLoading;
