import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state = {
		count: 0,
		tags: ['tag1', 'tag2', 'tag3'],
	};

	formatCount() {
		const { count } = this.state;

		return count === 0 ? 'Zero' : count;
	}

	getBadgeClasses() {
		let classes = 'badge m-2 badge-';
		classes += this.state.count === 0 ? 'warning' : 'primary';
		return classes;
	}

	handleIncrement = step => {
		this.setState({ count: this.state.count + step });
	};

	render() {
		return <main className="container" />;
	}
}

export default App;
