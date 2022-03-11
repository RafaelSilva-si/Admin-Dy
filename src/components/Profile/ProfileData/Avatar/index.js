import React from 'react';
import { Button, Row } from 'reactstrap';
import PropTypes from '../../../../lib/utils/propTypes';
import R from '../../../../lib/constants/R';
import Avatar from '../../../Utils/Avatar';
import { FileImg, Upload } from '../../../Utils';

const AvatarProfile = ({ btnLabel, handleNavigation, handleUpload, uploadedFiles, ...restProps }) => (
	<Row {...restProps} className="justify-content-center">

		{uploadedFiles
			? <FileImg
				files={[uploadedFiles]}
			//onDelete={onDelete}
			/>
			: <Avatar size={150} src={R.images.avatar} />
		}
		
		<div style={{ margin: "15px", padding: "20px" }}>
			<Upload
				onUpload={handleUpload}
				accept=".png, .jpg"
				message="Arraste a sua foto de perfil..."
			/>


		</div>

		<Button
			outline
			block
			color="secondary"
			style={{ margin: 15 }}
			onClick={() => handleNavigation('/perfil/alterar-senha')}>
			{btnLabel}
		</Button>
	</Row>
);

AvatarProfile.propTypes = {
	btnLabel: PropTypes.string,
	handleNavigation: PropTypes.func.isRequired,
};

AvatarProfile.defaultProps = {
	btnLabel: 'Alterar senha',
};

export default AvatarProfile;
