import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';
import PropTypes from '../../../lib/utils/propTypes';

export default class Upload extends Component {
	renderDragMessage = (isDragActive, isDragReject, message) => {
		if (!isDragActive) {
			return <UploadMessage>{message}</UploadMessage>;
		}

		if (isDragReject) {
			return (
				<UploadMessage type="error">
					Arquivo não suportado
				</UploadMessage>
			);
		}

		return (
			<UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
		);
	};

	render() {
		const { onUpload, accept, message, multiple, ...rest } = this.props;

		return (
			<div className="container-upload">
				<div className="content-upload">
					<Dropzone
						accept={accept}
						onDropAccepted={onUpload}
						multiple={multiple}
						{...rest}>
						{({
							getRootProps,
							getInputProps,
							isDragActive,
							isDragReject,
						}) => (
							<DropContainer
								{...getRootProps()}
								isDragActive={isDragActive}
								isDragReject={isDragReject}>
								<input {...getInputProps()} />
								{this.renderDragMessage(
									isDragActive,
									isDragReject,
									message,
								)}
							</DropContainer>
						)}
					</Dropzone>
				</div>
			</div>
		);
	}
}

Upload.propTypes = {
	onUpload: PropTypes.func.isRequired,
	accept: PropTypes.string.isRequired,
	message: PropTypes.string,
	multiple: PropTypes.bool,
};

Upload.defaultProps = {
	message: 'Arraste o arquivo para fazer o upload ...',
	multiple: false,
};
