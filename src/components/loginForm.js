import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';

import Form from './common/form';
import auth, { login } from '../services/authService';

class LoginForm extends Form {
	state = {
		data: {
			username: '',
			password: '',
		},
		errors: {},
	};

	schema = {
		username: Joi.string()
			.required()
			.label('Username'),
		password: Joi.string()
			.required()
			.label('Password'),
	};

	doSubmit = async () => {
		try {
			const { data } = this.state;
			await login(data.username, data.password);

			const { state } = this.props.location;
			// this.props.history.push('/');
			window.location = state ? state.from.pathname : '/';
		} catch (error) {
			if (error.response && error.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = error.response.data;

				this.setState({ errors });
			}
		}
	};

	render() {
		if (auth.getCurrentUser()) return <Redirect to="/" />;
		return (
			<Fragment>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Login')}
				</form>
			</Fragment>
		);
	}
}

export default LoginForm;
