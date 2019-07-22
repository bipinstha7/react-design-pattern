import React, { Component } from 'react';
import Like from './common/like';
import TableHeader from './common/tableHeader';

class MoviesTable extends Component {
	// columns doesn't need to be changed based on
	// lifeCycle methods. So we don't need to keep it on state
	columns = [
		{ path: 'title', label: 'Title' },
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{ key: 'like' },
		{ key: 'delete' },
	];

	render() {
		const { movies, onLike, onDelete, sortColumn, onSort } = this.props;

		return (
			<table className="table">
				<TableHeader
					columns={this.columns}
					sortColumn={sortColumn}
					onSort={onSort}
				/>
				<tbody>
					{movies.map(movie => (
						<tr key={movie._id}>
							<td>{movie.title}</td>
							<td>{movie.genre.name}</td>
							<td>{movie.numberInStock}</td>
							<td>{movie.dailyRentalRate}</td>
							<td>
								<Like liked={movie.liked} onClick={() => onLike(movie)} />
							</td>
							<td>
								<button
									onClick={() => onDelete(movie._id)}
									className="btn btn-danger btn-sm"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default MoviesTable;