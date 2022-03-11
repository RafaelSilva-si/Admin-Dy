import React, { useState } from 'react';
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
	Col,
	Input,
} from 'reactstrap';
import FadeLoader from 'react-spinners/FadeLoader';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from '../../../lib/utils/propTypes';
import ButtonLoading from '../ButtonLoading';
import SelectComponent from '../Select';
import { configuratorActions } from '../../../store/actions';
import R from '../../../lib/constants/R';
import { LoadingBlock } from './styles';

const ModalConfigurator = ({
	title,
	btnCancelLabel,
	btnConfirmLabel,
	characteristics,
	onSelectConfigurator,
	newConfigurator,
	...restProps
}) => {
	const isOpen = useSelector(state => state.configurator.modal);
	const responseValues = useSelector(
		state => state.configurator.responseValues,
	);
	const selectResponse = useSelector(
		state => state.configurator.selectResponse,
	);
	const responseBody = useSelector(state => state.configurator.responseBody);
	const loading = useSelector(state => state.configurator.loading);
	const dispatch = useDispatch();

	const responseArr = [];

	const [response, setResponse] = useState(responseArr);

	const { register, control, handleSubmit } = useForm();

	const changeValue = (select, index) => {
		const auxValues = [...responseValues];
		const auxSelect = [...selectResponse];

		let vant2 = null;
		if (
			auxSelect[index] !== null &&
			typeof auxSelect[index] !== 'undefined'
		) {
			vant2 = auxSelect[index].tvar_id;
		} else if (
			auxValues[index] !== null &&
			typeof auxValues[index] !== 'undefined'
		) {
			vant2 = auxValues[index].tvar_id;
		} else {
			vant2 = null;
		}
		const vant = vant2;
		dispatch(configuratorActions.setVant(vant));

		auxSelect[index] = select;
		auxValues[index] = select;
		dispatch(configuratorActions.setResponseValues(auxValues));
		dispatch(configuratorActions.setSelectResponse(auxSelect));

		const value = [
			characteristics[index].id,
			characteristics[index].tipo,
			select.tvar_id,
			characteristics[index].tcarac_id,
			characteristics[index].tipo_campo,
		]
			.map(String)
			.join('#');

		const newArr = [...responseBody];
		newArr[index].resp_id = value;
		dispatch(configuratorActions.setResponseBody(newArr));

		onSelectConfigurator(index);
	};

	const submit = () => {
		newConfigurator();
	};

	const closeModal = () => {
		dispatch(configuratorActions.toogleModalConfigurator());
		dispatch(configuratorActions.setCharacteristics([]));
	};

	const onBlurInput = (e, index) => {
		const value = [
			characteristics[index].id,
			characteristics[index].tipo,
			e.target.value,
			characteristics[index].tcarac_id,
			characteristics[index].tipo_campo,
		]
			.map(String)
			.join('#');
		const newArr = [...responseBody];
		const auxSelect = [...selectResponse];

		const vant = auxSelect[index];
		dispatch(configuratorActions.setVant(vant));

		auxSelect[index].resp_id = value;
		newArr[index].resp_id = value;
		dispatch(configuratorActions.setResponseBody(newArr));
		dispatch(configuratorActions.setSelectResponse(auxSelect));

		onSelectConfigurator(index);
	};

	const onChangeInput = (e, index) => {
		const auxValues = [...responseValues];
		auxValues[index] = e.target.value;
		dispatch(configuratorActions.setResponseValues(auxValues));
	};

	const buildResponse = (field, index) => {
		if (field.tipo === 'ME' || field.tipo === 'ES' || field.tipo === 'OP') {
			return (
				<SelectComponent
					name={`respostas[${field.id}]`}
					control={control}
					placeholder="selecione uma opção"
					onChange={selected => changeValue(selected, index)}
					innerRef={register}
					options={field.respostas}
					fieldName="descricao"
					fieldValue="tvar_id"
					value={responseValues[index]}
				/>
			);
		}
		if (field.tipo === 'FO') {
			return (
				<Input
					name={`respostas[${field.id}]`}
					type="textarea"
					placeholder="digite o texto"
					onBlur={value => onBlurInput(value, index)}
					onChange={e => onChangeInput(e, index)}
					disabled
				/>
			);
		}
		return (
			<Input
				name={`respostas[${field.id}]`}
				onBlur={value => onBlurInput(value, index)}
				placeholder="digite o texto"
				onChange={selected => onChangeInput(selected, index)}
				disabled
			/>
		);
	};

	React.useEffect(() => {
		if (characteristics.length > 0 && response.length === 0) {
			characteristics.forEach(item => {
				responseArr.push({ carac_id: item.id, resp_id: null });
			});
			setResponse(responseArr);
		}
	}, [setResponse, characteristics, responseArr, response]);

	return (
		<Modal
			{...restProps}
			size="lg"
			isOpen={isOpen}
			className="modal-configurator">
			<ModalHeader>{title}</ModalHeader>
			<LoadingBlock loading={loading.toString()}>
				<FadeLoader
					color={R.colors.colorPrimary}
					css={{ margin: 'auto' }}
				/>
			</LoadingBlock>
			<form onSubmit={handleSubmit(submit)}>
				<ModalBody>
					{characteristics.length > 0 && (
						<div>
							{characteristics.map((field, index) => (
								<Row className="mb-3" key={field.id}>
									<Col xl={6} lg={12} md={12}>
										<Input
											disabled
											value={field.descricao}
										/>
									</Col>
									<Col xl={6} lg={12} md={12}>
										{buildResponse(field, index)}
									</Col>
								</Row>
							))}
						</div>
					)}
					{characteristics.length === 0 && !loading && (
						<p>Sem caracterísitcas para configurar.</p>
					)}
				</ModalBody>
				<ModalFooter>
					<Button color="danger" outline onClick={() => closeModal()}>
						{btnCancelLabel}
					</Button>
					<ButtonLoading label={btnConfirmLabel} color="success" />
				</ModalFooter>
			</form>
		</Modal>
	);
};

ModalConfigurator.propTypes = {
	title: PropTypes.string,
	btnCancelLabel: PropTypes.string,
	btnConfirmLabel: PropTypes.string,
	onSelectConfigurator: PropTypes.func.isRequired,
	newConfigurator: PropTypes.func.isRequired,
	characteristics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ModalConfigurator.defaultProps = {
	title: 'Configurador',
	btnConfirmLabel: 'Adicionar',
	btnCancelLabel: 'Cancelar',
};

export default ModalConfigurator;
