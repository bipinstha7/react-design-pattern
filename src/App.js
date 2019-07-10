import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state = {
		count: 0,
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

	render() {
		return (
			<div className="App">
				<span className={this.getBadgeClasses()}>{this.formatCount()}</span>
				<button className="btn btn-secondary btn-sm">Increment</button>
			</div>
		);
	}
}

export default App;
