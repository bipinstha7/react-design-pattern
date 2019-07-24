import React, { Component, Fragment } from 'react';
import Joi from 'joi-browser';

import Input from './common/input';

class LoginForm extends Component {
	state = {
		account: {
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

	handleSubmit = e => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;
	};

	validate = () => {
		const { error } = Joi.validate(this.state.account, this.schema, {
			abortEarly: false,
		});

		if (!error) return null;

		const errors = {};
		error.details.map(error => {
			errors[error.path[0]] = error.message;
		});

		return errors;
	};

	handleChange = ({ target }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(target);

		if (errorMessage) {
			errors[target.name] = errorMessage;
		} else {
			delete errors[target.name];
		}

		const account = { ...this.state.account };
		account[target.name] = target.value;
		this.setState({ account, errors });
	};

	validateProperty = ({ name, value }) => {
		if (name === 'username') {
			if (value.trim() === '') return 'Username is required';
		}

		if (name === 'password') {
			if (value.trim() === '') return 'Password is required';
		}
	};

	render() {
		const { account, errors } = this.state;

		return (
			<Fragment>
				<form onSubmit={this.handleSubmit}>
					<Input
						name="username"
						label="Username"
						value={account.username}
						onChange={this.handleChange}
						error={errors.username}
					/>
					<Input
						name="password"
						label="Password"
						value={account.password}
						onChange={this.handleChange}
						error={errors.password}
					/>
					<button className="btn btn-primary">Login</button>
				</form>
			</Fragment>
		);
	}
}

export default LoginForm;
