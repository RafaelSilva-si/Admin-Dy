import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'reactstrap';
import FormProfile from './Form';
import AvatarProfile from './Avatar';

const ProfileScreen = ({ handleNavigation, user, onSubmit, handleUpload, uploadedFiles }) => {
	return (
		<Row>
			<Col xl={4} lg={12} md={12}>
				<AvatarProfile
					uploadedFiles={uploadedFiles}
					handleUpload={handleUpload}
					handleNavigation={page => handleNavigation(page)}
				/>
			</Col>
			<Col xl={8} lg={12} md={12}>
				<FormProfile user={user} onSubmit={onSubmit} />
			</Col>
		</Row>
	);
};

ProfileScreen.propTypes = {
	handleNavigation: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	user: PropTypes.PropTypes.shape({}).isRequired,
};

export default ProfileScreen;
