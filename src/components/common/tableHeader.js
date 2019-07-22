import React, { Component } from 'react';

class TableHeader extends Component {
	raiseSort = path => {
		const sortColumn = { ...this.props.sortColumn };

		if (sortColumn.path === path) {
			sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}

		this.props.onSort(sortColumn);
	};

	renderSortIcon = column => {
		const { path, order } = this.props.sortColumn;
		if (column.path !== path) return null;

		if (order == 'asc') {
			return <i className="fa fa-sort-asc" />;
		}

		return <i className="fa fa-sort-desc" />;
	};

	render() {
		const { columns } = this.props;

		return (
			<thead>
				<tr>
					{columns.map(column => (
						<th
							className="clickable"
							key={column.label || column.key}
							onClick={() => this.raiseSort(column.path)}
						>
							{column.label} {this.renderSortIcon(column)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;
