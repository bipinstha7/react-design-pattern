import React, { Component } from 'react';
import get from 'lodash/get';

class TableBody extends Component {
	renderCell = (item, column) => {
		if (column.content) {
			return column.content(item);
		}

		return get(item, column.path);
	};

	render() {
		const { data, columns } = this.props;

		return (
			<tbody>
				{data.map(item => (
					<tr key={item._id}>
						{columns.map(column => (
							<td key={column.label || column.key}>
								{this.renderCell(item, column)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		);
	}
}

export default TableBody;
