import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from '../../../lib/utils/propTypes';
import ButtonLoading from '../ButtonLoading';
import { apiActions } from '../../../store/actions';

const ModalDelete = ({
	title,
	name,
	btnCancelLabel,
	btnConfirmLabel,
	onSubmit,
	...restProps
}) => {
	const isOpen = useSelector(state => state.api.modal);
	const dispatch = useDispatch();

	return (
		<Modal
			{...restProps}
			isOpen={isOpen}
			toggle={() => dispatch(apiActions.toogleModal())}
			className="modal-delete">
			<ModalHeader toggle={() => dispatch(apiActions.toogleModal())}>
				{title}
			</ModalHeader>
			<ModalBody>{`Confirma a exclusão do registro ${name}?`}</ModalBody>
			<ModalFooter>
				<Button
					color="danger"
					outline
					onClick={() => dispatch(apiActions.toogleModal())}>
					{btnCancelLabel}
				</Button>
				<ButtonLoading
					label={btnConfirmLabel}
					color="success"
					onClick={onSubmit}
				/>
			</ModalFooter>
		</Modal>
	);
};

ModalDelete.propTypes = {
	title: PropTypes.string,
	name: PropTypes.string,
	btnCancelLabel: PropTypes.string,
	btnConfirmLabel: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
};

ModalDelete.defaultProps = {
	title: 'Deletar',
	btnConfirmLabel: 'Confirmar',
	btnCancelLabel: 'Cancelar',
	name: '',
};

export default ModalDelete;
