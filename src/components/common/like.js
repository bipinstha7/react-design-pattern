import React, { Component } from 'react';

class Like extends Component {
	render() {
		const { liked, onClick } = this.props;
		let classes = 'fa fa-heart';
		if (!liked) classes += '-o';
		return (
			<i style={{ cursor: 'pointer' }} className={classes} onClick={onClick} />
		);
	}
}

export default Like;
