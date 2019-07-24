import React, { Component, Fragment } from 'react';

import Input from './common/input';

class LoginForm extends Component {
	state = {
		account: {
			username: '',
			password: '',
		},
		errors: {},
	};

	handleSubmit = e => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;
	};

	validate = () => {
		const errors = {};

		if (this.state.account.username.trim() === '') {
			errors.username = 'Username is required';
		}
		if (this.state.account.password.trim() === '') {
			errors.password = 'Password is required';
		}

		return Object.keys(errors).length ? errors : null;
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
