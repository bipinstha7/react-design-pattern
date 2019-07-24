import React, { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	validate = () => {
		const { error } = Joi.validate(this.state.data, this.schema, {
			abortEarly: false,
		});

		if (!error) return null;

		const errors = {};
		error.details.map(error => {
			errors[error.path[0]] = error.message;
		});

		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };

		const { error } = Joi.validate(obj, schema);

		return error ? error.details[0].message : null;
	};

	handleSubmit = e => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handleChange = ({ target }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(target);

		if (errorMessage) {
			errors[target.name] = errorMessage;
		} else {
			delete errors[target.name];
		}

		const data = { ...this.state.data };
		data[target.name] = target.value;
		this.setState({ data, errors });
	};
}

export default Form;
