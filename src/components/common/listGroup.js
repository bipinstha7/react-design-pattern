import React from 'react';

const ListGroup = props => {
	const { items, onItemSelect, textProperty, valueProperty } = props;

	return (
		<ul className="list-group">
			{items.map(item => (
				<li className="list-group-item" key={item[valueProperty]}>
					{item[textProperty]}
				</li>
			))}
		</ul>
	);
};

ListGroup.defaultProps = {
	textProperty: 'name',
	valueProperty: '_id',
};

export default ListGroup;