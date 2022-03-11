import React from 'react';
import { Button } from 'reactstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import { useSelector } from 'react-redux';
import PropTypes from '../../lib/utils/propTypes';

const ButtonLoading = ({ label, ...btnProps }) => {
	const loading = useSelector(state => state.api.loadingSubmit);

	return (
		<Button disabled={loading} outline={!loading} {...btnProps}>
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
};

export default ButtonLoading;
