import React, { Fragment } from 'react';
import Joi from 'joi-browser';

import Form from './common/form';
import { register } from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
	state = {
		data: {
			username: '',
			password: '',
			name: '',
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
		name: Joi.string()
			.required()
			.label('Name'),
	};

	doSubmit = async () => {
		try {
			const response = await register(this.state.data);
			auth.loginWithJwt(response.headers['x-auth-token']);

			// this.props.history.push('/');
			window.location = '/';
		} catch (error) {
			if (error.response && error.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = error.response.data;

				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<Fragment>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
					{this.renderButton('Login')}
				</form>
			</Fragment>
		);
	}
}

export default RegisterForm;
