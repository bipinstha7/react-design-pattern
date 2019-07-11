import React from 'react';

const Like = ({ liked, onClick }) => {
	let classes = 'fa fa-heart';
	if (!liked) classes += '-o';
	return (
		<i style={{ cursor: 'pointer' }} className={classes} onClick={onClick} />
	);
};

export default Like;
