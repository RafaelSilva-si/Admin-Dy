import React from 'react';
import PropTypes from '../../../lib/utils/propTypes';

const Page404 = ({ location }) => {
	return (
		<div className="ml-4" style={{ marginTop: 100 }}>
			<h3>
				Não foi encontrado uma rota para
				<code>{location.pathname}</code>
			</h3>
		</div>
	);
};

Page404.propTypes = {
	location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default Page404;
