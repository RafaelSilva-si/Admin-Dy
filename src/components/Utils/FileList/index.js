import React from 'react';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import PropTypes from '../../../lib/utils/propTypes';
import { Container, FileInfo, Preview } from './styles';

const FileList = ({ files, onDelete }) => (
	<Container>
		{files.map((uploadedFile, index) => (
			<li key={index.toString()}>
				<FileInfo>
					<Preview src={uploadedFile.preview} />
					<div>
						<strong>{uploadedFile.name}</strong>
						<span>
							{uploadedFile.readableSize}{' '}
							{!!uploadedFile.name && (
								<button
									type="button"
									onClick={() => onDelete(uploadedFile.id)}>
									Excluir
								</button>
							)}
						</span>
					</div>
				</FileInfo>

				<div>
					{uploadedFile.url && (
						<a
							href={uploadedFile.url}
							target="_blank"
							rel="noopener noreferrer">
							<MdLink
								style={{ marginRight: 8 }}
								size={24}
								color="#222"
							/>
						</a>
					)}

					{uploadedFile.uploaded && (
						<MdCheckCircle size={24} color="#78e5d5" />
					)}
					{uploadedFile.error && (
						<MdError size={24} color="#e57878" />
					)}
				</div>
			</li>
		))}
	</Container>
);

FileList.propTypes = {
	onDelete: PropTypes.func.isRequired,
	files: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	).isRequired,
};

export default FileList;
