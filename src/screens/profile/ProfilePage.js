import React from 'react';
import { connect } from 'react-redux';
import Page from '../../components/Utils/Page/Page';
import PropTypes from '../../lib/utils/propTypes';
import Profile from '../../components/Profile/ProfileData';
import { navigate } from '../../lib/utils/navigation';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import { getBase64 } from '../../lib/utils/functions'

import { usersActions } from '../../store/actions';

class ProfilePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			uploadedFiles: false,
			base64: false
		};

	}

	componentDidMount() { }

	editUser = data => {
		const { base64 } = this.state;
		const { onUpdateProfile } = this.props;

		if (base64) {
			data.img = base64;
		}

		onUpdateProfile(data)
	}

	handleUpload = update => {
		const file = update[0];
		getBase64(file)
			.then((result) => {
				this.setState({
					base64: result,
				});
			})
			.catch(err => {
				console.log(err);
			});

		const filesUp = {
			file,
			id: uniqueId(),
			name: file.name,
			readableSize: filesize(file.size),
			preview: URL.createObjectURL(file),
			progress: 0,
			uploaded: false,
			error: false,
			url: null,
		};

		this.setState({
			uploadedFiles: filesUp,
		});

	};

	render() {
		const { user, onUpdateProfile } = this.props;
		const { uploadedFiles } = this.state;

		return (
			<Page className="edit-profile" title="Perfil">
				<Profile
					user={user}
					uploadedFiles={uploadedFiles}
					handleUpload={this.handleUpload}
					onSubmit={data => this.editUser(data)}
					handleNavigation={page => navigate(page)}
				/>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
	onUpdateProfile: data => dispatch(usersActions.editUserProfile(data)),
});

ProfilePage.propTypes = {
	onUpdateProfile: PropTypes.func.isRequired,
	user: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
