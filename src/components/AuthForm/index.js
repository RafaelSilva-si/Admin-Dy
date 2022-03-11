import PropTypes from 'prop-types';
import React from 'react';
import {
	Button,
	Form,
	FormFeedback,
	Input,
	InputGroup,
	InputGroupAddon,
} from 'reactstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import { MdChevronRight, MdLock, MdPerson } from 'react-icons/md';
import R from '../../lib/constants/R';
import Logo from '../Utils/logo'

class AuthForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			usernameInvalid: false,
			passwordInvalid: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event, submit) {
		event.preventDefault();

		const { password, username } = this.state;

		if (password === '' && username === '') {
			this.setState({ usernameInvalid: true, passwordInvalid: true });
			return;
		}

		if (password === '') {
			this.setState({ passwordInvalid: true });
			return;
		}

		if (username === '') {
			this.setState({ usernameInvalid: true });
			return;
		}

		const data = { username, password };
		submit(data);
	}

	handleChange(event) {
		if (event.target.value === '') {
			this.setState({ [`${event.target.name}Invalid`]: true });
		} else {
			this.setState({ [`${event.target.name}Invalid`]: false });
		}

		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
		const {
			showLogo,
			usernameInvalidMsg,
			usernameInputProps,
			passwordInvalidMsg,
			passwordInputProps,
			loading,
			onSubmit,
		} = this.props;

		const {
			username,
			password,
			passwordInvalid,
			usernameInvalid,
		} = this.state;

		return (
			<Form onSubmit={e => this.handleSubmit(e, onSubmit)}>
				{showLogo && (
					<div className="ml-2 pb-4 img-container">
						<Logo/>
					</div>
				)}

				<InputGroup>
					<InputGroupAddon addonType="prepend"  className="authInput">
						<MdPerson color="white" size={18} />
					</InputGroupAddon>
					<Input
						{...usernameInputProps}
						invalid={usernameInvalid}
						onChange={this.handleChange}
						value={username || ''}
					/>
					<FormFeedback className="ml-3">
						{usernameInvalidMsg}
					</FormFeedback>
				</InputGroup>

				<InputGroup>
					<InputGroupAddon addonType="prepend">
						<MdLock color="white" size={15} />
					</InputGroupAddon>
					<Input
						{...passwordInputProps}
						onChange={this.handleChange}
						invalid={passwordInvalid}
						value={password || ''}
					/>
					<FormFeedback className="ml-3">
						{passwordInvalidMsg}
					</FormFeedback>
				</InputGroup>
				<Button
				variant="outline-primary"
					className="btn-login"
					disabled={loading}
					block
					type="submit">
					{!loading ? (
						<div>
							{R.strings.login.login}{' '}
							<MdChevronRight size={25} className="float-right" />
						</div>
					) : (
						<div>
							{R.strings.login.login}
							<ClipLoader
								size={20}
								color={R.colors.colorPrimary}
								loading={loading}
								className="float-right"
							/>
						</div>
					)}
				</Button>
			</Form>
		);
	}
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
	authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]),
	showLogo: PropTypes.bool,
	usernameInvalidMsg: PropTypes.string,
	usernameInputProps: PropTypes.shape({}),
	passwordInvalidMsg: PropTypes.string,
	passwordInputProps: PropTypes.shape({}),
	onSubmit: PropTypes.func.isRequired,
	loading: PropTypes.bool,
};

AuthForm.defaultProps = {
	authState: 'LOGIN',
	showLogo: true,
	usernameInvalidMsg: 'Preencha o campo usuário!',
	usernameInputProps: {
		type: 'string',
		placeholder: R.strings.login.userPlaceholder,
		name: 'username',
	},
	passwordInvalidMsg: 'Preencha o campo senha!',
	passwordInputProps: {
		type: 'password',
		placeholder: R.strings.login.passwordPlaceholder,
		name: 'password',
	},
	loading: false,
};

export default AuthForm;
